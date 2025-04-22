"use client";

import { useRouter, useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { townSchema, TownFormData, defaultTownValues } from "@/schemas/townSchema";
import { createTown, getTownById } from "@/lib/actions/town.actions";
import { transformTownFormData } from "@/lib/util/transformFormDataForDB";
import { handleDynamicFileUpload  } from "@/lib/util/uploadToCloudinary";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import TownForm from "@/components/Town/Form/TownForm";

export default function TownFormPage() {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { mode } = useTownContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);
  useFormMode(safeId, useTownContentStore, getTownById);

  const methods = useFormWithSchema(townSchema, {
    defaultValues: defaultTownValues
  });

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
      savedTown = await createTown(townData);
    
      showSnackbar("Town created successfully!", "success");
      useTownContentStore.getState().clearSelectedItem();
      useTownContentStore.getState().clearMode();
      router.push(`/towns/${savedTown._id}`);      
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