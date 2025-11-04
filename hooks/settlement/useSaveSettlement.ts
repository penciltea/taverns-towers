"use client";

import { useAuthStore } from "@/store/authStore";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSettlementFormData } from "@/lib/util/transformFormDataForDB";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { useQueryClient } from "@tanstack/react-query";
import { Settlement } from "@/interfaces/settlement.interface";
import { useCampaignStore } from "@/store/campaignStore";

interface PartialSettlementUpdate {
  _id: string;
  [key: string]: unknown;
}

export function useSaveSettlement(mode: "add" | "edit", id?: string) {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();

  /** Full save (create/edit) */
  async function saveSettlement(data: SettlementFormData) {
    if (!user?.id) throw new Error("User is not logged in");

    try {
      const idempotencyKey = generateIdempotencyKey();

      // Handle file uploads (map)
      const cleanMap = await handleDynamicFileUpload(data, "map");

      // Filter out empty tags
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      const settlementData = {
        ...transformSettlementFormData(data),
        userId: user.id,
        campaignId: selectedCampaign && selectedCampaign._id !== null ? selectedCampaign._id : undefined,
        map: cleanMap,
        idempotencyKey,
      };

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
  }

  /** Partial update: only updates specific fields */
  async function handlePartialUpdate<T extends PartialSettlementUpdate>(update: T) {
    if (!user?.id) throw new Error("User is not logged in");

    const { updateSettlementPartial } = await import("@/lib/actions/settlement.actions");

    const idempotencyKey = generateIdempotencyKey();
    const payload = { ...update, idempotencyKey };

    // Optimistically update cache
    queryClient.setQueriesData({ queryKey: ["ownedSettlements"] }, (old: any) => {
      if (!old?.settlements) return old;
      return {
        ...old,
        settlements: old.settlements.map((s: Settlement) =>
          s._id === update._id ? { ...s, ...update } : s
        ),
      };
    });

    try {
      const updatedSettlement = await updateSettlementPartial(update._id, payload);

      // Ensure cache matches server response
      queryClient.setQueriesData({ queryKey: ["ownedSettlements"] }, (old: any) => {
        if (!old?.settlements) return old;
        return {
          ...old,
          settlements: old.settlements.map((s: Settlement) =>
            s._id === updatedSettlement._id ? updatedSettlement : s
          ),
        };
      });

      return updatedSettlement;
    } catch (error) {
      // Rollback
      queryClient.invalidateQueries({ queryKey: ["ownedSettlements"] });
      console.error("Failed to partially update settlement:", error);
      throw error;
    }
  }

  return { saveSettlement, handlePartialUpdate };
}
