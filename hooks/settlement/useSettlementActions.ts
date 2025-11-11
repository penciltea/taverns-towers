/**
 * Hook: useSettlementFormSetup
 *
 * Connects form methods to generation, save logic, UI feedback, and store cleanup.
 * Returns ready-to-use form callbacks: onGenerate, onReroll, onSubmit.
 */

"use client"

import { shouldReplace } from "@/lib/util/randomValues";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { UseFormReturn } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { userTier } from "@/constants/user.options";

export function useSettlementActions(
  methods: UseFormReturn<SettlementFormData>
) {
  const { user } = useAuthStore();

  /**
   * Generate missing or random values only, preserving existing form data.
   */
  const onGenerate = async () => {
    const { generatePartial } = await import("./useSettlementGeneratorActions").then(m => m.useSettlementGeneratorActions());

    const currentValues = methods.watch();
    const generated = await generatePartial(currentValues, user?.tier ?? userTier[0]);

    Object.entries(generated).forEach(([key, value]) => {
      const currentVal = currentValues[key as keyof SettlementFormData];
      if (shouldReplace(currentVal) && value !== undefined && value !== "") {
        methods.setValue(key as keyof SettlementFormData, value);
      }
    });
  };

  /**
   * Replaces all form values with newly generated data.
   */
  const onReroll = async () => {
    const { generateFull } = await import("./useSettlementGeneratorActions").then(m => m.useSettlementGeneratorActions());
    const generated = await generateFull(user?.tier ?? userTier[0]);
    methods.reset(generated);
  };

  return {
    onGenerate,
    onReroll,
  };
}
