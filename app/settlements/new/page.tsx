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

export default function NewSettlementPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useSettlementContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem } = useSettlementContentStore();
  const { setOpenDialog } = useUIStore();
  const user = useAuthStore(state => state.user);

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues,
  });

  const { onGenerate, onReroll, onSubmit } = useSettlementFormSetup(methods, safeId ?? null, mode ?? "add");

  const onLoginSuccess = () => {
    if (draftItem) {
      onSubmit(draftItem as SettlementFormData);
      clearDraftItem();
    }
  };

  const wrappedOnSubmit = async (data: SettlementFormData) => {
    if (!user) {
      setDraftItem(data); // ToDo: trigger auto-submit after logging in
      setOpenDialog("LoginDialog", { onLoginSuccess });
      return;
    }
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <SettlementForm onSubmit={wrappedOnSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
    </FormProvider>
  );
}
