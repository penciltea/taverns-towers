'use client'

import { useRouter } from "next/navigation";
import { NpcFormData } from "@/schemas/npc.schema";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformNpcFormData } from "@/lib/util/transformFormDataForDB";
import { invalidateConnections } from "@/lib/util/invalidateQuery";
import { useAuthStore } from "@/store/authStore";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";
import { Npc } from "@/interfaces/npc.interface";
import { useCampaignStore } from "@/store/campaignStore";
import { isUserVerified } from "@/lib/util/isUserVerified";
import { AppError } from "@/lib/errors/app-error";
import { handleActionResult } from "../queryHook.util";

interface UseNpcMutationsProps {
    mode: "add" | "edit" | null;
    npcId?: string; // Required in edit mode
}

interface PartialNpcUpdate {
    _id: string;
    [key: string]: unknown;
}


export function useNpcMutations({ mode, npcId }: UseNpcMutationsProps) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();
    const { selectedCampaign } = useCampaignStore();
        
    async function handleSubmit(data: NpcFormData) {
        setSubmitting(true);
        try {
            if (!user?.id) throw new Error("User is not logged in");

            if(!isUserVerified(user)){
                showErrorDialog("Your email address hasn't been verified yet. Magic can't preserve your work until it's confirmed.");
                return;
            }

            const idempotencyKey = generateIdempotencyKey();

            // Upload image if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");

            // Transform form data for DB and attach the image & idempotencyKey
            const transformed = {
                ...transformNpcFormData(data),
                userId: user.id,
                campaignId: selectedCampaign && selectedCampaign._id !== null ? selectedCampaign._id : undefined,
                image: cleanImage,
                idempotencyKey,
            };

            let saved;
            
            if (mode === "add") {
                const { canCreateContent } = await import('@/lib/actions/user.actions');
                if (!(await canCreateContent(user.id, "npc"))) {
                    showErrorDialog("You have reached the maximum number of NPCs for your membership tier. Please either upgrade your membership tier or delete an existing NPC to continue.");
                    return;
                }

                const { createNpc } = await import('@/lib/actions/npc.actions');
                const result = await createNpc(transformed);
                saved = handleActionResult(result);
            } else if (mode === "edit") {
                if (!npcId) throw new Error("NPC ID is required for edit mode");
                const { updateNpc } = await import('@/lib/actions/npc.actions');
                const result = await updateNpc(npcId, transformed, selectedCampaign?._id ?? undefined);
                saved = handleActionResult(result);
            } else {
                throw new Error("Invalid mutation mode");
            }

            if (!saved || !saved._id) {
                throw new Error("There was a problem saving the NPC, please try again later!");
            }

            if (data.connections?.length) {
                for (const conn of data.connections) {
                    const { addConnection } = await import('@/lib/actions/connections.actions');
                    await addConnection({
                        sourceType: "npc",
                        sourceId: saved._id,
                        targetType: conn.type,
                        targetId: conn.id,
                        role: conn.role,
                    });

                    queryClient.setQueryData([conn.type, conn.id], (old: any) => {
                        if (!old) return old;
                        return {
                            ...old,
                            connections: [
                            ...old.connections,
                            { type: conn.type, refId: saved._id, role: conn.role },
                            ],
                        };
                    });
                }
                
                invalidateConnections(queryClient, data.connections);
            }

            showSnackbar(
                mode === "edit" ? "NPC updated successfully!" : "NPC created successfully!",
                "success"
            );
            queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
            if(selectedCampaign){
                queryClient.invalidateQueries({ queryKey: ["campaignNpcs", selectedCampaign._id]});
            }

            router.push(`/npcs/${saved._id}`);

        } catch (error) {
            let message = "Something went wrong saving the NPC. Please try again later.";

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === "string") {
                message = error;
            }

            showErrorDialog(message);
            console.error("NPC mutation error:", error);
        } finally {
            setSubmitting(false);
        }
    }

    /**
     * Lightweight partial update — e.g. toggling "favorite"
     */
    async function handlePartialUpdate<T extends PartialNpcUpdate>(update: T) {
        if (!user?.id) throw new Error("User is not logged in");

        const { updateNpcPartial } = await import("@/lib/actions/npc.actions");
        const idempotencyKey = generateIdempotencyKey();
        const payload = { ...update, idempotencyKey };

        queryClient.setQueriesData({ queryKey: ["ownedNpcs"] }, (old: any) => {
            if (!old?.npcs) return old;
            return {
                ...old,
                npcs: old.npcs.map((n: Npc) =>
                    n._id === update._id ? { ...n, ...update } : n
                ),
            };
        });

        try {
            const result = await updateNpcPartial(update._id, payload);
            const updatedNpc = handleActionResult(result);

            queryClient.setQueriesData({ queryKey: ["ownedNpcs"] }, (old: any) => {
                if (!old?.npcs) return old;
                return {
                    ...old,
                    npcs: old.npcs.map((n: Npc) =>
                        n._id === updatedNpc._id ? updatedNpc : n
                    ),
                };
            });

            showSnackbar("NPC updated successfully!", "success");
        } catch (error) {
            queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
            console.error("Failed to update NPC:", error);
            showErrorDialog("Failed to update NPC. Please try again.");
            throw error;
        }
    }

    return {
        handleSubmit,
        handlePartialUpdate
    };
}