'use client'

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { locationSchema, defaultLocationValues, LocationFormData } from "@/schemas/locationSchema";
import { useUIStore } from "@/store/uiStore";
import { useLocationContentStore } from "@/store/locationStore";
import LocationForm from '@/components/Location/Form/LocationForm';
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformLocationFormData } from "@/lib/util/transformFormDataForDB";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { usePaginatedLocations } from "@/hooks/location.query";
import { LocationType } from "@/interfaces/location.interface";

export default function NewLocationPage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const typeParam = searchParams?.get("type") as LocationFormData["type"];
    const router = useRouter();

    const { showSnackbar } = useUIStore();
    const { mode } = useLocationContentStore();
    const { refetch } = usePaginatedLocations(settlementId, 1, 10, [], "");
    const { addLocation } = useSettlementLoader(settlementId);

    const methods = useFormWithSchema(locationSchema, {
        defaultValues: {
            ...defaultLocationValues[typeParam],
        }
    });

    const onSubmit = async (data: LocationFormData) => {
        try {
            // Upload image to Cloudinary if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");
        
            const locationData = {
              ...transformLocationFormData(data),
              image: cleanImage,
            } as LocationType;
        
            await addLocation(locationData, settlementId);
            await refetch(); 
        
            showSnackbar("Location created successfully!", "success");
            router.push(`/settlements/${settlementId}`);
          } catch (err) {
            showSnackbar(`Something went wrong: ${err}`, "error");
          }
    }
    
    return (
        <FormProvider {...methods}>
            <LocationForm onSubmit={onSubmit} mode={mode} />
        </FormProvider>
    )
}