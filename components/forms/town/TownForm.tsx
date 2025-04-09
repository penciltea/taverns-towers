"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography, } from "@mui/material";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import TownFormTabs from '@/components/forms/town/TownFormTabs';
import TownFormBasics from "./TownFormBasics";
import TownFormWealth from '@/components/forms/town/TownFormWealth';
import TownFormCulture from "./TownFormCulture";


export default function TownForm() {
  const methods = useForm<TownFormData>({
    resolver: zodResolver(townSchema),
    defaultValues: {
      name: "",
      size: "",
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
      //map: undefined //ToDo: Fix
    },
  });

  const [tab, setTab] = useState(0);
  const { register, handleSubmit, formState: { errors } } = methods;


  const onSubmit = (data: TownFormData) => {
    console.log("Form submitted:", data);
    //ToDo: API call
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