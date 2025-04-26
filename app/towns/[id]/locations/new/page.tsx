'use client'

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { Location } from "@/interfaces/location.interface";
import { locationSchema, defaultLocationValues, LocationFormData } from "@/schemas/locationSchema";
import { useUIStore } from "@/store/uiStore";
import { useLocationContentStore } from "@/store/locationStore";
import LocationForm from '@/components/Location/Form/LocationForm'
import { createLocation, updateLocation, getLocationById } from "@/lib/actions/location.action";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformLocationFormData } from "@/lib/util/transformFormDataForDB";

export default function NewLocationPage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const townId = params.id as string;
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { mode } = useLocationContentStore();

    const methods = useFormWithSchema(locationSchema, {
        defaultValues: {
            ...defaultLocationValues[typeParam],
        }
    });

    const onSubmit = async (data: LocationFormData) => {
        const cleanImage = await handleDynamicFileUpload(data, "image");

        try {
            const locationData = {
                ...transformLocationFormData(data),
                image: cleanImage,
            };
            
            let savedLocation;
            savedLocation = await createLocation(locationData, townId);

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