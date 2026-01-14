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
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";
import { useNpcGeneratorActions } from "@/hooks/npc/useNpcGeneratorActions";
import Paper from "@mui/material/Paper";
import { useDraftForm } from "@/hooks/useDraftForm";
import { AuthDialogInput } from "@/interfaces/dialogProps.interface";
import { useEffect } from "react";

export default function NewNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);
  const router = useRouter();

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

  const openLoginDialog = (props?: AuthDialogInput<Partial<NpcFormData>>) =>
    setOpenDialog("LoginDialog", { ...props, openRegisterDialog });

  const openRegisterDialog = (props?: AuthDialogInput<Partial<NpcFormData>>) =>
    setOpenDialog("RegisterDialog", {
      ...props,
      onRegisterSuccess: () => {
        openLoginDialog({
          draftKey,
          draftItem: draftItem || initialDraft || undefined,
          onLoginSuccess: () => {
            clearDraftItem();
            sessionStorage.removeItem(draftKey);
          },
        });
      },
    });

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
      const savedId = await onSubmit(data);

      if (savedId) {
        clearDraftItem();
        sessionStorage.removeItem(draftKey);

        // ✅ Page-level redirect (mobile-safe)
        router.replace(`/npcs/${savedId}`);
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
