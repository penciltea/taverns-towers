import { useCallback } from "react";
import { useCampaignStore } from "@/store/campaignStore";
import { Campaign } from "@/interfaces/campaign.interface";
import { useUIStore } from "@/store/uiStore";

export function useSetActiveCampaign() {
    const { showSnackbar } = useUIStore();

    const {
        selectedCampaign,
        setSelectedCampaign,
        reset,
    } = useCampaignStore();

    const setActiveCampaign = useCallback(
        (campaign: Campaign) => {
            setSelectedCampaign(campaign);
            showSnackbar(`Active campaign set to '${campaign.name}'!`, "success");
        },
        [setSelectedCampaign]
    );

    const clearActiveCampaign = useCallback(() => {
        reset();
        showSnackbar("Active campaign has been cleared!", "success");
    }, [reset]);

    return {
        activeCampaign: selectedCampaign,
        setActiveCampaign,
        clearActiveCampaign,
    };
}