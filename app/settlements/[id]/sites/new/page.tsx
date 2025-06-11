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
import { usePaginatedSites } from "@/hooks/site.query";
import { SiteType } from "@/interfaces/site.interface";
import { createSite } from "@/lib/actions/site.actions";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";
import { useSiteFormSetup } from "@/hooks/useSiteFormSetup";

export default function NewSitePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const rawTypeParam = searchParams?.get("type");

    // Set default form values only if typeParam is valid
    const defaultValues = isValidSiteCategory(rawTypeParam)
        ? defaultSiteValues[rawTypeParam as SiteFormData["type"]]
        : undefined;

    const methods = useFormWithSchema(siteSchema, {
        defaultValues,
    });

    const router = useRouter();
    const { showSnackbar, showErrorDialog } = useUIStore();
    const { mode } = useSiteContentStore();
    const { refetch } = usePaginatedSites(settlementId, 1, 12, "", []);

    const { generator, isWilderness } = useSiteFormSetup({
        methods,
        settlementId,
        rawSiteType: rawTypeParam,
    });

    // Submission handler
    const onSubmit = async (data: SiteFormData) => {
        try {
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
        router.push(`/settlements/${settlementId}`);

        } catch (err) {
        console.error(err);
        showErrorDialog("Something went wrong, please try again later!");
        }
    };

    return (
        <FormProvider {...methods}>
        <SiteForm
            onSubmit={onSubmit}
            mode={mode}
            generator={generator}
            isWilderness={isWilderness}
        />
        </FormProvider>
    );
}