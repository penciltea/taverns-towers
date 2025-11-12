import { Campaign } from "@/interfaces/campaign.interface";

export async function getAvailableOptions<T>({
    freeOptions,
    premiumOptions,
    userTier,
    selectedCampaign,
    playerHasContentPermissions,
}: {
    freeOptions: T[];
    premiumOptions: T[];
    userTier: string | undefined;
    selectedCampaign?: Campaign | null;
    playerHasContentPermissions: (campaignId: string) => Promise<boolean>;
}): Promise<T[]> {

    // 1. Check if a selected campaign exists
    if (selectedCampaign) {
        const hasPermissions = await playerHasContentPermissions(selectedCampaign._id);
        if (hasPermissions) return premiumOptions;
    }

    // 2. Fallback to tier
    if (userTier === "Artisan" || userTier === "Architect") return premiumOptions;

    // 3. Default to free options
    return freeOptions;
}
