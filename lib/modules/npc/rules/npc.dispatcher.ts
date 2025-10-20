/**
 * Npc Dispatcher
 *
 * Centralizes the generation of NPC data by sequentially applying
 * domain-specific rules (age, pronouns, race, alignment, status, traits).
 *
 * Supports async and sync rules uniformly.
 *
 * Also generates NPC names based on race context.
 */

import { generateNpcName } from "@/lib/actions/npcGenerator.actions";
import { NormalizedNpcInput } from "./normalize";
import {
  applyAgeRule,
  applyAlignmentRule,
  applyArchetypeByAgeRule,
  applyOccupationByConditionsRule,
  applyPersuasionByConditionsRule,
  applyPronounsRule,
  applyRaceRule,
  applyReputationByArchetypeRule,
  applyStatusRule,
  applyTraitsRule,
} from "./applyRules";

// Default list of rules to apply sequentially
const defaultRuleFns: ((data: NormalizedNpcInput) => Promise<NormalizedNpcInput>)[] = [
  async (data) => applyAgeRule(data),
  async (data) => applyPronounsRule(data),
  async (data) => applyRaceRule(data),
  async (data) => applyAlignmentRule(data),
  async (data) => applyStatusRule(data),
  async (data) => applyTraitsRule(data),
  async (data) => applyArchetypeByAgeRule(data),
  async (data) => applyReputationByArchetypeRule(data),
  async (data) => applyOccupationByConditionsRule(data),
  async (data) => applyPersuasionByConditionsRule(data),
];

/**
 * Runs all NPC generation rules in order.
 * Supports both synchronous and asynchronous rule functions.
 *
 * @param input - Normalized input data
 * @param rules - Optional array of rule functions (default: defaultRuleFns)
 * @returns The enriched NPC data
 */
export const generateNpcValues = async (
  input: NormalizedNpcInput,
  rules: ((data: NormalizedNpcInput) => Promise<NormalizedNpcInput>)[] = defaultRuleFns
) => {
  let data = input;

  for (const fn of rules) {
    data = await fn(data);
  }

  return data;
};

/**
 * Generates NPC data including a generated name based on race.
 *
 * @param input - Normalized input data
 * @param rules - Optional array of rule functions (default: defaultRuleFns)
 * @returns NPC data with name included
 */
export const generateNpcWithName = async (
  input: NormalizedNpcInput,
  rules?: ((data: NormalizedNpcInput) => Promise<NormalizedNpcInput>)[]
) => {
  const coreData = await generateNpcValues(input, rules);

  const raceArray = coreData.race ? [coreData.race] : undefined;

  const name = await generateNpcName({ race: raceArray });

  return {
    ...coreData,
    name,
  };
};
