import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { NpcFormData } from "@/schemas/npc.schema";
import { generateNpcData, generateNpcName } from "@/lib/actions/npcGenerator.actions";
import { shouldReplace } from "@/lib/util/randomValues";

type UseNpcGeneratorActionsReturn = {
  name: () => void;
  missing: () => void;
  reroll: () => void;
};

export function useNpcGeneratorActions(
  methods: UseFormReturn<NpcFormData>
): UseNpcGeneratorActionsReturn {
  const { getValues, setValue } = methods;



  /**
   * Generate an NPC name based on race, pronouns, etc.
   */
  const generateName = useCallback(async () => {
    const formData = getValues();
    const name = await generateNpcName(formData);
    setValue("name", name);
  }, [getValues, setValue]);

  const generateMissing = useCallback(async () => {  
    const currentValues = methods.getValues();
    const overrides = { ...currentValues };

    // Generate NPC data
    const result = await generateNpcData(overrides, false);

    // Only update fields that are empty or missing in the current form
    Object.entries(result).forEach(([key, value]) => {
      const currentValue = methods.getValues(key as keyof NpcFormData);

      if (shouldReplace(currentValue) && value !== undefined && value !== null && value !== "") {
        methods.setValue(key as keyof NpcFormData, value);
      }
    });

    // Check if name field is empty and call `generateName` if so
    const currentName = getValues("name");

    if (!currentName){
      await generateName();
    }
  }, [methods]);





  /**
   * Force full reroll of all NPC fields.
   */
  const rerollAll = useCallback(async () => {
    const emptyOverrides: Partial<NpcFormData> = {};

    // Generate NPC data
    const result = await generateNpcData(emptyOverrides, false);

    // Only update fields that are empty or missing in the current form
    Object.entries(result).forEach(([key, value]) => {
      const currentValue = methods.getValues(key as keyof NpcFormData);

      if (shouldReplace(currentValue) && value !== undefined && value !== null && value !== "") {
        methods.setValue(key as keyof NpcFormData, value);
      }
    });

    // Future: reroll other fields
  }, [methods]);





  return {
    name: generateName,
    missing: generateMissing,
    reroll: rerollAll,
  };
}
