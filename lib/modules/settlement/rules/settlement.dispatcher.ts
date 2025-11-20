/**
 * Settlement Dispatcher
 *
 * Centralizes the generation of settlement data by sequentially applying
 * a set of domain-specific rules (size, wealth, crime, ruling style, magic, races, trade notes, etc.).
 *
 * Supports async and sync rules uniformly.
 *
 * Also generates settlement names based on environmental context.
 * Provides a helper to generate wilderness context.
 */

import { generateSettlementName } from "@/lib/actions/settlementGenerator.actions";
import { NormalizedSettlementInput } from "./normalize";
import { applyDomainsByConditions } from "./domain.rules";
import { applyCrimeByWealthRule, applyMilitaryByConditions, applyRulingStyleBySizeRule, applyWealthBySizeRule } from "./law.rules";
import { applyMagicByWealthRule } from "./magic.rules";
import { applyRacesByConditions } from "./race.rules";
import { applySettlementThemeRule, applySizeRule } from "./size.rules";
import { applyTradeNotesRule } from "./trade.rules";
import { applyHolidaysByConditions } from "./holiday.rules";
import { applyFolkloreByConditions } from "./folklore.rules";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";

// List of rules to apply sequentially to normalized settlement input data.
// Each rule enriches or modifies the settlement data based on various conditions.
const ruleFns = [
  applySizeRule,
  applySettlementThemeRule,
  applyWealthBySizeRule,
  applyCrimeByWealthRule,
  applyRulingStyleBySizeRule,
  applyMilitaryByConditions,
  applyMagicByWealthRule,
  applyRacesByConditions,
  applyTradeNotesRule,
  applyDomainsByConditions,
  applyHolidaysByConditions,
  applyFolkloreByConditions,
];

/**
 * Runs all settlement generation rules in order.
 * Supports both synchronous and asynchronous rule functions.
 *
 * @param input - Normalized input data for settlement generation
 * @returns The enriched settlement data after applying all rules
*/

export const generateSettlementValues = (input: NormalizedSettlementInput) => {
  let data = input;

  for (const fn of ruleFns) {
    data = fn(data); // handles both sync and async rules
  }

  return data;
};


/**
 * Generates settlement data including a generated settlement name
 * based on the climate, terrain, and tags.
 *
 * @param input - Normalized input data for settlement generation
 * @return Settlement data with name included
 */

export const generateSettlementWithName = async (input: NormalizedSettlementInput) => {
  // First run all generation rules to get full settlement data
  const coreData = generateSettlementValues(input);

  // Generate a thematic name based on environmental context
  const name = await generateSettlementName({
    climate: coreData.climate,
    terrain: coreData.terrain,
    tags: coreData.tags,
  });

  // Return settlement data combined with the generated name
  return {
    ...coreData,
    name,
  };
};

/**
 * Helper to generate a random wilderness context,
 * producing terrain, climate, and tags to use when no settlement ID is given.
 *
 * @return Object containing randomly generated climate, terrain, and tags
*/

export async function generateWildernessContext() {
  const environment = await generateEnvironment({
    climate: "random",
    terrain: ["random"],
    tags: ["random"],
  });

  return {
    climate: environment.climate,
    terrain: environment.terrain,
    tags: environment.tags,
  };
}
