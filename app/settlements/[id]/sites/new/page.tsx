'use client'

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { siteSchema, defaultSiteValues, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import SiteForm from '@/components/Site/Form/SiteForm';
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { usePaginatedSites } from "@/hooks/site.query";
import { SiteType } from "@/interfaces/site.interface";

export default function NewSitePage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const typeParam = searchParams?.get("type") as SiteFormData["type"];
    const router = useRouter();

    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode } = useSiteContentStore();
    const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");
    const { settlement, addSite } = useSettlementLoader(settlementId);

    const methods = useFormWithSchema(siteSchema, {
        defaultValues: {
            ...defaultSiteValues[typeParam],
        }
    });

    const onSubmit = async (data: SiteFormData) => {
        try {
            // Upload image to Cloudinary if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");
        
            const siteData = {
              ...transformSiteFormData(data),
              image: cleanImage,
            } as SiteType;
        
            await addSite(siteData, settlementId);
            await refetch(); 
        
            showSnackbar("Site created successfully!", "success");
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
            <SiteForm onSubmit={onSubmit} mode={mode} settlementContext={settlementContext} />
        </FormProvider>
    )
}