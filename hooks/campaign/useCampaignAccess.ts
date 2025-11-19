import { useAuthStore } from "@/store/authStore";
import { useAssignedCampaignsQuery } from "./campaign.query";
import { CampaignForClient, PlayerForClient } from "@/interfaces/campaign.interface";
import { getCampaignPermissions } from "@/lib/actions/campaign.actions";
import { handleActionResult } from "../queryHook.util";
import { useCallback } from "react";

export function useCampaignAccess(){
    const user = useAuthStore(state => state.user);
    
    const { data: assignedCampaigns } = useAssignedCampaignsQuery(user?.id, {
        isEnabled: !!user,
    });

    const isLoggedIn = (user ? true : false);

    const isPremium = (isLoggedIn && (user?.tier === "Artisan" || user?.tier === "Architect") ? true : false );
    const hasAssignedCampaigns = (assignedCampaigns && assignedCampaigns?.length > 0) ?? false;

    function isPlayerInCampaign(campaign: CampaignForClient): boolean{
        if (!campaign || !campaign.players || (user !== null && !user.id) ) return false;
    
        return campaign.players.some((player: PlayerForClient) => {
            const playerId = player.user.id?.toString();
            return playerId === user?.id.toString();
        })
    }

    const playerHasContentPermissions = useCallback(async (campaignId: string) => {
        if (!user || !campaignId) return false;

        const result = await getCampaignPermissions(campaignId);
        const perms = handleActionResult(result);
        if (!perms) return false;

        return perms.canCreateContent || perms.canEditOwnContent || perms.canEditAllContent;
    }, [ user ]);

    return {
        isLoggedIn,
        isPremium,
        assignedCampaigns,
        hasAssignedCampaigns,
        canAccessCampaigns: isPremium || hasAssignedCampaigns,
        isPlayerInCampaign,
        playerHasContentPermissions
    };
}