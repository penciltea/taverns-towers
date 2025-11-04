import { useAuthStore } from "@/store/authStore";
import { useAssignedCampaignsQuery } from "./campaign.query";

export function useCampaignAccess(){
    const user = useAuthStore(state => state.user);
    
    const { data: assignedCampaigns } = useAssignedCampaignsQuery(user?.id, {
        isEnabled: !!user,
    });

    const isLoggedIn = (user ? true : false);

    const isPremium = (isLoggedIn && (user?.tier === "Artisan" || user?.tier === "Architect") ? true : false );
    const hasAssignedCampaigns = (assignedCampaigns && assignedCampaigns?.length > 0) ?? false;

    return {
        user,
        isLoggedIn,
        isPremium,
        assignedCampaigns,
        hasAssignedCampaigns,
        canAccessCampaigns: isPremium || hasAssignedCampaigns,
    };
}