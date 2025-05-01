"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlementSchema";
import { getSettlementById } from "@/lib/actions/settlement.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { normalizeSettlementData } from "@/lib/util/normalizeSettlementData";
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";

export default function EditSettlementFormPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { showSnackbar, setLoading, isSubmitting } = useUIStore();
  const { setSelectedItem, mode } = useSettlementContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);

  if (safeId) {
    useFormMode(safeId, useSettlementContentStore, getSettlementById);
  }

  const { saveSettlement } = useSaveSettlementMutation({ id: safeId, mode: mode ?? "edit" });

  const methods = useFormWithSchema(settlementSchema, {
    defaultValues: defaultSettlementValues
  });

  const loadSettlement = async (id: string) => {
    setLoading(true);
    try {
      const fetchedSettlement = await getSettlementById(id);
      if (!fetchedSettlement) {
        showSnackbar("Settlement not found.", "error");
        return;
      }

      setSelectedItem(fetchedSettlement);

      const mergedSettlement = normalizeSettlementData({
        ...defaultSettlementValues,
        ...fetchedSettlement,
      });

      methods.reset(mergedSettlement);
      setHasLoaded(true);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load settlement, please try again later!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!safeId || mode !== "edit") return;
    loadSettlement(safeId);
  }, [safeId, mode]);

  const onSubmit = async (data: SettlementFormData) => {
    await saveSettlement(data);
  };

  return (
    <SkeletonLoader loading={!hasLoaded} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <SettlementForm onSubmit={onSubmit} mode={mode} />
      </FormProvider>
    </SkeletonLoader>
  );
}
