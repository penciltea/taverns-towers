/**
 * Hook: useSettlementFormHandlers
 *
 * Provides handler functions for:
 * - Generating or re-rolling settlement data
 * - Submitting the form to create or update a settlement
 * - Preserving existing form values during partial generation
 */

import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";
import { useSaveSettlementMutation } from "@/hooks/useSaveSettlementMutation";
import { normalizeSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { generateSettlementData } from "@/lib/actions/settlementGenerator.actions";
import { SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";

export function useSettlementFormHandlers(
    methods: UseFormReturn<SettlementFormData>,
    id: string | null,
    mode: "add" | "edit"
) {
  const router = useRouter();
  const { saveSettlement } = useSaveSettlementMutation({ id: id ?? undefined, mode });

  // Handles generating new values (only fills in blank fields)
  const handleGenerate = async () => {
    const currentValues = methods.watch(); // get current form state

    // Normalize current input to handle "random" values, etc.
    const normalizedInput = normalizeSettlementInput(currentValues);

    // Generate full data from normalized input (rerollAll = false)
    const generatedValues = await generateSettlementData(normalizedInput, false);

    // Only fill in missing or empty fields, preserve existing values (including name)
    Object.entries(generatedValues).forEach(([key, value]) => {
      const currentVal = currentValues[key as keyof SettlementFormData];
      if (
        currentVal === undefined ||
        currentVal === null ||
        (typeof currentVal === "string" && currentVal.trim() === "") ||
        (Array.isArray(currentVal) && currentVal.length === 0)
      ) {
        methods.setValue(key as keyof SettlementFormData, value);
      }
    });
  };

  // Handler function to re-roll all fields (clears all fields and replaces with generated data)
  const handleReroll = async () => {
    // re-roll flag set to "true" to force rerolling all fields
    const generatedValues = await generateSettlementData(defaultSettlementValues, true);
    methods.reset(generatedValues);
  };

  const onSubmit = async (data: SettlementFormData) => {
    const result = await saveSettlement(data);
    if (result?.success && result.settlement) {
      router.push(`/settlements/${result.settlement._id}`);
    }
  };

  return { handleGenerate, handleReroll, onSubmit };
}