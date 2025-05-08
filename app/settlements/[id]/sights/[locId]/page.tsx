'use client'

import { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { FormProvider } from "react-hook-form";
import { sightSchema, defaultSightValues, SightFormData } from "@/schemas/sightSchema";
import { useUIStore } from "@/store/uiStore";
import { useSightContentStore } from "@/store/sightStore";
import { updateSight, getSightById } from "@/lib/actions/sight.actions";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSightFormData } from "@/lib/util/transformFormDataForDB";
import SightForm from '@/components/Sight/Form/SightForm'
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { usePaginatedSights } from "@/hooks/sight.query";

export default function EditSightPage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const { locId } = useParams();
    const safeId = getSingleParam(locId);
    const typeParam = searchParams?.get("type") as SightFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { setSelectedItem, mode } = useSightContentStore();
    useFormMode(safeId, useSightContentStore, getSightById);
    const { refetch } = usePaginatedSights(settlementId, 1, 10, [], "");

    const methods = useFormWithSchema(sightSchema, {
        defaultValues: {
            ...defaultSightValues[typeParam],
        }
    });

    const { reset } = methods;

    useEffect(() => {
        if (!safeId) return;
    
        const loadSight = async () => {
          try {
            const fetchedSight = await getSightById(safeId);
            setSelectedItem(fetchedSight);
            reset({
              ...fetchedSight,
              type: fetchedSight.type as SightFormData["type"],
              image: fetchedSight.image ?? undefined,
            });
          } catch (err) {
            showSnackbar("Failed to load settlement, please try again later!", "error");
          }
        };
    
        loadSight();
      }, [safeId, reset, setSelectedItem, showSnackbar]);

    const onSubmit = async (data: SightFormData) => {
        const cleanImage = await handleDynamicFileUpload(data, "image");

        if(!safeId){
          showSnackbar(`There was a problem saving this sight, please try again later.`, "error");
          return;
        }

        try {
            const sightData = {
                ...transformSightFormData(data),
                image: cleanImage,
            };

            let savedSight;
            savedSight = await updateSight(sightData, safeId);
            await refetch(); 
            showSnackbar(`Sight ${mode === 'edit' ? "updated" : "created"} successfully!`, "success");
            router.push(`/settlements/${settlementId}`);
        } catch (err){
            showSnackbar(`Something went wrong: ${err}`, "error");
        }
    }
    
    return (
        <FormProvider {...methods}>
            <SightForm onSubmit={onSubmit} mode={mode} />
        </FormProvider>
    )
} 