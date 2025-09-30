'use client'

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
import { useDraftForm } from "@/hooks/useDraftForm";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useEffect } from "react";

interface LoginDialogProps extends DialogProps {
  draftKey?: string;
  draftItem?: Partial<SiteFormData>;
}


export default function NewSitePage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const settlementId = params.id as string;
    const rawTypeParam = searchParams?.get("type");
    const { setOpenDialog, showErrorDialog } = useUIStore();
    const user = useAuthStore((state) => state.user);
    const draftKey = "draftSite";

    // Set default form values only if typeParam is valid
    const loadedDefaultSiteValues = isValidSiteCategory(rawTypeParam)
        ? defaultSiteValues[rawTypeParam as SiteFormData["type"]]
        : undefined;

    let initialDraft: Partial<SiteFormData> | null = null;
    if (typeof window !== "undefined") {
        const raw = sessionStorage.getItem(draftKey);
        if (raw) initialDraft = JSON.parse(raw) as Partial<SiteFormData>;
    }

    const methods = useFormWithSchema(siteSchema, {
        defaultValues: initialDraft || loadedDefaultSiteValues,
    });
    const { mode, draftItem, clearDraftItem, setDraftItem, selectedItem, submittingDraft, setSubmittingDraft } = useSiteContentStore();

    // Populate Zustand store synchronously if empty
    useEffect(() => {
        if (!draftItem && initialDraft) {
          setDraftItem(initialDraft);
        }
    }, [draftItem, initialDraft, setDraftItem]);

    // Use the site ID (if editing) or undefined (if creating new)
    const siteId = selectedItem?._id; 
    useFormMode(siteId, useSiteContentStore);

    const { handleSubmit: onSubmit } = useSiteMutations({
        mode,
        settlementId
    })

    const { generator, isWilderness } = useSiteFormSetup({
        methods,
        settlementId,
        rawSiteType: rawTypeParam,
    });

    const openLoginDialog = (props?: LoginDialogProps) => setOpenDialog("LoginDialog", props);


    const { saveDraftAndPromptLogin } = useDraftForm<SiteFormData>({
        user,
        draftItem: draftItem as Partial<SiteFormData> | null,
        setDraftItem: setDraftItem as (draft: Partial<SiteFormData>) => void,
        clearDraftItem,
        submittingDraft,
        setSubmittingDraft,
        onSubmit,
        draftKey,
    });

    const wrappedOnSubmit = async (data: SiteFormData) => {
        try {
            if (!user) {
                saveDraftAndPromptLogin(data, openLoginDialog);
                return;
            }
            await onSubmit(data);

            // Clean up draft after successful submission
            clearDraftItem();
            sessionStorage.removeItem(draftKey);
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