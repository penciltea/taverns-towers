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

    const siteType = mode === "edit"
    ? selectedItem?.type
    : (searchParams?.get("type") as SiteFormData["type"] | undefined);

    const getShopType = () => {
        if (typeParam === 'shop') return methods.watch("shopType")?.toLowerCase();
        if (typeParam === 'entertainment') return methods.watch("venueType")?.toLowerCase();
        return selectedItem?.shopType?.toLowerCase();
    }

    const generator = {
        name: async () => {
            if (!siteType) return;

            const name = await generateSiteName({
                siteType: [siteType],
                shopType: getShopType(),
                terrain: settlementContext.terrain,
                climate: settlementContext.climate,
                tags: settlementContext.tags,
            });

            methods.setValue("name", name);
        },

        menu: async () => {
            if (!siteType) return;

            const menuItems = await generateMenuItems({
                siteType: [siteType],
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
            if (!siteType) return;

            const generatedValues = await generateSiteValues(siteType, {
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
            if (!siteType) return;

            const generatedValues = await generateSiteValues(siteType, {
                shopType: getShopType(),
                terrain: settlementContext.terrain,
                climate: settlementContext.climate,
                tags: settlementContext.tags,
            });

            Object.entries(generatedValues).forEach(([key, value]) => {
                methods.setValue(key as keyof SiteFormData, value);
            });

            await generator.menu();
        },
    };


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