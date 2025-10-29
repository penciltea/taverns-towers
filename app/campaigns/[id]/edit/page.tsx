"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import AuthGate from "@/components/Auth/AuthGuard";
import { useSaveCampaign } from "@/hooks/campaign/useSaveCampaign";
import { getSingleParam } from "@/lib/util/getSingleParam";
import { CampaignFormData, campaignSchema, defaultCampaignValues } from "@/schemas/campaign.schema";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useGetCampaignById } from "@/hooks/campaign/campaign.query";
import { useCampaignStore } from "@/store/campaignStore";
import { useUIStore } from "@/store/uiStore";


const LazyCampaignForm = dynamic(
    () => import("@/components/Campaign/Form/CampaignForm"),
    { ssr: false, loading: () => <p>Loading form...</p> }
);

export default function EditCampaignsPage(){
    const mode = "edit";
    const { id } = useParams();
    const safeId = getSingleParam(id);

    
    const { handleSubmit: onSubmit } = useSaveCampaign("edit", safeId);
    const { data: campaign, isLoading, isError } = useGetCampaignById(safeId ?? '');
    
    const methods = useFormWithSchema(campaignSchema, {
        defaultValues: defaultCampaignValues,
    });

    const { setSelectedCampaign, clearSelectedCampaign } = useCampaignStore();
    const { showErrorDialog } = useUIStore();    
    

    useEffect(() => {
        if (isLoading) return;
        
        if (campaign) {
          setSelectedCampaign(campaign); // update the store
          methods.reset(campaign);   // reset the form with the loaded data
        } else if(safeId && !isLoading){
          // If no campaign, clear selection
          clearSelectedCampaign();
          showErrorDialog("Campaign could not be found, please try again later!");
        }
      }, [campaign, safeId, isLoading, setSelectedCampaign, clearSelectedCampaign, methods, showErrorDialog]);
    

    const wrappedOnSubmit = async (data: CampaignFormData) => {
        await onSubmit(data);
    };


    return(
        <AuthGate fallbackText="Please log in to create a new campaign.">
            <FormProvider {...methods}>
                <LazyCampaignForm onSubmit={wrappedOnSubmit} mode={mode} />
            </FormProvider>
        </AuthGate>
    )
}