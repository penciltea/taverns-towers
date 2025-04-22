"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUIStore } from "@/store/uiStore";
import { useTownContentStore } from "@/store/townStore";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import { createTown, updateTown, getTownById } from "@/lib/actions/town.actions";
import { transformTownFormData } from "@/lib/util/transformFormDataForDB";
import { uploadToCloudinary } from "@/lib/util/uploadToCloudinary";
import { useFormMode } from "@/hooks/useFormMode";
import { getSingleParam } from "@/lib/util/getSingleParam";
import TownForm from "@/components/Town/Form/TownForm";

export default function TownFormPage() {
  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { setSelectedItem, mode } = useTownContentStore();

  const { id } = useParams();
  const safeId = getSingleParam(id);
  useFormMode(safeId, useTownContentStore, getTownById);

  const methods = useForm<TownFormData>({
    resolver: zodResolver(townSchema),
    defaultValues: {
      name: "",
      size: "",
      tags: [],
      terrain: [],
      climate: "",
      magic: "",
      races: "",
      publicNotes: "",
      gmNotes: "",
      leader: "",
      rulingStyle: "",
      wealth: "",
      tradeNotes: "",
      guilds: "",
      religion: "",
      holidays: "",
      folklore: "",
      crime: [],
      map: undefined,
    },
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
    let imageUrl: string | undefined;
  
    const fileInput = data.map as unknown as FileList;

    //only attempt to upload to Cloudinary if filetype is not a string (ie., file has been uploaded/not already existing)
    if (fileInput instanceof FileList && fileInput.length > 0) {
      imageUrl = await uploadToCloudinary(fileInput[0]); 
    }
  
    const cleanMap =
      typeof data.map === "string" && data.map.startsWith("http")
        ? data.map
        : imageUrl ?? undefined;
  
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