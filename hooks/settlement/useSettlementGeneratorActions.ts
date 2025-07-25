/**
 * Hook: useSettlementGeneratorActions
 *
 * Provides reusable generation logic for settlements.
 * - `generatePartial`: fills in only missing or "random" fields
 * - `generateFull`: generates a complete settlement from scratch
 *
 * This hook does not modify form state—it returns data to be applied externally.
 */

import { generateSettlementData } from "@/lib/actions/settlementGenerator.actions";
import { normalizeSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";

export function useSettlementGeneratorActions() {
  /**
   * Generates data for only empty or "random" fields.
   * Accepts the current form state to preserve existing values.
   */
  const generatePartial = async (currentValues: SettlementFormData) => {
    const normalizedInput = normalizeSettlementInput(currentValues);
    const generated = await generateSettlementData(normalizedInput, false);
    return generated;
  };

  /**
   * Generates a full new settlement from scratch (replaces all fields).
   */
  const generateFull = async () => {
    const generated = await generateSettlementData(defaultSettlementValues, true);
    return generated;
  };

  return {
    generatePartial,
    generateFull,
  };
}
