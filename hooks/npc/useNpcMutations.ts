'use client'

import { useRouter } from "next/navigation";
import { NpcFormData } from "@/schemas/npc.schema";
import { createNpc, updateNpc } from "@/lib/actions/npc.actions";
import { useUIStore } from "@/store/uiStore";


interface UseNpcMutationsProps {
    mode: "add" | "edit" | null;
    npcId?: string; // Required in edit mode
    onSuccess?: () => void; // Optional callback after success
}

export function useNpcMutations({ mode, npcId, onSuccess }: UseNpcMutationsProps) {
    const router = useRouter();
    const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();

    async function handleSubmit(data: NpcFormData) {
        setSubmitting(true);
        try {
            const payload = { ...data };

            if (mode === "add") {
                await createNpc(payload);
            } else if (mode === "edit") {
                if (!npcId) throw new Error("NPC ID is required for edit mode");
                await updateNpc(npcId, payload);
            }

            showSnackbar(
                mode === "edit" ? "NPC updated successfully!" : "NPC created successfully!",
                "success"
            );

            router.refresh();
            onSuccess?.();
        } catch (error) {
            showErrorDialog("Something went wrong saving the NPC. Please try again later.");
            console.error("NPC mutation error:", error);
        } finally {
            setSubmitting(false);
        }
    }

    return {
        handleSubmit
    };
}