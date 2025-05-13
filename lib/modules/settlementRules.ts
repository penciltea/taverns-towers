import {
  SIZE_TYPES,
  TAG_TYPES,
  TERRAIN_TYPES,
  WEALTH_LEVELS,
  MAGIC_LEVELS,
  CLIMATE_TYPES,
  RULING_TYPES,
  CRIMINAL_ACTIVITY_TYPES,
} from "@/constants/settlementOptions";
import { getRandom, getRandomSubset } from "../util/randomValues";
import { GenerateSettlementInput } from "@/schemas/generateSettlement.schema";

/**
 * Logic-based filtering for wealth based on size.
 */
function getWealthOptionsForSize(size: string): string[] {
  switch (size) {
    case "Encampment":
    case "Thorp":
      return WEALTH_LEVELS.slice(0, 3); // Impoverished–Modest
    case "Hamlet":
    case "Village":
      return WEALTH_LEVELS.slice(1, 5); // Struggling–Wealthy
    case "Town":
      return WEALTH_LEVELS.slice(2, 6); // Modest–Affluent
    case "City":
    case "Metropolis":
      return WEALTH_LEVELS; // All
    default:
      return WEALTH_LEVELS;
  }
}

/**
 * Generate random settlement values with optional inputs.
 * If a field is passed in as "random", a random valid value is chosen.
 */
export const generateSettlementValues = (data: GenerateSettlementInput) => {
  // Check each field to see if it's empty, and if it is, assign 'random'
  const processed = {
    ...data,
    size: data.size || "random",
    terrain: data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
    climate: data.climate || "random",
    magic: data.magic || "random",
    rulingStyle: data.rulingStyle || "random",
    wealth: data.wealth || "random",
    crime: !data.crime || data.crime.length === 0 ? ["random"] : data.crime,
  };

  // If size is not random, filter the wealth options based on size
  if (processed.size !== "random" && processed.wealth === "random") {
    const wealthOptions = getWealthOptionsForSize(processed.size);
    // Choose a random wealth level from the filtered options
    processed.wealth = getRandom(wealthOptions);
  }

  return processed;
};
