"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography, } from "@mui/material";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import { useUIStore } from "@/store/uiStore";
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
      map: ""
    },
  });

  const [tab, setTab] = useState(0);
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: TownFormData) => {
    console.log(data);
    try {
      const response = await fetch(`/api/towns${townId ? `?id=${townId}` : ''}`, {
        method: townId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      //globalMutate(queryKey);

      if (!response.ok) {
        console.log("Error saving town:", response.statusText);
        showSnackbar(`Failed to ${townId ? "update" : "create"} tpwn: ${response.statusText}`, "error");
      }
      
      if(response.status === 201 || response.status === 200){
        const { _id } = await response.json();
        console.log("town saved!");
        showSnackbar(`Town ${townId ? "updated" : "created"} successfully!`, "success");
        //router.push(`/quest/${_id}?success=true`); // Redirect to the created/updated quest
         
      } else {
        console.log("Error saving town:", response.statusText);
        showSnackbar(`Failed to ${townId ? "update" : "create"} town: ${response.statusText}`, "error");
      }                
    } catch (err) {
        console.error("Error submitting form:", err);
        showSnackbar("Something went wrong. Please try again.", "error");
    }
  };

  const onError = (errors: any) => {
    console.error("Validation errors:", errors);
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