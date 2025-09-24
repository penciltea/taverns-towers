'use client'

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { siteSchema, defaultSiteValues, SiteFormData } from "@/schemas/site.schema";
import { useUIStore } from "@/store/uiStore";
import { useSiteContentStore } from "@/store/siteStore";
import SiteForm from "@/components/Site/Form/SiteForm";
import { isValidSiteCategory } from "@/lib/util/siteHelpers";
import { useSiteFormSetup } from "@/hooks/site/useSiteFormSetup";
import { useSiteMutations } from "@/hooks/site/useSiteMutations";
import { useAuthStore } from "@/store/authStore";
import { useFormMode } from "@/hooks/useFormMode";


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
    const { mode, draftItem, clearDraftItem, setDraftItem, selectedItem } = useSiteContentStore();

    // Use the site ID (if editing) or undefined (if creating new)
    const siteId = selectedItem?._id; 
    useFormMode(siteId, useSiteContentStore);

    const { setOpenDialog, showErrorDialog } = useUIStore();
    
    const user = useAuthStore((state) => state.user);

    const { handleSubmit } = useSiteMutations({
        mode,
        settlementId
    })

    const { generator, isWilderness } = useSiteFormSetup({
        methods,
        settlementId,
        rawSiteType: rawTypeParam,
    });

    useEffect(() => {
        if (user && draftItem) {
          (async () => {
            await handleSubmit(draftItem as SiteFormData);
            clearDraftItem();
          })();
        }
      }, [user, draftItem, handleSubmit, clearDraftItem]);

    const wrappedOnSubmit = async (data: SiteFormData) => {
        try {
            if (!user) {
                setDraftItem(data);
                setOpenDialog("LoginDialog", {});
            return;
            }
            await handleSubmit(data);
        } catch (err) {
            showErrorDialog(`Sorry, there was a problem: ${err}`);
            console.error("Error during site submission:", err);
        }
    };

    return (
        <FormProvider {...methods}>
            <SiteForm
                onSubmit={wrappedOnSubmit}
                mode={mode}
                generator={generator}
                isWilderness={isWilderness}
            />
        </FormProvider>
    );
}