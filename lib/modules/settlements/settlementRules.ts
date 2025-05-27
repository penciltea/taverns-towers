import {
  SIZE_TYPES,
  TAG_TYPES,
  TERRAIN_TYPES,
  WEALTH_LEVELS,
  MAGIC_LEVELS,
  CLIMATE_TYPES,
  RULING_TYPES,
  CRIMINAL_ACTIVITY_TYPES,
  ClimateTypes,
  TagTypes,
  TerrainTypes,
} from "@/constants/settlementOptions";
import { TerrainBlacklistByClimate, TagsByTerrain, CrimesByWealth, WealthBySize, RulingBySize, MagicByWealth, CommonRacesByTerrain, TradeNotesByTag, DomainsByClimate, DomainsByTag, DomainsByTerrain } from "./settlementRuleMaps";
import { getRandom, getRandomSubset } from "../../util/randomValues";
import { Settlement } from "@/interfaces/settlement.interface";
import { generateSettlementName } from "../../actions/settlementGenerator.actions";
import { CommonInterface } from "@/interfaces/common.interface";

type NormalizedSettlementInput = Omit<Settlement, keyof CommonInterface | 'isPublic'> & {
  size: string;
  terrain: string[];
  tags: string[];
  climate: string;
  magic: string;
  rulingStyle: string;
  wealth: string;
  crime: string[];
};

export function normalizeInput(data: Partial<Settlement>): NormalizedSettlementInput {
  return {
    ...data,
    size: !data.size || data.size.trim() === "" ? "random" : data.size,
    terrain: !data.terrain || data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
    climate: !data.climate || data.climate.trim() === "" ? "random" : data.climate,
    magic: !data.magic || data.magic.trim() === "" ? "random" : data.magic,
    rulingStyle: !data.rulingStyle || data.rulingStyle.trim() === "" ? "random" : data.rulingStyle,
    wealth: !data.wealth || data.wealth.trim() === "" ? "random" : data.wealth,
    crime: !data.crime || data.crime.length === 0 ? ["random"] : data.crime,
  };
}




// Logic for setting Size if set to "random"
function applySizeRule(data: ReturnType<typeof normalizeInput>): NormalizedSettlementInput {
  if (data.size === "random") {
    data.size = getRandom(SIZE_TYPES);
  }
  return data;
}

// Logic for setting Climate if set to "random"
function applyClimateRule(data: ReturnType<typeof normalizeInput>): NormalizedSettlementInput {
    if(data.climate === "random"){
        data.climate = getRandom(CLIMATE_TYPES);
    }
    return data;
}

// Logic for setting wealth levels by population size

function applyWealthRule(data: ReturnType<typeof normalizeInput>): NormalizedSettlementInput {
  if (data.size && data.size !== "random" && data.wealth === "random") {
    const options = WealthBySize[data.size] ?? WEALTH_LEVELS;
    data.wealth = getRandom(options);
  }
  return data;
}

// Logic for setting Magic use/levels based off settlement wealth
export function applyMagicByWealthRule(data: ReturnType<typeof normalizeInput>): NormalizedSettlementInput {
  if (data.wealth && data.wealth !== "random" && data.magic === "random") {
    const options = MagicByWealth[data.wealth] || MAGIC_LEVELS;
    data.magic = getRandom(options);
  }
  return data;
}

// Logic for removing incompatible terrain types based on the climate

function applyTerrainBlacklistRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.climate && data.terrain && data.climate !== "random" && data.terrain.includes("random")) {
    const blacklist = TerrainBlacklistByClimate[data.climate] || [];
    const validTerrains = TERRAIN_TYPES.filter((terrain) => !blacklist.includes(terrain));
    data.terrain = [getRandom(validTerrains)];
  }
  return data;
}

// Logic for adding tags based on terrain type

function applyTagsByTerrainRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.tags && data.terrain && data.tags.includes("random")) {
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

function applyCrimeByWealthRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.crime && data.crime.includes("random") && typeof data.wealth === "string") {
    const possibleCrimes = CrimesByWealth[data.wealth] ?? CRIMINAL_ACTIVITY_TYPES;
    const subset = getRandomSubset(possibleCrimes, getRandom([1, 2, 3]));
    data.crime = Array.from(new Set(subset));
  }
  return data;
}

// Logic for applying ruling style by settlement size

function applyRulingStyleBySizeRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.size && data.size !== "random" && data.rulingStyle === "random") {
    const options = RulingBySize[data.size] || RULING_TYPES;
    data.rulingStyle = getRandom(options);
  }
  return data;
}

// Logic for applying common races by terrain

function applyRacesByTerrain(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (
    (!data.races || data.races.trim() === "") &&
    Array.isArray(data.terrain) &&
    !data.terrain.includes("random") &&
    data.terrain.length > 0
  ) {
    const allRaces = data.terrain.flatMap((t) => CommonRacesByTerrain[t] || []);
    const uniqueRaces = Array.from(new Set(allRaces));
    const selectedRaces = getRandomSubset(uniqueRaces, 1, 3);
    data.races = selectedRaces.join(", ");
  }

  return data;
}

// Logic for applying trade notes by tags
function applyTradeNotesByTags(data: NormalizedSettlementInput): NormalizedSettlementInput{
  if (
    (!data.tradeNotes || data.tradeNotes.trim() === "") &&
    Array.isArray(data.tags) &&
    !data.tags.includes("random") &&
    data.tags.length > 0
  ) {
    const allTradeNotes = data.tags.flatMap((t) => TradeNotesByTag[t] || []);
    const uniqueNotes = Array.from(new Set(allTradeNotes));
    const selectedNotes = getRandomSubset(uniqueNotes, 1, 3);
    data.tradeNotes = selectedNotes.join("; ");

    if (selectedNotes.length > 0) {
      const formattedNotes = selectedNotes.map((note, i) => {
        if (i === 0) return note; // keep first as-is (assuming it's capitalized already)
        return note.charAt(0).toLowerCase() + note.slice(1);
      });

      data.tradeNotes = formattedNotes.join("; ");
    }
  }
  
  return data;
}

export function getDomainsByConditions({
  climate,
  terrain,
  tags,
}: {
  climate?: ClimateTypes;
  terrain?: TerrainTypes[];
  tags?: TagTypes[];
}): string[] {
  const climateDomains = climate ? DomainsByClimate[climate] || [] : [];
  const terrainDomains = terrain?.flatMap((t) => DomainsByTerrain[t] || []) || [];
  const tagDomains = tags?.flatMap((t) => DomainsByTag[t] || []) || [];

  const combined = [...climateDomains, ...terrainDomains, ...tagDomains];
  const unique = Array.from(new Set(combined));
  return getRandomSubset(unique, 1, 3);
}


function applyDomainsByConditions(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (
    (!Array.isArray(data.domains) || data.domains.length === 0) &&
    data.climate &&
    Array.isArray(data.terrain) &&
    !data.terrain.includes("random") &&
    Array.isArray(data.tags) &&
    !data.tags.includes("random")
  ) {
    const suggestedDomains = getDomainsByConditions({
      climate: data.climate,
      terrain: data.terrain,
      tags: data.tags,
    });

    // Remove duplicates and choose 1-3 items
    const uniqueDomains = Array.from(new Set(suggestedDomains));
    data.domains = getRandomSubset(uniqueDomains, 1, 3);
  }

  return data;
}

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
    applyDomainsByConditions
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
  let data = normalizeInput({
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