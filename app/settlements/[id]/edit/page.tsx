"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { normalizeSettlementData } from "@/lib/util/normalizeSettlementData";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useSettlementQuery } from "@/hooks/settlement.query";
import { useSettlementFormHandlers } from "@/hooks/useSettlementFormHandlers";


export default function EditSettlementFormPage() {
  const { showErrorDialog } = useUIStore();
  const { setSelectedItem, clearSelectedItem, mode } = useSettlementContentStore();
  
  const { id } = useParams();
  const safeId = getSingleParam(id);
  
  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues
  });

  useFormMode(safeId, useSettlementContentStore);
  const { handleGenerate, handleReroll, onSubmit } = useSettlementFormHandlers(methods, safeId ?? null, mode ?? "add");
  const { data: settlement, isLoading, error } = useSettlementQuery(safeId ?? null);

  // Update Zustand and reset form when data arrives
  useEffect(() => {
    if (isLoading) return;
    
    if(settlement){
      setSelectedItem(settlement);

      const mergedSettlement = normalizeSettlementData({
        ...defaultSettlementValues,
        ...settlement
      }) as SettlementFormData;

      methods.reset(mergedSettlement);
    } else if(safeId && !isLoading){
      // If no settlement, clear selection
      clearSelectedItem();
      showErrorDialog("Settlement could not be found, please try again later!")

    }
  }, [settlement, isLoading, safeId, setSelectedItem, clearSelectedItem, methods, showErrorDialog]);

  if (error) {
    return (
      <div className="error-message">
        Error loading settlement: {error.message}
      </div>
    );
  }

  return (
    <SkeletonLoader loading={!isLoading} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SettlementForm onSubmit={onSubmit} mode={mode} onGenerate={handleGenerate} onReroll={handleReroll} />
      </FormProvider>
    </SkeletonLoader>
  );
}
