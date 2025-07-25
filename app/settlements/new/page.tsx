"use client";

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, defaultSettlementValues } from "@/schemas/settlement.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { useSettlementFormSetup } from "@/hooks/settlement/useSettlementFormSetup";
import { useFormMode } from "@/hooks/useFormMode";

export default function NewSettlementPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useSettlementContentStore);
  const { mode } = useSettlementContentStore();

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues,
  });

  const { onGenerate, onReroll, onSubmit } = useSettlementFormSetup(methods, safeId ?? null, mode ?? "add" );

  return (
    <FormProvider {...methods}>
      <SettlementForm onSubmit={onSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
    </FormProvider>
  );
}
