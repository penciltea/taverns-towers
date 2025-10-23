/**
 * Hook: useSettlementGeneratorActions
 *
 * Provides reusable generation logic for settlements.
 * - `generatePartial`: fills in only missing or "random" fields
 * - `generateFull`: generates a complete settlement from scratch
 *
 * This hook does not modify form state—it returns data to be applied externally.
 */

import { normalizeSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { SettlementFormData, defaultSettlementValues } from "@/schemas/settlement.schema";

export function useSettlementGeneratorActions() {
  /**
   * Generates data for only empty or "random" fields.
   * Accepts the current form state to preserve existing values.
   */
  const generatePartial = async (currentValues: SettlementFormData, tier: string) => {
    const normalizedInput = normalizeSettlementInput(currentValues);
    const { generateSettlementData } = await import('@/lib/actions/settlementGenerator.actions');
    const generated = await generateSettlementData(normalizedInput, tier, false);
    return generated;
  };

  /**
   * Generates a full new settlement from scratch (replaces all fields).
   */
  const generateFull = async (tier: string) => {
    const { generateSettlementData } = await import('@/lib/actions/settlementGenerator.actions');
    const generated = await generateSettlementData(defaultSettlementValues, tier, true);
    return generated;
  };

  return {
    generatePartial,
    generateFull,
  };
}
