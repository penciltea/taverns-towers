"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { normalizeSettlementData } from "@/lib/util/normalizeSettlementData";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";
import { useSettlementQuery } from "@/hooks/settlement/settlement.query";
import { useSettlementFormSetup } from "@/hooks/settlement/useSettlementFormSetup";
import { useFormMode } from "@/hooks/useFormMode";
import { NpcConnection } from "@/interfaces/connection.interface";
import { useHandleDeletedConnections } from "@/hooks/connection/useHandleDeletedConnections";

export default function EditSettlementFormPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const [initialConnections, setInitialConnections] = useState<NpcConnection[]>([]);


  useFormMode(safeId, useSettlementContentStore);
  const { mode } = useSettlementContentStore();

  const { showErrorDialog } = useUIStore();
  const { setSelectedItem, clearSelectedItem } = useSettlementContentStore();
  
  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues
  });

  const { data: settlement, isLoading, error } = useSettlementQuery(safeId ?? null);

  const { onGenerate, onReroll, onSubmit } = useSettlementFormSetup(methods, safeId ?? null, mode ?? "edit");
  const { handleDeletedConnections } = useHandleDeletedConnections<SettlementFormData>("settlement");
  

  // Update Zustand and reset form when data arrives
  useEffect(() => {
    if (isLoading) return;
    
    if(settlement){
      setSelectedItem(settlement);
      setInitialConnections(settlement.connections);

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

  const wrappedSubmit = async (data: SettlementFormData) => {
    const normalizedConnections = Array.isArray(data.connections) ? data.connections : [];

    await handleDeletedConnections({
      sourceId: safeId ?? "",
      initialConnections,
      currentConnections: data.connections,
      formData: data,
      onConfirm: async (formData) => {
        await onSubmit(formData);
      },
    });

    // Update initialConnections so next deletion is correct
    setInitialConnections(normalizedConnections);
  };

  if (error) {
    return (
      <div className="error-message">
        Error loading settlement: {error.message}
      </div>
    );
  }

  return (
    <SkeletonLoader loading={isLoading} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SettlementForm onSubmit={wrappedSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
      </FormProvider>
    </SkeletonLoader>
  );
}
