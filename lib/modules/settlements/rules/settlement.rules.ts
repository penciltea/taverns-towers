import { generateSettlementName } from "@/lib/actions/settlementGenerator.actions";
import { NormalizedSettlementInput, normalizeSettlementInput } from "./normalize";

import { applyClimateRule, applyTagsByTerrainRule, applyTerrainBlacklistRule } from "./environment.rules";
import { applyDomainsByConditions } from "./domain.rules";
import { applyCrimeByWealthRule, applyRulingStyleBySizeRule, applyWealthBySizeRule } from "./law.rules";
import { applyMagicByWealthRule } from "./magic.rules";
import { applyRacesByTerrain } from "./race.rules";
import { applySizeRule } from "./size.rules";
import { applyTradeNotesByTags } from "./trade.rules";
import { applyHolidaysByConditions } from "./holiday.rules";
import { applyFolkloreByConditions } from "./folklore.rules";

const ruleFns = [
  applySizeRule,
  applyClimateRule,
  applyWealthBySizeRule,
  applyTerrainBlacklistRule,
  applyTagsByTerrainRule,
  applyCrimeByWealthRule,
  applyRulingStyleBySizeRule,
  applyMagicByWealthRule,
  applyRacesByTerrain,
  applyTradeNotesByTags, // ToDo: Update
  applyDomainsByConditions, // ToDo: Update
  applyHolidaysByConditions, // ToDo: Update
  applyFolkloreByConditions, // ToDo: Update
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
    terrain: coreData.terrain,
    tags: coreData.tags,
  });

  return {
    ...coreData,
    name,
  };
};

export async function generateWildernessContext() {
  let data = normalizeSettlementInput({
    climate: "random",
    terrain: ["random"],
    tags: ["random"],
  });

  data = applyClimateRule(data);
  data = await applyTerrainBlacklistRule(data);
  data = await applyTagsByTerrainRule(data);

  return {
    climate: data.climate,
    terrain: data.terrain,
    tags: data.tags,
  };
}
