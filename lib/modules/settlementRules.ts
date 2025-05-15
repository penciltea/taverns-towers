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
import { TerrainBlacklistByClimate, TagsByTerrain, CrimesByWealth, WealthBySize, RulingBySize, MagicByWealth } from "./settlementRuleMaps";
import { getRandom, getRandomSubset } from "../util/randomValues";
import { GenerateSettlementInput } from "@/schemas/generateSettlement.schema";
import { GeneratedSettlementFields } from "@/interfaces/settlementGenerator.interface";
import { generateSettlementName } from "../actions/settlementGenerator.actions";

function normalizeInput(data: GenerateSettlementInput): GeneratedSettlementFields {
  return {
    ...data,
    size: data.size || "random",
    terrain: !data.terrain || data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
    climate: data.climate || "random",
    magic: data.magic || "random",
    rulingStyle: data.rulingStyle || "random",
    wealth: data.wealth || "random",
    crime: !data.crime || data.crime.length === 0 ? ["random"] : data.crime,
  };
}

// Logic for setting Size if set to "random"
function applySizeRule(data: ReturnType<typeof normalizeInput>): GeneratedSettlementFields {
  if (data.size === "random") {
    data.size = getRandom(SIZE_TYPES);
  }
  return data;
}

// Logic for setting Climate if set to "random"
function applyClimateRule(data: ReturnType<typeof normalizeInput>): GeneratedSettlementFields {
    if(data.climate === "random"){
        data.climate = getRandom(CLIMATE_TYPES);
    }
    return data;
}

// Logic for setting wealth levels by population size

function applyWealthRule(data: ReturnType<typeof normalizeInput>): GeneratedSettlementFields {
  if (data.size !== "random" && data.wealth === "random") {
    const options = WealthBySize[data.size] ?? WEALTH_LEVELS;
    data.wealth = getRandom(options);
  }
  return data;
}

// Logic for setting Magic use/levels based off settlement wealth
export function applyMagicByWealthRule(data: ReturnType<typeof normalizeInput>): GeneratedSettlementFields {
  if (data.wealth !== "random" && data.magic === "random") {
    const options = MagicByWealth[data.wealth] || MAGIC_LEVELS;
    data.magic = getRandom(options);
  }
  return data;
}

// Logic for removing incompatible terrain types based on the climate

function applyTerrainBlacklistRule(data: GeneratedSettlementFields): GeneratedSettlementFields {
  if (data.climate !== "random" && data.terrain.includes("random")) {
    const blacklist = TerrainBlacklistByClimate[data.climate] || [];
    const validTerrains = TERRAIN_TYPES.filter((terrain) => !blacklist.includes(terrain));
    data.terrain = [getRandom(validTerrains)];
  }
  return data;
}

// Logic for adding tags based on terrain type

function applyTagsByTerrainRule(data: GeneratedSettlementFields): GeneratedSettlementFields {
  if (data.tags.includes("random")) {
    const derivedTags: string[] = [];

    for (const terrain of data.terrain) {
      const possibleTags = TagsByTerrain[terrain];
      if (possibleTags) {
        const subset = getRandomSubset(possibleTags, 1); // you could choose more than 1
        derivedTags.push(...subset);
      }
    }

    data.tags = Array.from(new Set(derivedTags)); // remove duplicates
  }

  return data;
}

// Logic for applying criminal activies by wealth

function applyCrimeByWealthRule(data: GeneratedSettlementFields): GeneratedSettlementFields {
  if (data.crime.includes("random") && typeof data.wealth === "string") {
    const possibleCrimes = CrimesByWealth[data.wealth] ?? CRIMINAL_ACTIVITY_TYPES;
    const subset = getRandomSubset(possibleCrimes, getRandom([1, 2, 3]));
    data.crime = Array.from(new Set(subset));
  }
  return data;
}

// Logic for applying ruling style by settlement size

function applyRulingStyleBySizeRule(data: GeneratedSettlementFields): GeneratedSettlementFields {
  if (data.size !== "random" && data.rulingStyle === "random") {
    const options = RulingBySize[data.size] || RULING_TYPES;
    data.rulingStyle = getRandom(options);
  }
  return data;
}

// set fields based off logic above for any fields with "random" as their value
export const generateSettlementValues = (input: GeneratedSettlementFields) => {
  return [
    normalizeInput,
    applySizeRule,
    applyClimateRule, 
    applyWealthRule,
    applyTerrainBlacklistRule,
    applyTagsByTerrainRule,
    applyCrimeByWealthRule,
    applyRulingStyleBySizeRule,
    applyMagicByWealthRule
  ].reduce((data, fn) => fn(data), input);
};

export const generateSettlementWithName = async (input: GeneratedSettlementFields) => {
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