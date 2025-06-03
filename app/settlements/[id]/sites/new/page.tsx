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
import { useEffect, useMemo, useState } from "react";
import { generateWildernessContext } from "@/lib/modules/settlements/rules/settlement.rules";
import { createSite } from "@/lib/actions/site.actions";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";

export default function NewSitePage(){
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const rawTypeParam = searchParams?.get("type");
    const typeParam = rawTypeParam && isValidSiteCategory(rawTypeParam) ? rawTypeParam : undefined;

    const typeIsValid = typeParam && isValidSiteCategory(typeParam);
    const defaultValues = typeIsValid ? defaultSiteValues[typeParam] : undefined;
    const methods = useFormWithSchema(siteSchema, {
        defaultValues,
    });

    const router = useRouter();

    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode } = useSiteContentStore();
    const { refetch } = usePaginatedSites(settlementId, 1, 12, [], "");

    const isWilderness = settlementId === "wilderness";

    const [wildernessContext, setWildernessContext] = useState<{
        terrain: string[];
        climate: string;
        tags: string[];
    } | null>(null);

    const settlementLoader = !isWilderness ? useSettlementLoader(settlementId) : null;
    const settlement = settlementLoader?.settlement;

    // Load wilderness context only if needed
    useEffect(() => {
        if (isWilderness) {
        generateWildernessContext()
            .then(setWildernessContext)
            .catch((err) => {
            console.error("Failed to generate wilderness context", err);
            showErrorDialog("Failed to load wilderness environment.");
            });
        }
    }, [isWilderness, showErrorDialog]);

    // Update the settlement context store once data is available
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

    const generator = useSiteGenerator(methods, {
        siteType: typeParam,
        terrain: isWilderness ? wildernessContext?.terrain ?? [] : settlement?.terrain ?? [],
        climate: isWilderness ? wildernessContext?.climate ?? "" : settlement?.climate ?? "",
        tags: isWilderness ? wildernessContext?.tags ?? [] : settlement?.tags ?? [],
    });

    if (isWilderness && !wildernessContext) {
        return <div className="p-4 text-center text-gray-500">Loading wilderness environment...</div>;
    }

    const onSubmit = async (data: SiteFormData) => {
        try {
        console.log("Creating site with settlementId:", settlementId);

        const cleanImage = await handleDynamicFileUpload(data, "image");

        const siteData = {
            ...transformSiteFormData(data),
            image: cleanImage,
        } as SiteType;

        await createSite(siteData, settlementId);
        if (!isWilderness) {
            await refetch();
        }

        showSnackbar("Site created successfully!", "success");
        // router.push(`/settlements/${settlementId}`);
        } catch (err) {
        console.error(err);
        showErrorDialog("Something went wrong, please try again later!");
        }
    };

    return (   
        <>
            {!typeIsValid ? (
                <div className="p-4 text-center text-gray-500">
                    Invalid site type.
                </div>
            ) : (
                <FormProvider {...methods}>
                    <SiteForm
                        onSubmit={onSubmit}
                        mode={mode}
                        generator={generator}
                        isWilderness={isWilderness}
                    />
                </FormProvider>
            )}
        </>
    );
}