'use client'

import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { isUserVerified } from "@/lib/util/isUserVerified";

export function useSaveCampaign(mode: "add" | "edit", campaignId?: string) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();


    async function handleSubmit(data: CampaignFormData) {
        setSubmitting(true);
        try {
            if (!user?.id) throw new Error("User is not logged in");

            if(!isUserVerified(user)){
                showErrorDialog("Your email address hasn't been verified yet. Magic can't preserve your work until it's confirmed.");
                return;
            }
            

            const idempotencyKey = generateIdempotencyKey();

            const { transformCampaignFormData } = await import('@/lib/actions/campaign.actions')
            const transformedData = await transformCampaignFormData(data);

            const transformed = {
                ...transformedData,
                idempotencyKey,
            };

            let saved;
            
            if (mode === "add") {
                const { createCampaign } = await import('@/lib/actions/campaign.actions');
                saved = await createCampaign(transformed);
            } else if (mode === "edit") {
            if (!campaignId) throw new Error("NPC ID is required for edit mode");
                const { updateCampaign } = await import('@/lib/actions/campaign.actions');
                saved = await updateCampaign(campaignId, transformed);
            } else {
                throw new Error("Invalid mutation mode");
            }

            if (!saved || !saved._id) {
                throw new Error("There was a problem saving the campaign, please try again later!");
            }

            showSnackbar(
                mode === "edit" ? "Campaign updated successfully!" : "Campaign created successfully!",
                "success"
            );
            
            const savedPlayerIds = saved.players
            .filter((p) => !p.placeholder)
            .map((p) => p.user)
            .filter(Boolean); // remove empty strings

            // Also include the campaign owner
            const affectedUserIds = [saved.userId, ...savedPlayerIds];

            // Invalidate assigned campaigns for each affected user
            affectedUserIds.forEach((uid) => {
                queryClient.invalidateQueries({ queryKey: ['assignedCampaigns', uid] });
            });

            // Invalidate the campaign itself and owned campaigns for the editor
            queryClient.invalidateQueries({ queryKey: ['campaign', saved._id] });
            queryClient.invalidateQueries({ queryKey: ['ownedCampaigns'], exact: false });

            router.push(`/campaigns/${saved._id}`);

        } catch (error) {
            let message = "Something went wrong saving the campaign. Please try again later.";

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === "string") {
                message = error;
            }

            showErrorDialog(message);
            console.error("campaign mutation error:", error);
        } finally {
            setSubmitting(false);
        }
    }

    return { handleSubmit }
}