/**
 * Hook: useNpcForm
 *
 * Initializes the NPC form using RHF and Zod
 * Determines if form is in "edit" mode and populates values in fields
 * @param initialData Optional NPC data to edit (pre-filled into form).
 */

'use client';

import { useEffect } from "react";
import { useFormWithSchema } from "@/hooks/useFormWithSchema";
import { npcSchema, defaultNpcValues } from "@/schemas/npc.schema";
import { useNpcContentStore } from "@/store/npc.store";

export function useNpcForm() {
  const { mode, draftItem } = useNpcContentStore();

  const methods = useFormWithSchema(npcSchema, {
    defaultValues: defaultNpcValues,
  });


  useEffect(() => {
  if (mode === "edit" && draftItem) {
    methods.reset({
      ...draftItem,
      connections: draftItem.connections || []
    });
  }
}, [mode, draftItem, methods.reset]);

  return methods;
}