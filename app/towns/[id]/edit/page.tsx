"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { townSchema, TownFormData, defaultTownValues } from "@/schemas/townSchema";
import { createTown, updateTown, getTownById } from "@/lib/actions/town.actions";
import { transformTownFormData } from "@/lib/util/transformFormDataForDB";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import TownForm from "@/components/Town/Form/TownForm";

export default function EditTownFormPage() {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { setSelectedItem, mode } = useTownContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);
  useFormMode(safeId, useTownContentStore, getTownById);

  const methods = useFormWithSchema(townSchema, {
    defaultValues: defaultTownValues
  });

  const { reset } = methods;

  useEffect(() => {
    if (!safeId) return;

    const loadTown = async () => {
      try {
        const fetchedTown = await getTownById(safeId);
        setSelectedItem(fetchedTown);
        reset({
          ...fetchedTown,
          tags: (fetchedTown.tags as string[])?.filter(tag => tag.trim() !== "") ?? [],
          terrain: (fetchedTown.terrain as string[])?.filter(terrain => terrain.trim() !== "") ?? [],
          crime: (fetchedTown.crime as string[])?.filter(crime => crime.trim() !== "") ?? [],
          map: fetchedTown.map ?? undefined,
        });
      } catch (err) {
        showSnackbar("Failed to load town, please try again later!", "error");
      }
    };

    loadTown();
  }, [safeId, reset, setSelectedItem, showSnackbar]);

  const onSubmit = async (data: TownFormData) => {
    const cleanMap = await handleDynamicFileUpload(data, "map");
    
    try {
      if (Array.isArray(data.tags)) {
        data.tags = data.tags.filter(tag => tag.trim() !== '');
      }

      const townData = {
        ...transformTownFormData(data),
        map: cleanMap,
      };
    
      let savedTown;
      if (safeId) {
        savedTown = await updateTown(safeId, townData);
      } else {
        savedTown = await createTown(townData);
      }
    
      showSnackbar("Town updated successfully!", "success");
      useTownContentStore.getState().clearSelectedItem();
      useTownContentStore.getState().clearMode();
      router.push(`/towns/${savedTown?._id}`);      
    } catch (err) {
      showSnackbar(`Something went wrong: ${err}`, "error");
    }
  };
  

  return (
    <FormProvider {...methods}>
      <TownForm onSubmit={onSubmit} mode={mode} />
    </FormProvider>
  );
}