"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import { useTownStore } from "@/store/townStore";
import { getTownById } from "@/lib/actions/town.actions";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import TownFormTabs from '@/components/forms/town/TownFormTabs';
import TownFormBasics from "@/components/forms/town/TownFormBasics";
import TownFormWealth from '@/components/forms/town/TownFormWealth';
import TownFormCulture from "@/components/forms/town/TownFormCulture";
import { Town } from "@/interfaces/town.interface";
import { createTown, updateTown } from "@/lib/actions/town.actions";
import { transformTownFormData } from "@/lib/util/transformFormDataForDB";
import { uploadToCloudinary } from "@/lib/util/uploadToCloudinary";

export default function TownFormPage() {
  const searchParams = useSearchParams();
  const townId = searchParams?.get("id");
  const isEditMode = !!townId;

  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { setTown } = useTownStore();

  const [tab, setTab] = useState(0);
  const [town, setLocalTown] = useState<Town | null>(null);
  const tabComponents = [<TownFormBasics />, <TownFormWealth />, <TownFormCulture />];

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
      crime: "",
      map: undefined,
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!townId) return;

    const loadTown = async () => {
      try {
        const fetchedTown = await getTownById(townId);
        setLocalTown(fetchedTown);
        setTown(fetchedTown);
        reset({
          ...fetchedTown,
          tags: fetchedTown.tags?.filter(tag => tag.trim() !== "") ?? [],
          map: fetchedTown.map ?? undefined,
        });
      } catch (err) {
        console.error("Failed to load town:", err);
        showSnackbar("Failed to load town", "error");
      }
    };

    loadTown();
  }, [townId, reset, setTown, showSnackbar]);

  const onSubmit = async (data: TownFormData) => {
    let imageUrl: string | undefined;
  
    const fileInput = data.map as unknown as FileList;

    if (typeof fileInput !== "string" && fileInput[0]) {
      imageUrl = await uploadToCloudinary(fileInput[0]); //only attempt to upload to Cloudinary if filetype is not a string (ie., file has been uploaded/not already existing)
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
      if (townId) {
        savedTown = await updateTown(townId, townData);
      } else {
        savedTown = await createTown(townData);
      }
    
      showSnackbar(`Town ${townId ? "updated" : "created"} successfully!`, "success");
      router.push(`/towns/${savedTown._id}`);
    } catch (err) {
      showSnackbar(`Something went wrong: ${err}`, "error");
    }
  };
  

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" gutterBottom>
          {isEditMode ? "Edit Town" : "Create Town"}
        </Typography>

        <TownFormTabs tab={tab} setTab={setTab} />

        {tabComponents[tab]}

        <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
          {townId ? "Update" : "Create"} Town
        </Button>
      </form>
    </FormProvider>
  );
}