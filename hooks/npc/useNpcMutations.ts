'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Types } from "mongoose";
import { NpcFormData } from "@/schemas/npc.schema";
import { createNpc, updateNpc } from "@/lib/actions/npc.actions";


interface UseNpcMutationsProps {
    mode: "add" | "edit" | null;
    npcId?: string; // Required in edit mode
    onSuccess?: () => void; // Optional callback after success
}

export function useNpcMutations({ mode, npcId, onSuccess }: UseNpcMutationsProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(data: NpcFormData) {
        setIsLoading(true);
        try {
            const payload = { ...data };

            if (mode === "add") {
            await createNpc(payload);
            } else if (mode === "edit") {
            if (!npcId) throw new Error("NPC ID is required for edit mode");
            await updateNpc(npcId, payload);
            }

            router.refresh();
            onSuccess?.();
        } catch (error) {
            console.error("NPC mutation error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleSubmit,
        isLoading,
    };
}