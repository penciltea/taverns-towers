import { generateSettlementName } from "@/lib/actions/settlementGenerator.actions";
import { NormalizedSettlementInput, normalizeSettlementInput } from "./normalize";

import { applyDomainsByConditions } from "./domain.rules";
import { applyCrimeByWealthRule, applyRulingStyleBySizeRule, applyWealthBySizeRule } from "./law.rules";
import { applyMagicByWealthRule } from "./magic.rules";
import { applyRacesByConditions } from "./race.rules";
import { applySizeRule } from "./size.rules";
import { applyTradeNotesRule } from "./trade.rules";
import { applyHolidaysByConditions } from "./holiday.rules";
import { applyFolkloreByConditions } from "./folklore.rules";
import { generateEnvironment } from "@/lib/actions/environmentGenerator.actions";

const ruleFns = [
  applySizeRule,
  applyWealthBySizeRule,
  applyCrimeByWealthRule,
  applyRulingStyleBySizeRule,
  applyMagicByWealthRule,
  applyRacesByConditions,
  applyTradeNotesRule,
  applyDomainsByConditions,
  applyHolidaysByConditions,
  applyFolkloreByConditions,
];

export const generateSettlementValues = async (input: NormalizedSettlementInput) => {
  let data = input;

  for (const fn of ruleFns) {
    data = await fn(data); // handles both sync and async rules
  }

  return data;
};

export const generateSettlementWithName = async (input: NormalizedSettlementInput) => {
  const coreData = await generateSettlementValues(input);

  const name = await generateSettlementName({
    climate: coreData.climate,
    terrain: coreData.terrain,
    tags: coreData.tags,
  });

  return {
    ...coreData,
    name,
  };
};

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
