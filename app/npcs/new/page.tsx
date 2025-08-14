"use client";

import { useParams, useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useNpcContentStore } from "@/store/npc.store";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { NpcFormData } from "@/schemas/npc.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import NpcForm from "@/components/Npc/Form/NpcForm";
import { useNpcForm } from "@/hooks/npc/useNpcForm";
import { useFormMode } from "@/hooks/useFormMode";
import { useEffect } from "react";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { useNpcGeneratorActions } from "@/hooks/npc/useNpcGeneratorActions";
import { Paper } from "@mui/material";

export default function NewNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const router = useRouter();

  useFormMode(safeId, useNpcContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem } = useNpcContentStore();
  const { setOpenDialog, showErrorDialog } = useUIStore();
  const user = useAuthStore((state) => state.user);

  const methods = useNpcForm();

  const { handleSubmit } = useNpcMutations({
    mode,
    npcId: safeId,
  });

  const { name: generateName, missing: generateMissing, reroll: rerollAll } = useNpcGeneratorActions(methods);

  const generator = {
    name: generateName,
    missing: generateMissing,
    reroll: rerollAll,
  };

  useEffect(() => {
    if (user && draftItem) {
      (async () => {
        await handleSubmit(draftItem as NpcFormData);
        clearDraftItem();
      })();
    }
  }, [user, draftItem, handleSubmit, clearDraftItem]);

  const wrappedOnSubmit = async (data: NpcFormData) => {
    try {
      if (!user) {
        setDraftItem(data);
        setOpenDialog("LoginDialog", {});
        return;
      }
      const savedNpc = await handleSubmit(data);
      if (savedNpc) {
        router.push(`/npcs/${savedNpc._id}`);
      }
    } catch (err) {
      showErrorDialog(`Sorry, there was a problem: ${err}`);
      console.error("Error during NPC submission:", err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2, maxWidth: 1400, mx: 'auto' }}>
        <NpcForm
          onSubmit={wrappedOnSubmit}
          generator={generator}
          mode={mode}
        />
      </Paper>
    </FormProvider>
  );
}
