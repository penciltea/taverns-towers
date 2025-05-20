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
import { generatorMenuItem, SiteType } from "@/interfaces/site.interface";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { generateMenuItems } from "@/lib/actions/siteGenerator.actions";

export default function NewSitePage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const typeParam = searchParams?.get("type") as SiteFormData["type"];
    const router = useRouter();

    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode, selectedItem } = useSiteContentStore();
    const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");
    const { settlement, addSite } = useSettlementLoader(settlementId);

    const methods = useFormWithSchema(siteSchema, {
        defaultValues: {
            ...defaultSiteValues[typeParam],
        }
    });

    async function handleGenerateName() {
        const { setValue } = methods;

        const shopType = methods.watch("shopType")?.toLowerCase() ?? selectedItem?.shopType;

        if (!typeParam) return;
            const name = await generateSiteName({
            siteType: typeParam,
            shopType,
            terrain: settlementContext.terrain,
            climate: settlementContext.climate,
            tags: settlementContext.tags,
        });

        setValue("name", name); // Set name into RHF
    }

    async function handleGenerateMenu(){
        if (!typeParam) return;

        const shopType = methods.watch("shopType").toLowerCase() ?? selectedItem?.shopType;
        
        const menuItems = await generateMenuItems({
            siteType: typeParam,
            shopType,
            settlementTerrain: settlementContext.terrain ?? [],
            settlementClimate: settlementContext.climate,
            settlementTags: settlementContext.tags ?? [],
        });

        console.log("menuItems: ", menuItems);

        function cleanMenuItems(items: any[]): generatorMenuItem[] {
            return items.map(item => ({
                name: item.name || "",
                price: String(item.price || ""),
                category: item.category || undefined,
                description: item.description || undefined,
            }));
        }
        methods.setValue("menu", cleanMenuItems(menuItems)); //makes sure items match what the menu table expects
    }

    function handleGenerateAll(){
        console.log("clicked");
    }

    function handleReroll(){
        console.log("clicked");
    }

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
            <SiteForm onSubmit={onSubmit} mode={mode} settlementContext={settlementContext} onGenerateName={handleGenerateName} onGenerateMenu={handleGenerateMenu} onGenerateAll={handleGenerateAll} onReroll={handleReroll} />
        </FormProvider>
    )
}