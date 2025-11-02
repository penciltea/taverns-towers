"use client";

import dynamic from "next/dynamic";
import AuthGate from "@/components/Auth/AuthGuard";
import { useSaveCampaign } from "@/hooks/campaign/useSaveCampaign";
import { CampaignFormData, campaignSchema } from "@/schemas/campaign.schema";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";

const LazyCampaignForm = dynamic(
    () => import("@/components/Campaign/Form/CampaignForm"),
    { ssr: false, loading: () => <p>Loading form...</p> }
);

export default function NewCampaignsPage(){
    const mode = "add";

    const { handleSubmit: onSubmit } = useSaveCampaign("add");

    const wrappedOnSubmit = async (data: CampaignFormData) => {
        console.log("form submit: ", data);
        await onSubmit(data);
    };

    const methods = useFormWithSchema(campaignSchema);

    return(
        <AuthGate fallbackText="Please log in to create a new campaign." allowedTiers={["Artisan", "Architect"]}>
            { }
            <FormProvider {...methods}>
                <LazyCampaignForm onSubmit={wrappedOnSubmit} mode={mode} />
            </FormProvider>
        </AuthGate>
    )
}