'use client'

import { useRouter } from "next/navigation";
import { NpcFormData } from "@/schemas/npc.schema";
import { createNpc, updateNpc } from "@/lib/actions/npc.actions";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";
import { handleDynamicFileUpload } from "@/lib/util/uploadToCloudinary";
import { transformNpcFormData } from "@/lib/util/transformFormDataForDB";
import { addConnection } from "@/lib/actions/connections.actions";
import { invalidateConnections } from "@/lib/util/invalidateQuery";
import { useAuthStore } from "@/store/authStore";
import { canCreateContent } from "@/lib/actions/user.actions";
import { generateIdempotencyKey } from "@/lib/util/generateIdempotencyKey";

interface UseNpcMutationsProps {
    mode: "add" | "edit" | null;
    npcId?: string; // Required in edit mode
}

export function useNpcMutations({ mode, npcId }: UseNpcMutationsProps) {
    const router = useRouter();
    const { user } = useAuthStore();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();

    async function handleSubmit(data: NpcFormData) {
        setSubmitting(true);
        try {
            if (!user?.id) throw new Error("User is not logged in");
                  
            if (!(await canCreateContent(user.id, "npc"))) {
                showErrorDialog("You have reached the maximum number of NPCs for your membership tier. Please either upgrade your membership tier or delete an existing NPC to continue.");
                return;
            }

            const idempotencyKey = generateIdempotencyKey();

            // Upload image if needed
            const cleanImage = await handleDynamicFileUpload(data, "image");

            // Transform form data for DB and attach the image & idempotencyKey
            const transformed = {
                ...transformNpcFormData(data),
                image: cleanImage,
                idempotencyKey,
            };

            let saved;
            
            if (mode === "add") {
                saved = await createNpc(transformed);
            } else if (mode === "edit") {
            if (!npcId) throw new Error("NPC ID is required for edit mode");
                saved = await updateNpc(npcId, transformed);
            } else {
                throw new Error("Invalid mutation mode");
            }

            if (!saved || !saved._id) {
                throw new Error("There was a problem saving the NPC, please try again later!");
            }

            if (data.connections?.length) {
                for (const conn of data.connections) {
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

    return {
        handleSubmit
    };
}