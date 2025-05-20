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
import { generatorMenuItem, SiteType } from "@/interfaces/site.interface";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { generateMenuItems } from "@/lib/actions/siteGenerator.actions";


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

      async function handleGenerateName() {
              const { setValue } = methods;
      
              if (!typeParam) return;
                  const name = await generateSiteName({
                  siteType: typeParam,
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