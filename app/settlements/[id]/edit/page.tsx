"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";
import { getSettlementById } from "@/lib/actions/settlement.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { normalizeSettlementData } from "@/lib/util/normalizeSettlementData";
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { normalizeSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { generateSettlementData } from "@/lib/actions/settlementGenerator.actions";
import { useSettlementQuery } from "@/hooks/settlement.query";


export default function EditSettlementFormPage() {
  const router = useRouter();
  const [ hasLoaded, setHasLoaded ] = useState(false);
  const { setLoading, showErrorDialog } = useUIStore();
  const { setSelectedItem, clearSelectedItem, mode } = useSettlementContentStore();
  const [ loadedSettlementValues, setLoadedSettlementValues ] = useState<SettlementFormData | null>(null);

  const { id } = useParams();
  const safeId = getSingleParam(id);
  
  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues
  });

  useFormMode(safeId, useSettlementContentStore);

  const { data: settlement, isLoading, error } = useSettlementQuery(safeId ?? null);

  // Update Zustand and reset form when data arrives
  useEffect(() => {
    if(settlement){
      setSelectedItem(settlement);

      const mergedSettlement = normalizeSettlementData({
        ...defaultSettlementValues,
        ...settlement
      }) as SettlementFormData;

      methods.reset(mergedSettlement);
      setHasLoaded(true);
    } else if(safeId && !isLoading){
      // If no settlement, clear selection

      clearSelectedItem();
      showErrorDialog("Settlement not found, please try again later!")

    }
  }, [settlement, isLoading, safeId, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);

  if (error) {
    return (
      <div className="error-message">
        Error loading settlement: {error.message}
      </div>
    );
  }


  const { saveSettlement } = useSaveSettlementMutation({ id: safeId, mode: mode ?? "edit" });

  async function handleGenerate() {
    const { watch, setValue } = methods;
    const currentValues = watch();

    // Normalize current input to handle "random" etc.
    const normalizedInput = normalizeSettlementInput(currentValues);

    // Generate full data from normalized input (rerollAll = false)
    const generatedValues = await generateSettlementData(normalizedInput, false);

    // Only fill in missing or empty fields, preserve existing values (including name)
    Object.entries(generatedValues).forEach(([key, value]) => {
      const currentVal = currentValues[key as keyof SettlementFormData];
      if (
        currentVal === undefined ||
        currentVal === null ||
        (typeof currentVal === "string" && currentVal.trim() === "") ||
        (Array.isArray(currentVal) && currentVal.length === 0)
      ) {
        setValue(key as keyof SettlementFormData, value);
      }
    });
  }
  
  async function handleReroll() {
    const generatedValues = await generateSettlementData(defaultSettlementValues, true);

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
