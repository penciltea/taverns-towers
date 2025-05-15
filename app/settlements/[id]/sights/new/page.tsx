'use client'

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { sightSchema, defaultSightValues, SightFormData } from "@/schemas/sight.schema";
import { useUIStore } from "@/store/uiStore";
import { useSightContentStore } from "@/store/sightStore";
import SightForm from '@/components/Sight/Form/SightForm';
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSightFormData } from "@/lib/util/transformFormDataForDB";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { usePaginatedSights } from "@/hooks/sight.query";
import { SightType } from "@/interfaces/sight.interface";

export default function NewSightPage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const typeParam = searchParams?.get("type") as SightFormData["type"];
    const router = useRouter();

    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode } = useSightContentStore();
    const { refetch } = usePaginatedSights(settlementId, 1, 12, [], "");
    const { settlement, addSight } = useSettlementLoader(settlementId);

    const methods = useFormWithSchema(sightSchema, {
        defaultValues: {
            ...defaultSightValues[typeParam],
        }
    });

    const onSubmit = async (data: SightFormData) => {
        try {
            // Upload image to Cloudinary if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");
        
            const sightData = {
              ...transformSightFormData(data),
              image: cleanImage,
            } as SightType;
        
            await addSight(sightData, settlementId);
            await refetch(); 
        
            showSnackbar("Sight created successfully!", "success");
            router.push(`/settlements/${settlementId}`);
          } catch (err) {
            showErrorDialog("Something went wrong, please try again later!");
          }
    }

    const settlementContext = settlement
    ? {
        terrain: settlement.terrain,
        climate: settlement.climate,
        tags: settlement.tags,
        }
    : {
        terrain: [],
        climate: '',
        tags: [],
    };
    
    return (
        <FormProvider {...methods}>
            <SightForm onSubmit={onSubmit} mode={mode} settlementContext={settlementContext} />
        </FormProvider>
    )
}