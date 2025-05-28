
// Logic for setting wealth levels by population size

import { WEALTH_LEVELS, CRIMINAL_ACTIVITY_TYPES, RULING_TYPES } from "@/constants/settlementOptions";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { WealthBySize, CrimesByWealth, RulingBySize } from "../mappings/law.mappings";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";

export function applyWealthRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
  if (data.size && data.size !== "random" && data.wealth === "random") {
    const options = WealthBySize[data.size] ?? WEALTH_LEVELS;
    data.wealth = getRandom(options);
  }
  return data;
}

// Logic for applying criminal activies by wealth

export function applyCrimeByWealthRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.crime && data.crime.includes("random") && typeof data.wealth === "string") {
    const possibleCrimes = CrimesByWealth[data.wealth] ?? CRIMINAL_ACTIVITY_TYPES;
    const subset = getRandomSubset(possibleCrimes, getRandom([1, 2, 3]));
    data.crime = Array.from(new Set(subset));
  }
  return data;
}

// Logic for applying ruling style by settlement size

export function applyRulingStyleBySizeRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.size && data.size !== "random" && data.rulingStyle === "random") {
    const options = RulingBySize[data.size] || RULING_TYPES;
    data.rulingStyle = getRandom(options);
  }
  return data;
}