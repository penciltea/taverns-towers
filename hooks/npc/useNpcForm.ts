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
import { npcSchema, defaultNpcValues, NpcFormData } from "@/schemas/npc.schema";
import { useNpcContentStore } from "@/store/npc.store";

export function useNpcForm(initialData?: Partial<NpcFormData>) {
  const { mode, draftItem } = useNpcContentStore();

  const methods = useFormWithSchema(npcSchema, {
    defaultValues: initialData || defaultNpcValues,
  });


  useEffect(() => {
    const dataToLoad = draftItem || initialData;
    if (dataToLoad) {
      methods.reset({
        ...dataToLoad,
        connections: dataToLoad.connections || [],
      });
    }
  }, [draftItem, initialData, methods.reset]);

  return methods;
}