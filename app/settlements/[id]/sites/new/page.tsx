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
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { generateMenuItems } from "@/lib/actions/siteGenerator.actions";
import { generateSiteValues } from "@/lib/modules/sites/siteRules";

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

    const getShopType = () => {
        if (typeParam === 'shop') return methods.watch("shopType")?.toLowerCase();
        if (typeParam === 'entertainment') return methods.watch("venueType")?.toLowerCase();
        return selectedItem?.shopType?.toLowerCase();
    }

    const generator = {
        name: async () => {
            const name = await generateSiteName({
                siteType: [typeParam],
                shopType: getShopType(),
                terrain: settlementContext.terrain,
                climate: settlementContext.climate,
                tags: settlementContext.tags,
            });

            methods.setValue("name", name);
        },
        menu: async () => {
            const menuItems = await generateMenuItems({
                siteType: [typeParam],
                shopType: getShopType(),
                settlementTerrain: settlementContext.terrain,
                settlementClimate: settlementContext.climate,
                settlementTags: settlementContext.tags,
            });

            const cleanedItems = menuItems.map((item) => ({
                name: item.name || "",
                price: String(item.price || ""),
                category: item.category || undefined,
                description: item.description || undefined,
            }));

            methods.setValue("menu", cleanedItems);
        },
        all: async () => {
            const generatedValues = await generateSiteValues(typeParam.toString(), {
                shopType: getShopType(),
                terrain: settlementContext.terrain,
                climate: settlementContext.climate,
                tags: settlementContext.tags,
                name: methods.getValues("name"),
                size: methods.getValues("size"),
                condition: methods.getValues("condition"),
            });

            Object.entries(generatedValues).forEach(([key, value]) => {
                methods.setValue(key as keyof SiteFormData, value);
            });

            await generator.menu();
        },
        reroll: async () => {
            const generatedValues = await generateSiteValues(typeParam.toString(), {
                shopType: getShopType(),
                terrain: settlementContext.terrain,
                climate: settlementContext.climate,
                tags: settlementContext.tags
            });

            Object.entries(generatedValues).forEach(([key, value]) => {
                methods.setValue(key as keyof SiteFormData, value);
            });

            await generator.menu();
        },
    };

    const onSubmit = async (data: SiteFormData) => {
        try {
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
    };
    
    return (
        <FormProvider {...methods}>
            <SiteForm onSubmit={onSubmit} mode={mode} generator={generator} />
        </FormProvider>
    )
}