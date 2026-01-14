"use client";

import { useRouter } from "next/navigation";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSettlementFormData } from "@/lib/util/transformFormDataForDB";
import { invalidateCampaignQueries, invalidateConnections, invalidateSettlementQueries } from "@/lib/util/invalidateQuery";
import { useAuthStore } from "@/store/authStore";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { useCampaignStore } from "@/store/campaignStore";
import { Settlement } from "@/interfaces/settlement.interface";
import { isUserVerified } from "@/lib/util/isUserVerified";
import { AppError } from "@/lib/errors/app-error";
import { handleActionResult } from "../queryHook.util";

interface UseSettlementMutationsProps {
  mode: "add" | "edit" | null;
  settlementId?: string;
}

interface PartialSettlementUpdate {
  _id: string;
  [key: string]: unknown;
}

export function useSettlementMutations({ mode, settlementId }: UseSettlementMutationsProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const queryClient = useQueryClient();
  const { selectedCampaign } = useCampaignStore();

  async function handleSubmit(data: SettlementFormData) {
    setSubmitting(true);

    try {
      if (!user?.id) throw new AppError("User is not logged in", 400);

      if(!isUserVerified(user)){
        showErrorDialog("Your email address hasn't been verified yet. Magic can't preserve your work until it's confirmed.");
        return;
      }
      

      const idempotencyKey = generateIdempotencyKey();

      // Handle map upload
      const cleanMap = await handleDynamicFileUpload(data, "map");

      // Clean tags
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      // Transform form data
      const transformed = {
        ...transformSettlementFormData(data),
        userId: user.id,
        campaignId: selectedCampaign && selectedCampaign._id !== null ? selectedCampaign._id : undefined,
        map: cleanMap,
        idempotencyKey,
      };

      let saved;

      if (mode === "add") {
        const { canCreateContent } = await import("@/lib/actions/user.actions");
        if (!(await canCreateContent(user.id, "settlement"))) {
          showErrorDialog(
            "You have reached the maximum number of settlements for your membership tier. Please either upgrade your membership tier or delete an existing settlement to continue."
          );
          return;
        }

        const { createSettlement } = await import("@/lib/actions/settlement.actions");
        const result = await createSettlement(transformed);
        saved = handleActionResult(result);
      } else if (mode === "edit") {
        if (!settlementId) throw new AppError("Settlement ID is required for editing.", 400);
        const { updateSettlement } = await import("@/lib/actions/settlement.actions");
        const result = await updateSettlement(settlementId, transformed, selectedCampaign?._id ?? undefined);
        saved = handleActionResult(result);
      } else {
        throw new AppError("Invalid mutation mode", 400);
      }

      if (!saved || !saved._id) {
        throw new AppError("There was a problem saving the settlement. Please try again later!", 500);
      }

      // Handle connections
      if (data.connections?.length) {
        for (const conn of data.connections) {
          const { addConnection } = await import("@/lib/actions/connections.actions");
          await addConnection({
            sourceType: "settlement",
            sourceId: saved._id,
            targetType: conn.type,
            targetId: conn.id,
            role: conn.role,
          });

          queryClient.setQueryData([conn.type, conn.id], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              connections: [
                ...old.connections,
                { type: "settlement", refId: saved._id, role: conn.role },
              ],
            };
          });
        }

        invalidateConnections(queryClient, data.connections);
      }

      // Success feedback
      showSnackbar(
        mode === "edit"
          ? "Settlement updated successfully!"
          : "Settlement created successfully!",
        "success"
      );

      router.replace(`/settlements/${saved._id}`);

      invalidateSettlementQueries(queryClient, saved._id);

      if (selectedCampaign) {
        invalidateCampaignQueries(queryClient, selectedCampaign._id);
      }     

    } catch (error) {
      let message = "Something went wrong saving the settlement. Please try again later.";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }

      showErrorDialog(message);
      console.error("Settlement mutation error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePartialUpdate<T extends PartialSettlementUpdate>(update: T) {
    if (!user?.id) throw new AppError("User is not logged in", 400);

    const { updateSettlementPartial } = await import("@/lib/actions/settlement.actions");
    const idempotencyKey = generateIdempotencyKey();
    const payload = { ...update, idempotencyKey };

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
      const result = await updateSettlementPartial(update._id, payload);
      const updatedSettlement = handleActionResult(result);

      queryClient.setQueriesData({ queryKey: ["ownedSettlements"] }, (old: any) => {
        if (!old?.settlements) return old;
        return {
          ...old,
          settlements: old.settlements.map((s: Settlement) =>
            s._id === updatedSettlement._id ? updatedSettlement : s
          ),
        };
      });

      showSnackbar("Settlement updated successfully!", "success");

    } catch (error) {
      invalidateSettlementQueries(queryClient, update._id);
      console.error("Failed to update settlement:", error);
      showErrorDialog("Failed to update settlement. Please try again.");
      throw error;
    }
  }

  return {
    handleSubmit,
    handlePartialUpdate,
  };
}
