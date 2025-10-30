'use client'

import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { transformCampaignFormData } from "@/lib/util/transformFormDataForDB";
import { CampaignFormData } from "@/schemas/campaign.schema";

export function useSaveCampaign(mode: "add" | "edit", campaignId?: string) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();


    async function handleSubmit(data: CampaignFormData) {
        setSubmitting(true);
        try {
            if (!user?.id) throw new Error("User is not logged in");

            const idempotencyKey = generateIdempotencyKey();

            console.log("data: ", data);
            // Transform form data for DB and attach the idempotencyKey
            const transformed = {
                ...transformCampaignFormData(data),
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
            queryClient.invalidateQueries({ queryKey: ["ownedCampaigns"] });
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