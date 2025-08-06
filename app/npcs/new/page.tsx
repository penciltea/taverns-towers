"use client";

import { useRouter } from "next/navigation";
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
import { useEffect } from "react";
import { useNpcMutations } from "@/hooks/npc/useNpcMutations";

export default function NewNpcPage() {
  const router = useRouter();
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useNpcContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem } = useNpcContentStore();
  const { setOpenDialog } = useUIStore();
  const user = useAuthStore((state) => state.user);

  const methods = useNpcForm();

  useEffect(() => {
    if (user && draftItem) {
      (async () => {
        await handleSubmit(draftItem as NpcFormData);
        clearDraftItem();
      })();
    }
  }, [user]);

  const { handleSubmit } = useNpcMutations({
    mode: mode,
    npcId: safeId
  });

  const wrappedOnSubmit = async (data: NpcFormData) => {
    try {
      if (!user) {
        setDraftItem(data);
        setOpenDialog("LoginDialog", {});
        return;
      }
      await handleSubmit(data);
    } catch (err) {
      
      console.error("Error during NPC submission:", err);
      // Optionally report to Sentry or external logging service
    }
  };

  return (
    <FormProvider {...methods}>
      <NpcForm
        onSubmit={wrappedOnSubmit}
        onGenerate={console.log}
        onReroll={console.log}
        mode={mode}
      />
    </FormProvider>
  );
}