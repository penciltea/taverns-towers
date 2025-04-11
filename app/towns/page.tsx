"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Typography } from "@mui/material";
import { useUIStore } from "@/store/uiStore";
import { useTownStore } from "@/store/townStore";
import getTownById from "@/lib/api/towns/getById";
import { townSchema, TownFormData } from "@/schemas/townSchema";
import TownFormTabs from '@/components/forms/town/TownFormTabs';
import TownFormBasics from "@/components/forms/town/TownFormBasics";
import TownFormWealth from '@/components/forms/town/TownFormWealth';
import TownFormCulture from "@/components/forms/town/TownFormCulture";
import { Town } from "@/interfaces/town.interface";

export default function TownFormPage() {
  const searchParams = useSearchParams();
  const townId = searchParams?.get("id");
  const isEditMode = !!townId;

  const router = useRouter();
  const { showSnackbar } = useUIStore();
  const { setTown } = useTownStore();

  const [tab, setTab] = useState(0);
  const [town, setLocalTown] = useState<Town | null>(null);

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
    let imageUrl: string | undefined = undefined;

    const fileInput = data.map as unknown as FileList;

    if (fileInput && fileInput[0]) {
    const formData = new FormData();
    formData.append("file", fileInput[0]);
    formData.append("upload_preset", "town_maps");

    const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    if (!cloudinaryUrl) {
        showSnackbar("Cloudinary URL is not defined in environment variables", "error");
        return;
    }

    const cloudinaryRes = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
    });

    const result = await cloudinaryRes.json();
    imageUrl = result.secure_url;
    }

    // Determine final `map` value
    const cleanMap =
    typeof data.map === "string" && data.map.startsWith("http")
        ? data.map // it's already a URL
        : imageUrl ?? undefined; // uploaded or nothing

        
    try {
        const response = await fetch(`/api/towns${townId ? `?id=${townId}` : ''}`, {
            method: townId ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...data, map: cleanMap }),
          });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const { _id } = await response.json();
      showSnackbar(`Town ${townId ? "updated" : "created"} successfully!`, "success");
      router.push(`/towns/${_id}?success=true`);
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