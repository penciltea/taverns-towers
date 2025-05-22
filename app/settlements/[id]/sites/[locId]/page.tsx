'use client'

import { useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { FormProvider } from "react-hook-form";
import { siteSchema, defaultSiteValues, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import { updateSite, getSiteById } from "@/lib/actions/site.actions";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformSiteFormData } from "@/lib/util/transformFormDataForDB";
import SiteForm from "@/components/Site/Form/SiteForm";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { useFormMode } from "@/hooks/useFormMode";
import { usePaginatedSites } from "@/hooks/site.query";
import { useSettlementLoader } from "@/hooks/useSettlementLoader";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { generateMenuItems } from "@/lib/actions/siteGenerator.actions";
import { generateSiteValues } from "@/lib/modules/sites/siteRules";
import { useSiteGenerator } from "@/hooks/useSiteGenerator";
import { useSettlementContentStore } from "@/store/settlementStore";


export default function EditSitePage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const { locId } = useParams();
    const safeId = getSingleParam(locId);
    const typeParam = searchParams?.get("type") as SiteFormData["type"];
    const router = useRouter();

    const { showSnackbar, showErrorDialog, } = useUIStore();
    const { setSelectedItem, selectedItem, mode } = useSiteContentStore();
    useFormMode(safeId, useSiteContentStore, getSiteById);
    const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");
    const { settlement } = useSettlementLoader(settlementId);

    const methods = useFormWithSchema(siteSchema, {
        defaultValues: {
            ...defaultSiteValues[typeParam],
        }
    });

    const { reset } = methods;

    useEffect(() => {
        if (!safeId) return;
    
        const loadSite = async () => {
          try {
            const fetchedSite = await getSiteById(safeId);
            setSelectedItem(fetchedSite);
            reset({
              ...fetchedSite,
              type: fetchedSite.type as SiteFormData["type"],
              image: fetchedSite.image ?? undefined,
            });
          } catch (err) {
            showErrorDialog("Failed to load settlement, please try again later!");
          }
        };
    
        loadSite();
    }, [safeId, reset, setSelectedItem, showSnackbar]);

    const siteType = mode === "edit"
    ? selectedItem?.type
    : (searchParams?.get("type") as SiteFormData["type"] | undefined);

    useEffect(() => {
        if (settlement) {
            useSettlementContentStore.getState().setContext?.({
            terrain: settlement.terrain,
            climate: settlement.climate,
            tags: settlement.tags,
            });
        }
    }, [settlement]);

    const generator = useSiteGenerator(methods, {
        siteType: siteType,
        terrain: settlement?.terrain ?? [],
        climate: settlement?.climate ?? "",
        tags: settlement?.tags ?? [],
    });

    const onSubmit = async (data: SiteFormData) => {
        const cleanImage = await handleDynamicFileUpload(data, "image");

        if(!safeId){
          showErrorDialog("There was a problem saving this site, please try again later!");
          return;
        }

        try {
            const siteData = {
                ...transformSiteFormData(data),
                image: cleanImage,
            };

            let savedSite;
            savedSite = await updateSite(siteData, safeId);
            await refetch(); 
            showSnackbar(`Site ${mode === 'edit' ? "updated" : "created"} successfully!`, "success");
            router.push(`/settlements/${settlementId}`);
        } catch (err){
            showErrorDialog("Something went wrong, please try again later!");
        }
    }
    
    return (
        <FormProvider {...methods}>
            <SiteForm onSubmit={onSubmit} mode={mode} generator={generator} />
        </FormProvider>
    )
} 