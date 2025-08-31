/**
 * Npc Dispatcher
 *
 * Centralizes the generation of settlement data by sequentially applying
 * a set of domain-specific rules (size, wealth, crime, ruling style, magic, races, trade notes, etc.).
 *
 * Supports async and sync rules uniformly.
 *
 * Also generates settlement names based on environmental context.
 * Provides a helper to generate wilderness context.
 */

import { generateNpcName } from "@/lib/actions/npcGenerator.actions";
import { NormalizedNpcInput } from "./normalize";
import { applyAgeRule, applyAlignmentRule, applyPronounsRule, applyRaceRule, applyStatusRule, applyTraitsRule } from "./applyRules";

// List of rules to apply sequentially to normalized settlement input data.
// Each rule enriches or modifies the settlement data based on various conditions.
const ruleFns = [
  applyAgeRule,
  applyPronounsRule,
  applyRaceRule,
  applyAlignmentRule,
  applyStatusRule,
  applyTraitsRule
];

/**
 * Runs all settlement generation rules in order.
 * Supports both synchronous and asynchronous rule functions.
 *
 * @param input - Normalized input data for settlement generation
 * @returns The enriched settlement data after applying all rules
*/

export const generateNpcValues = async (input: NormalizedNpcInput) => {
  let data = input;

  for (const fn of ruleFns) {
    data = await fn(data); // handles both sync and async rules
  }

  return data;
};


/**
 * Generates settlement data including a generated settlement name
 * based on the climate, terrain, and tags.
 *
 * @param input - Normalized input data for settlement generation
 * @return Npc data with name included
 */

export const generateNpcWithName = async (input: NormalizedNpcInput) => {
  // First run all generation rules to get full settlement data
  const coreData = await generateNpcValues(input);

  const raceArray = coreData.race ? [coreData.race] : undefined;

  // Generate a thematic name based on environmental context
  const name = await generateNpcName({
    race: raceArray
  });

  // Return settlement data combined with the generated name
  return {
    ...coreData,
    name,
  };
};