'use client'

import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { isUserVerified } from "@/lib/util/isUserVerified";
import { AppError } from "@/lib/errors/app-error";
import { handleActionResult } from "../queryHook.util";

export function useSaveCampaign({ mode, campaignId}: {mode: "add" | "edit", campaignId?: string}) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();


    async function handleSubmit(data: CampaignFormData) {
        setSubmitting(true);
        console.log("data: ", data);
        try {
            if (!user?.id) throw new AppError("User is not logged in", 400);

            if(!isUserVerified(user)){
                showErrorDialog("Your email address hasn't been verified yet. Magic can't preserve your work until it's confirmed.");
                return;
            }

            const idempotencyKey = generateIdempotencyKey();

            const { transformCampaignFormData } = await import('@/lib/actions/campaign.actions')
            const transformedResult = handleActionResult(await transformCampaignFormData(data));

            const transformed = {
                ...transformedResult,
                idempotencyKey,
            };

            let saved;            
            
            if (mode === "add") {
                const { createCampaign } = await import('@/lib/actions/campaign.actions');
                const result = await createCampaign(transformed);
                saved = handleActionResult(result);
            } else if (mode === "edit") {
                if (!campaignId) throw new AppError("NPC ID is required for edit mode", 400);
                const { updateCampaign } = await import('@/lib/actions/campaign.actions');
                const result = await updateCampaign(campaignId, transformed);
                saved = handleActionResult(result);
            } else {
                throw new AppError("Invalid mutation mode", 400);
            }

            if (!saved || !saved._id) {
                throw new AppError("There was a problem saving the campaign, please try again later!");
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
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    }

    return { handleSubmit }
}