"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useSettlementContentStore } from "@/store/settlementStore";
import { settlementSchema, SettlementFormData, defaultSettlementValues } from "@/schemas/settlementSchema";
import { getSettlementById } from "@/lib/actions/settlement.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import SettlementForm from "@/components/Settlement/Form/SettlementForm";
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";

export default function NewSettlementPage() {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
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
