"use client";

import { useAuthStore } from "@/store/authStore";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSettlementFormData } from "@/lib/util/transformFormDataForDB";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";

export function useSaveSettlement(mode: "add" | "edit", id?: string) {
  const { user } = useAuthStore();

  return async function saveSettlement(data: SettlementFormData) {
    if (!user?.id) throw new Error("User is not logged in");

    try {
      const idempotencyKey = generateIdempotencyKey();

      // Handle file uploads (map)
      const cleanMap = await handleDynamicFileUpload(data, "map");

      // Filter out empty tags
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      // Transform form data for DB
      const settlementData = {
        ...transformSettlementFormData(data),
        map: cleanMap,
        userId: user.id,
        idempotencyKey,
      };

      // Lazy-import server actions at runtime
      const { createSettlement, updateSettlement } = await import(
        "@/lib/actions/settlement.actions"
      );

      const savedSettlement =
        mode === "edit" && id
          ? await updateSettlement(id, settlementData)
          : await createSettlement(settlementData);

      return savedSettlement;
    } catch (error) {
      console.error("Error saving settlement:", error);
      throw error;
    }
  };
}
