"use client";

import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { settlementSchema, defaultSettlementValues, SettlementFormData } from "@/schemas/settlement.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useSettlementActions } from "@/hooks/settlement/useSettlementActions";
import { useFormMode } from "@/hooks/useFormMode";
import { useDraftForm } from "@/hooks/useDraftForm";
import { AuthDialogInput } from "@/interfaces/dialogProps.interface";
import { useEffect } from "react";
import { useSettlementMutations } from "@/hooks/settlement/useSettlementMutations";

const LazySettlementForm = dynamic(
  () => import("@/components/Settlement/Form/SettlementForm"),
  { ssr: false, loading: () => <p>Loading form...</p> }
);

export default function NewSettlementPage() {
  const router = useRouter();
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useSettlementContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem, submittingDraft, setSubmittingDraft } = useSettlementContentStore();
  const draftKey = "draftSettlement";
  const { setOpenDialog } = useUIStore();
  const user = useAuthStore(state => state.user);

  let initialDraft: Partial<SettlementFormData> | null = null;
  if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(draftKey);
      if (raw) initialDraft = JSON.parse(raw) as Partial<SettlementFormData>;
  }

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: draftItem || initialDraft || defaultSettlementValues,
  });
  
  // Populate Zustand store synchronously if empty
  useEffect(() => {
    if (!draftItem && initialDraft) {
      setDraftItem(initialDraft);
    }
  }, [draftItem, initialDraft, setDraftItem]);

  const { onGenerate, onReroll } = useSettlementActions(methods);
  const { handleSubmit: onSubmit } = useSettlementMutations({
    mode,
    settlementId: safeId,
  }); 
  
  const openLoginDialog = (props?: AuthDialogInput<Partial<SettlementFormData>>) =>
      setOpenDialog("LoginDialog", { ...props, openRegisterDialog });
  
    const openRegisterDialog = (props?: AuthDialogInput<Partial<SettlementFormData>>) =>
      setOpenDialog("RegisterDialog", {
        ...props,
        onRegisterSuccess: () => {
          openLoginDialog({
            draftKey,
            draftItem: draftItem || initialDraft || undefined,
            onLoginSuccess: () => {
              clearDraftItem();
              sessionStorage.removeItem(draftKey);
            },
          });
        },
      });

  const { saveDraftAndPromptLogin } = useDraftForm<SettlementFormData>({
    user,
    draftItem,
    setDraftItem,
    clearDraftItem,
    submittingDraft,
    setSubmittingDraft,
    onSubmit,
    draftKey,
  });

  // Wrapped submit handler for the form
  const wrappedOnSubmit = async (data: SettlementFormData) => {
    if (!user) {
      // Save draft and open login
      saveDraftAndPromptLogin(data, openLoginDialog);
      return;
    }

    const savedId = await onSubmit(data);

    if (savedId) {
        clearDraftItem();
        sessionStorage.removeItem(draftKey);

        router.replace(`/settlements/${savedId}`);
    }
  };


  return (
    <FormProvider {...methods}>
      <LazySettlementForm onSubmit={wrappedOnSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
    </FormProvider>
  );
}
