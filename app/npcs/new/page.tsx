"use client";

import { useParams } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { useNpcContentStore } from "@/store/npc.store";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore } from "@/store/authStore";
import { npcSchema, defaultNpcValues, NpcFormData } from "@/schemas/npc.schema";
import { getSingleParam } from "@/lib/util/getSingleParam";
import NpcForm from "@/components/Npc/Form/NpcForm";
import { useNpcFormSetup } from "@/hooks/npc/useNpcFormSetup";
import { useFormMode } from "@/hooks/useFormMode";
import { useEffect } from "react";

export default function NewNpcPage() {
  const { id } = useParams();
  const safeId = getSingleParam(id);

  useFormMode(safeId, useNpcContentStore);
  const { mode, draftItem, clearDraftItem, setDraftItem } = useNpcContentStore();
  const { setOpenDialog } = useUIStore();
  const user = useAuthStore(state => state.user);

  const methods = useFormWithSchema(npcSchema, {
    defaultValues: defaultNpcValues,
  });

  const { onGenerate, onReroll, onSubmit } = useNpcFormSetup(methods, safeId ?? null, mode ?? "add");

   useEffect(() => {
    if (user && draftItem) {
      (async () => {
        await onSubmit(draftItem as NpcFormData);
        clearDraftItem();
      })();
    }
  }, [user]); // Only runs when user logs in

  const wrappedOnSubmit = async (data: NpcFormData) => {
    // if (!user) {
    //   setDraftItem(data);
    //   setOpenDialog("LoginDialog", {});
    //   return;
    // }

    await onSubmit(data);
  };


  return (
    <FormProvider {...methods}>
      <NpcForm onSubmit={wrappedOnSubmit} mode={mode} onGenerate={onGenerate} onReroll={onReroll} />
    </FormProvider>
  );
}
