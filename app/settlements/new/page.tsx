"use client";

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { settlementSchema, defaultSettlementValues, SettlementFormData } from "@/schemas/settlement.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { useSettlementFormSetup } from "@/hooks/settlement/useSettlementFormSetup";
import { useFormMode } from "@/hooks/useFormMode";
import { useDraftForm } from "@/hooks/useDraftForm";

const DRAFT_KEY = "draftSettlement";

export default function NewSettlementPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useSettlementContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem, submittingDraft, setSubmittingDraft } = useSettlementContentStore();
  const { setOpenDialog } = useUIStore();
  const user = useAuthStore(state => state.user);


  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: draftItem || defaultSettlementValues,
  });

  const { onGenerate, onReroll, onSubmit } = useSettlementFormSetup(methods, safeId ?? null, mode ?? "add");
  
  const openLoginDialog = (props?: any) =>
    setOpenDialog("LoginDialog", props);

  const { saveDraftAndPromptLogin } = useDraftForm<SettlementFormData>({
    user,
    draftItem,
    setDraftItem,
    clearDraftItem,
    submittingDraft,
    setSubmittingDraft,
    onSubmit,
    draftKey: DRAFT_KEY,
  });

  // Wrapped submit handler for the form
  const wrappedOnSubmit = async (data: SettlementFormData) => {
    if (!user) {
      // Save draft and open login
      saveDraftAndPromptLogin(data, openLoginDialog);
      return;
    }

    // User is logged in → submit normally
    await onSubmit(data);

    // Clean up draft after successful submission
    clearDraftItem();
    sessionStorage.removeItem(DRAFT_KEY);
  };


  return (
    <FormProvider {...methods}>
      <SettlementForm onSubmit={wrappedOnSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
    </FormProvider>
  );
}
