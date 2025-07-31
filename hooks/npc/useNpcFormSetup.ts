/**
 * Hook: useNpcFormSetup
 *
 * Connects form methods to generation, save logic, UI feedback, and store cleanup.
 * Returns ready-to-use form callbacks: onGenerate, onReroll, onSubmit.
 */

"use client"

import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/uiStore";
import { useNpcContentStore } from "@/store/npc.store";
import { useQueryClient } from "@tanstack/react-query";
//import { useSaveNpc } from "./useSaveNpc";
//import { useNpcGeneratorActions } from "./useNpcGeneratorActions";
import { shouldReplace } from "@/lib/util/randomValues";
import { NpcFormData } from "@/schemas/npc.schema";
import { UseFormReturn } from "react-hook-form";

export function useNpcFormSetup(
  methods: UseFormReturn<NpcFormData>,
  id: string | null,
  mode: "add" | "edit"
) {
  const router = useRouter();
  const { showSnackbar, setSubmitting, showErrorDialog } = useUIStore();
  const { clearSelectedItem, clearMode } = useNpcContentStore();
  const queryClient = useQueryClient();

  //const { generatePartial, generateFull } = useNpcGeneratorActions();
  //const saveNpc = useSaveNpc(mode, id ?? undefined);

  /**
   * Generate missing or random values only, preserving existing form data.
   */
  const onGenerate = async () => {
    const currentValues = methods.watch();
    // const generated = await generatePartial(currentValues);
// 
    // Object.entries(generated).forEach(([key, value]) => {
    //   const currentVal = currentValues[key as keyof NpcFormData];
    //   if (shouldReplace(currentVal) && value !== undefined && value !== "") {
    //     methods.setValue(key as keyof NpcFormData, value);
    //   }
    // });
  };

  /**
   * Replaces all form values with newly generated data.
   */
  const onReroll = async () => {
    // const generated = await generateFull();
    // methods.reset(generated);
  };

  /**
   * Submits the form to save or update a npc.
   * Handles error feedback, store reset, cache refresh, and routing.
   */
  const onSubmit = async (data: NpcFormData) => {
    setSubmitting(true);

    // try {
    //   const saved = await saveNpc(data);
// 
    //   showSnackbar(
    //     mode === "edit" ? "Npc updated successfully!" : "Npc created successfully!",
    //     "success"
    //   );
// 
    //   clearSelectedItem();
    //   clearMode();
    //   queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
// 
    //   if (saved?._id) {
    //     router.push(`/npcs/${saved._id}`);
    //   }
    // } catch (error) {
    //   showErrorDialog("Something went wrong saving the npc. Please try again later.");
    // } finally {
    //   setSubmitting(false);
    // }
  };

  return {
    onGenerate,
    onReroll,
    onSubmit,
  };
}
