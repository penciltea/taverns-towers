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

export function useSaveSettlementMutation({ id, mode }: SaveSettlementMutationProps) {
  const router = useRouter();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const { clearSelectedItem, clearMode } = useSettlementContentStore();
  const queryClient = useQueryClient();

  const saveSettlement = async (data: SettlementFormData) => {
    setSubmitting(true);
    try {
      const cleanMap = await handleDynamicFileUpload(data, "map");

      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== "");
      }

      const settlementData = {
        ...transformSettlementFormData(data),
        map: cleanMap,
      };

      let savedSettlement;
      if (mode === "edit" && id) {
        savedSettlement = await updateSettlement(id, settlementData);
      } else {
        savedSettlement = await createSettlement(settlementData);
      }

      showSnackbar(
        mode === "edit" ? "Settlement updated successfully!" : "Settlement created successfully!",
        "success"
      );

      clearSelectedItem();
      clearMode();
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
