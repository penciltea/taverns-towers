'use client'

import { useRouter, useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { siteSchema, defaultSiteValues, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import SiteForm from "@/components/Site/Form/SiteForm";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { usePaginatedSites } from "@/hooks/site.query";
import { SiteType } from "@/interfaces/site.interface";
import { useSiteGenerator } from "@/hooks/useSiteGenerator";
import { useSettlementContentStore } from "@/store/settlementStore";
import { useEffect } from "react";
import { generateWildernessContext } from "@/lib/modules/settlements/settlementRules";
import { createSite } from "@/lib/actions/site.actions";

export default function NewSitePage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const typeParam = searchParams?.get("type") as SiteFormData["type"];
    const router = useRouter();

    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode } = useSiteContentStore();
    const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");
    
    // Sites can be created in context of a settlement or in the "wilderness"/detached from a settlement
    // The block below determines if a site is in the wilderness or not and handles appropriate hooks and generators
    const isWilderness = settlementId === "wilderness";
    
    const wildernessContext = isWilderness ? generateWildernessContext() : null;
    const settlementLoader = isWilderness ? null : useSettlementLoader(settlementId);

    const settlement = settlementLoader?.settlement;

    useEffect(() => {
        if (settlement) {
            useSettlementContentStore.getState().setContext?.({
                terrain: settlement.terrain,
                climate: settlement.climate,
                tags: settlement.tags,
            });
        } else if (wildernessContext) {
            useSettlementContentStore.getState().setContext?.({
                terrain: wildernessContext.terrain,
                climate: wildernessContext.climate,
                tags: wildernessContext.tags,
            });
        }
    }, [settlement, wildernessContext]);

    const methods = useFormWithSchema(siteSchema, {
        defaultValues: {
            ...defaultSiteValues[typeParam],
        }
    });


    const generator = useSiteGenerator(methods, {
        siteType: typeParam,
        terrain: isWilderness ? wildernessContext?.terrain ?? [] : settlement?.terrain ?? [],
        climate: isWilderness ? wildernessContext?.climate ?? "" : settlement?.climate ?? "",
        tags: isWilderness ? wildernessContext?.tags ?? [] : settlement?.tags ?? [],
    });

    const onSubmit = async (data: SiteFormData) => {
        try {
            console.log("Creating site with settlementId:", settlementId);
            
            const cleanImage = await handleDynamicFileUpload(data, "image");

            const siteData = {
                ...transformSiteFormData(data),
                image: cleanImage,
            } as SiteType;

            await createSite(siteData, settlementId);
            if (settlementId !== 'wilderness') {
                await refetch();
            }
            showSnackbar("Site created successfully!", "success");
            //router.push(`/settlements/${settlementId}`);
        } catch (err) {
            showErrorDialog("Something went wrong, please try again later!");
        }
    };
    
    return (
        <FormProvider {...methods}>
            <SiteForm onSubmit={onSubmit} mode={mode} generator={generator} isWilderness={isWilderness} />
        </FormProvider>
    )
}