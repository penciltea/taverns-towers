"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { townSchema, TownFormData, defaultTownValues } from "@/schemas/townSchema";
import { getTownById } from "@/lib/actions/town.actions";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import TownForm from "@/components/Town/Form/TownForm";
import { normalizeTownData } from "@/lib/util/normalizeTownData";
import { useSaveTownMutation } from "@/hooks/useSaveTownMutation";
import { SkeletonLoader } from "@/components/Common/SkeletonLoader";
import { Spinner } from "@/components/Common/Spinner";

export default function EditTownFormPage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const { showSnackbar, setLoading, isSubmitting } = useUIStore();
  const { setSelectedItem, mode } = useTownContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);

  if (safeId) {
    useFormMode(safeId, useTownContentStore, getTownById);
  }

  const { saveTown } = useSaveTownMutation({ id: safeId, mode: mode ?? "edit" });

  const methods = useFormWithSchema(townSchema, {
    defaultValues: defaultTownValues
  });

  const loadTown = async (id: string) => {
    setLoading(true);
    try {
      const fetchedTown = await getTownById(id);
      if (!fetchedTown) {
        showSnackbar("Town not found.", "error");
        return;
      }

      setSelectedItem(fetchedTown);

      const mergedTown = normalizeTownData({
        ...defaultTownValues,
        ...fetchedTown,
      });

      methods.reset(mergedTown);
      setHasLoaded(true);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to load town, please try again later!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!safeId || mode !== "edit") return;
    loadTown(safeId);
  }, [safeId, mode]);

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
