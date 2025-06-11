"use client";

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, defaultSettlementValues } from "@/schemas/settlement.schema";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { useSettlementFormHandlers } from "@/hooks/useSettlementFormHandlers";

export default function NewSettlementPage() {
  const { mode } = useSettlementContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues,
  });

  useFormMode(safeId, useSettlementContentStore ?? null);
  const { handleGenerate, handleReroll, onSubmit } = useSettlementFormHandlers(methods, safeId ?? null, mode ?? "add");

  return (
    <FormProvider {...methods}>
      <SettlementForm onSubmit={onSubmit} mode={mode} onGenerate={handleGenerate} onReroll={handleReroll} />
    </FormProvider>
  );
}
