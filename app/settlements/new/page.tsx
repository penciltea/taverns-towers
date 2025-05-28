"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";
import { getSettlementById } from "@/lib/actions/settlement.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { generateSettlementWithName, normalizeInput } from "@/lib/modules/settlements/rules/settlement.rules";

export default function NewSettlementPage() {
  const router = useRouter();
  const { mode } = useSettlementContentStore();

  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();
  const safeId = getSingleParam(id);

  if (safeId) {
    useFormMode(safeId, useSettlementContentStore, getSettlementById); 
  }

  const { saveSettlement } = useSaveSettlementMutation({ id: safeId, mode: mode ?? "add" });

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues,
  });

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  async function handleGenerate() {
    const { watch, setValue } = methods;
    const currentValues = watch();
    const normalizedInput = normalizeInput(currentValues);

    const generatedValues = await generateSettlementWithName(normalizedInput);
    // If name field is empty, populate it, else preserve the existing name
    if (currentValues.name.trim()) {
      generatedValues.name = currentValues.name;
    }

    Object.entries(generatedValues).forEach(([key, value]) => {
      setValue(key as keyof SettlementFormData, value);
    });
  }

  async function handleReroll() {
    const normalizedInput = normalizeInput(defaultSettlementValues);
    const generatedValues = await generateSettlementWithName(normalizedInput);

    methods.reset(generatedValues);
  }

  const onSubmit = async (data: SettlementFormData) => {
    const result = await saveSettlement(data);
    if (result && result.success && result.settlement) {
      router.push(`/settlements/${result.settlement._id}`);
    }
  };

  return (
    <SkeletonLoader loading={!hasLoaded} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SettlementForm onSubmit={onSubmit} mode={mode} onGenerate={handleGenerate} onReroll={handleReroll} />
      </FormProvider>
    </SkeletonLoader>
  );
}
