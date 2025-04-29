"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { townSchema, TownFormData, defaultTownValues } from "@/schemas/townSchema";
import { getTownById } from "@/lib/actions/town.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import TownForm from "@/components/Town/Form/TownForm";
import { useSaveTownMutation } from "@/hooks/useSaveTownMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";

export default function NewTownPage() {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { mode } = useTownContentStore();

  const [hasLoaded, setHasLoaded] = useState(false);

  const { id } = useParams();
  const safeId = getSingleParam(id);

  if (safeId) {
    useFormMode(safeId, useTownContentStore, getTownById); 
  }

  const { saveTown } = useSaveTownMutation({ id: safeId, mode: mode ?? "add" });

  const methods = useFormWithSchema(townSchema, {
    defaultValues: defaultTownValues,
  });

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  const onSubmit = async (data: TownFormData) => {
    await saveTown(data);
  };

  return (
    <SkeletonLoader loading={!hasLoaded} skeleton={<Spinner />}>
      <FormProvider {...methods}>
        <TownForm onSubmit={onSubmit} mode={mode} />
      </FormProvider>
    </SkeletonLoader>
  );
}
