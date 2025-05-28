import { CLIMATE_TYPES, TERRAIN_TYPES } from "@/constants/settlementOptions";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { TerrainBlacklistByClimate, TagsByTerrain } from "../mappings/environment.mappings";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";

// Logic for setting Climate if set to "random"
export function applyClimateRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
    if(data.climate === "random"){
        data.climate = getRandom(CLIMATE_TYPES);
    }
    return data;
}

// Logic for removing incompatible terrain types based on the climate

export function applyTerrainBlacklistRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (data.climate && data.terrain && data.climate !== "random" && data.terrain.includes("random")) {
    const blacklist = TerrainBlacklistByClimate[data.climate] || [];
    const validTerrains = TERRAIN_TYPES.filter((terrain) => !blacklist.includes(terrain));
    data.terrain = [getRandom(validTerrains)];
  }
  return data;
}

// Logic for adding tags based on terrain type

export function applyTagsByTerrainRule(data: NormalizedSettlementInput): NormalizedSettlementInput {
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