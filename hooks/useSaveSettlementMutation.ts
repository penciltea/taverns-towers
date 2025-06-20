/**
 * Hook: useSaveSettlementMutation
 *
 * Handles saving (creating or editing) a settlement via form data.
 * - Uploads map images if present
 * - Transforms data into DB-safe format
 * - Calls the correct server action (create or update)
 * - Shows success or error UI feedback
 * - Clears store state and refreshes settlement query cache
 */

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { createSettlement, updateSettlement } from "@/lib/actions/settlement.actions";
import { transformSettlementFormData } from "@/lib/util/transformFormDataForDB";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { useQueryClient } from "@tanstack/react-query";

type SaveSettlementMutationProps = {
  id?: string;
  mode: "add" | "edit"; 
};

// Hook returns a save function used to submit settlement form data
export function useSaveSettlementMutation({ id, mode }: SaveSettlementMutationProps) {
  const router = useRouter();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const { clearSelectedItem, clearMode } = useSettlementContentStore();
  const queryClient = useQueryClient();

  const saveSettlement = async (data: SettlementFormData) => {
    setSubmitting(true); // Start loading state
    try {
      // Upload the settlement map image (if it's a file input)
      const cleanMap = await handleDynamicFileUpload(data, "map");

      // Clean up tag list (remove blanks)
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      // Transform raw form data to format expected by DB actions
      const settlementData = {
        ...transformSettlementFormData(data),
        map: cleanMap,
      };

      // Choose between create or update based on mode
      let savedSettlement;
      if (mode === "edit" && id) {
        savedSettlement = await updateSettlement(id, settlementData);
      } else {
        savedSettlement = await createSettlement(settlementData);
      }

      // Notify the user of success
      showSnackbar(
        mode === "edit" ? "Settlement updated successfully!" : "Settlement created successfully!",
        "success"
      );

       // Clear current selection and mode from UI/store
      clearSelectedItem();
      clearMode();
      
      // Refresh settlement list in React Query cache
      queryClient.invalidateQueries({ queryKey: ['settlements'] });

      return { success: true, settlement: savedSettlement }; // sends back settlement data for other components to use

    } catch (error) {
      console.error(error);
      showErrorDialog("Something went wrong, please try again later!");
    } finally {
      setSubmitting(false);
    }
  };

  return { saveSettlement };
}
