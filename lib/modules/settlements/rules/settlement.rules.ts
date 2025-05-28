import { generateSettlementName } from "../../../actions/settlementGenerator.actions";
import { NormalizedSettlementInput, normalizeSettlementInput } from "./normalize";

import { applyClimateRule, applyTerrainBlacklistRule, applyTagsByTerrainRule } from "./environment.rules";
import { applyDomainsByConditions } from "./domain.rules";
import { applyWealthRule, applyCrimeByWealthRule, applyRulingStyleBySizeRule } from "./law.rules";
import { applyMagicByWealthRule } from "./magic.rules";
import { applyRacesByTerrain } from "./race.rules";
import { applySizeRule } from "./size.rules";
import { applyTradeNotesByTags } from "./trade.rules";
import { applyHolidaysByConditions } from "./holiday.rules";

// set fields based off logic above for any fields with "random" as their value
export const generateSettlementValues = (input: NormalizedSettlementInput) => {
  return [
    applySizeRule,
    applyClimateRule, 
    applyWealthRule,
    applyTerrainBlacklistRule,
    applyTagsByTerrainRule,
    applyCrimeByWealthRule,
    applyRulingStyleBySizeRule,
    applyMagicByWealthRule,
    applyRacesByTerrain,
    applyTradeNotesByTags,
    applyDomainsByConditions,
    applyHolidaysByConditions
  ].reduce((data, fn) => fn(data), input);
};

export const generateSettlementWithName = async (input: NormalizedSettlementInput) => {
  const coreData = generateSettlementValues(input);

  const name = await generateSettlementName({
    terrain: coreData.terrain,
    tags: coreData.tags,
  });

  return {
    ...coreData,
    name,
  };
};

export function generateWildernessContext() {
  // Start with random values
  let data = normalizeSettlementInput({
    climate: "random",
    terrain: ["random"],
    tags: ["random"],
  });

  // Apply generation rules in correct order
  data = applyClimateRule(data);
  data = applyTerrainBlacklistRule(data);
  data = applyTagsByTerrainRule(data);

  return {
    climate: data.climate,
    terrain: data.terrain,
    tags: data.tags,
  };
}