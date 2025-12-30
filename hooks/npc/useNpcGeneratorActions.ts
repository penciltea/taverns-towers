import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { defaultNpcValues, NpcFormData } from "@/schemas/npc.schema";
import { shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput } from "@/lib/modules/npc/rules/normalize";
import { defaultCommonFields } from "@/lib/modules/npc/rules/normalize";

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
    const raceArray = formData.race ? [formData.race] : undefined;

    const { generateNpcName } = await import('@/lib/actions/npcGenerator.actions');
    const name = await generateNpcName({ ...formData, race: raceArray });
    setValue("name", name);
  }, [getValues, setValue]);


  /**
   * Generate any fields that are set to empty or "random" if applicable
   */
  
  const generateMissing = useCallback(async () => {  
    const currentValues = methods.getValues();
    const overrides = { ...currentValues };

    // Generate NPC data
    const { generateNpcData } = await import('@/lib/actions/npcGenerator.actions');
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
    const { generateNpcWithName } = await import(
      "@/lib/modules/npc/rules/npc.dispatcher"
    );
    const result = await generateNpcWithName(
      normalizeNpcInput({
        ...defaultCommonFields,
        ...defaultNpcValues
      })
    );

  // Overwrite all values
    Object.entries(result).forEach(([key, value]) => {
      methods.setValue(key as keyof NpcFormData, value);
    });
  }, [methods]);





  return {
    name: generateName,
    missing: generateMissing,
    reroll: rerollAll,
  };
}
