"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography, } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import TownFormTabs from '@/components/forms/town/TownFormTabs';
import TownFormBasics from "./TownFormBasics";
import TownFormWealth from '@/components/forms/town/TownFormWealth';
import TownFormCulture from "./TownFormCulture";

export default function TownForm() {
  const searchParams = useSearchParams();
  const townId = searchParams.get("id"); // Get ID from URL params
  const router = useRouter();

  const { showSnackbar } = useUIStore();

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
      map: undefined //ToDo: Fix
    },
  });

  const [tab, setTab] = useState(0);
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: TownFormData) => {
    let imageUrl = '';

    const fileInput = data.map as unknown as FileList;

    if (fileInput && fileInput[0]) {
      const formData = new FormData();
      formData.append("file", fileInput[0]);
      formData.append("upload_preset", "town_maps");
      
      const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
      
      if (!cloudinaryUrl) {
        showSnackbar('Cloudinary URL is not defined in environment variables', 'error');
        return;
      }

      const cloudinaryRes = await fetch(cloudinaryUrl ,
        {
          method: "POST",
          body: formData,
        }
      );
    
      const result = await cloudinaryRes.json();
      imageUrl = result.secure_url;
    }

    try {
      const response = await fetch(`/api/towns${townId ? `?id=${townId}` : ''}`, {
        method: townId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, map: imageUrl })
      });

      //globalMutate(queryKey);

      if (!response.ok) {
        showSnackbar(`Failed to ${townId ? "update" : "create"} town: ${response.statusText}`, "error");
      }
      
      if(response.status === 201 || response.status === 200){
        const { _id } = await response.json();
        showSnackbar(`Town ${townId ? "updated" : "created"} successfully!`, "success");
        router.push(`/towns/${_id}?success=true`); // Redirect to the created/updated town
         
      } else {
        showSnackbar(`Failed to ${townId ? "update" : "create"} town: ${response.statusText}`, "error");
      }                
    } catch (err) {
        showSnackbar(`Something went wrong! Error: ${err}`, "error");
    }
  };

  const onError = (errors: any) => {
    showSnackbar(`${errors}`, "error");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Typography variant="h4" gutterBottom>Create Town</Typography>

        <TownFormTabs tab={tab} setTab={setTab} />

        {tab === 0 && <TownFormBasics />}
        {tab === 1 && <TownFormWealth />}
        {tab === 2 && <TownFormCulture />}

        <Button type="submit" variant="contained" sx={{ mt: 3 }} size="large">
          Save Town
        </Button>
      </form>
    </FormProvider>
  );
}