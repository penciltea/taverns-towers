'use client'

import { useRouter } from "next/navigation";
import { NpcFormData } from "@/schemas/npc.schema";
import { createNpc, updateNpc } from "@/lib/actions/npc.actions";
import { useUIStore } from "@/store/uiStore";
import { useQueryClient } from "@tanstack/react-query";


interface UseNpcMutationsProps {
    mode: "add" | "edit" | null;
    npcId?: string; // Required in edit mode
}

export function useNpcMutations({ mode, npcId }: UseNpcMutationsProps) {
    const router = useRouter();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
    const queryClient = useQueryClient();

    async function handleSubmit(data: NpcFormData) {
        setSubmitting(true);
        try {
            let saved;
            if(mode === "add") {
                saved = await createNpc(data)
            } else if(mode === "edit"){
                if (!npcId) throw new Error("NPC ID is required for edit mode");
                saved = await updateNpc(npcId, data);
            } else {
                throw new Error("Invalid mutation mode");
            }

            if (!saved || !saved._id) {
                throw new Error("There was a problem saving the NPC, please try again later!");
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