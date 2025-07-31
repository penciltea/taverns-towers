/**
 * Hook: useSaveSettlement
 *
 * Handles transforming settlement form data,
 * uploading the map image (if present),
 * and calling the correct server action to save or update.
 *
 * This hook returns an async function that can be called
 * with form data during submission.
 *
 * It does not handle UI feedback or routing.
 */

"use client"

import { useAuthStore } from "@/store/authStore";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSettlementFormData } from "@/lib/util/transformFormDataForDB";
import { createSettlement, updateSettlement } from "@/lib/actions/settlement.actions";
import { SettlementFormData } from "@/schemas/settlement.schema";

export function useSaveSettlement(mode: "add" | "edit", id?: string) {
  const { user } = useAuthStore();

  return async function saveSettlement(data: SettlementFormData) {
    if (!user?.id) {
      throw new Error("User is not logged in");
    }

    try {
      // Upload the map image, if present
      const cleanMap = await handleDynamicFileUpload(data, "map");

      // Clean up tag list
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      // Transform for DB format
      const settlementData = {
        ...transformSettlementFormData(data),
        map: cleanMap,
        userId: user.id
      };

      // Call appropriate server action
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
