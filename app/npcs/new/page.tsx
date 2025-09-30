"use client";

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useNpcContentStore } from "@/store/npc.store";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { NpcFormData } from "@/schemas/npc.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import NpcForm from "@/components/Npc/Form/NpcForm";
import { useNpcForm } from "@/hooks/npc/useNpcForm";
import { useFormMode } from "@/hooks/useFormMode";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { useNpcGeneratorActions } from "@/hooks/npc/useNpcGeneratorActions";
import { Paper } from "@mui/material";
import { useDraftForm } from "@/hooks/useDraftForm";
import { DialogProps } from "@/interfaces/dialogProps.interface";
import { useEffect } from "react";

interface LoginDialogProps extends DialogProps {
  draftKey?: string;
  draftItem?: Partial<NpcFormData>;
}


export default function NewNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useNpcContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem, submittingDraft, setSubmittingDraft } = useNpcContentStore();
  const draftKey = "draftNpc";
  const { setOpenDialog, showErrorDialog } = useUIStore();
  const user = useAuthStore((state) => state.user);

  let initialDraft: Partial<NpcFormData> | null = null;
  if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem(draftKey);
      if (raw) initialDraft = JSON.parse(raw) as Partial<NpcFormData>;
  }

  const methods = useNpcForm(draftItem || initialDraft || undefined);

  // Populate Zustand store synchronously if empty
  useEffect(() => {
    if (!draftItem && initialDraft) {
      setDraftItem(initialDraft);
    }
  }, [draftItem, initialDraft, setDraftItem]);

  const { handleSubmit: onSubmit } = useNpcMutations({
    mode,
    npcId: safeId,
  });

  const { name: generateName, missing: generateMissing, reroll: rerollAll } = useNpcGeneratorActions(methods);

  const openLoginDialog = (props?: LoginDialogProps) => setOpenDialog("LoginDialog", props);

  const generator = {
    name: generateName,
    missing: generateMissing,
    reroll: rerollAll,
  };

  const { saveDraftAndPromptLogin } = useDraftForm<NpcFormData>({
      user,
      draftItem,
      setDraftItem,
      clearDraftItem,
      submittingDraft,
      setSubmittingDraft,
      onSubmit,
      draftKey,
    });


  const wrappedOnSubmit = async (data: NpcFormData) => {
    try {
      if (!user) {
       saveDraftAndPromptLogin(data, openLoginDialog);
        return;
      }
      await onSubmit(data);

      // Clean up draft after successful submission
      clearDraftItem();
      sessionStorage.removeItem(draftKey);
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
