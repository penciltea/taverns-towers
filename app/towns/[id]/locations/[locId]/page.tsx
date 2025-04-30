'use client'

import { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { FormProvider } from "react-hook-form";
import { locationSchema, defaultLocationValues, LocationFormData } from "@/schemas/locationSchema";
import { useUIStore } from "@/store/uiStore";
import { useLocationContentStore } from "@/store/locationStore";
import { updateLocation, getLocationById } from "@/lib/actions/location.actions";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformLocationFormData } from "@/lib/util/transformFormDataForDB";
import LocationForm from '@/components/Location/Form/LocationForm'
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";

export default function EditLocationPage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const townId = params.id as string;
    const { locId } = useParams();
    const safeId = getSingleParam(locId);
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { setSelectedItem, mode } = useLocationContentStore();
    useFormMode(safeId, useLocationContentStore, getLocationById);

    const methods = useFormWithSchema(locationSchema, {
        defaultValues: {
            ...defaultLocationValues[typeParam],
        }
    });

    const { reset } = methods;

    useEffect(() => {
        if (!safeId) return;
    
        const loadLocation = async () => {
          try {
            const fetchedLocation = await getLocationById(safeId);
            setSelectedItem(fetchedLocation);
            reset({
              ...fetchedLocation,
              type: fetchedLocation.type as LocationFormData["type"],
              image: fetchedLocation.image ?? undefined,
            });
          } catch (err) {
            showSnackbar("Failed to load town, please try again later!", "error");
          }
        };
    
        loadLocation();
      }, [safeId, reset, setSelectedItem, showSnackbar]);

    const onSubmit = async (data: LocationFormData) => {
        const cleanImage = await handleDynamicFileUpload(data, "image");

        if(!safeId){
          showSnackbar(`There was a problem saving this location, please try again later.`, "error");
          return;
        }

        try {
            const locationData = {
                ...transformLocationFormData(data),
                image: cleanImage,
            };

            let savedLocation;
            savedLocation = await updateLocation(locationData, safeId);

            showSnackbar(`Location ${mode === 'edit' ? "updated" : "created"} successfully!`, "success");
            router.push(`/towns/${townId}`);
        } catch (err){
            showSnackbar(`Something went wrong: ${err}`, "error");
        }
    }
    
    return (
        <FormProvider {...methods}>
            <LocationForm onSubmit={onSubmit} mode={mode} />
        </FormProvider>
    )
} 