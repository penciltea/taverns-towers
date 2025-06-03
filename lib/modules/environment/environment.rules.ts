import { EnvironmentInterface } from "@/interfaces/environment.interface";

export function normalizeEnvironmentInput(data: Partial<EnvironmentInterface>): EnvironmentInterface {
  return {
    climate: !data.climate || data.climate.trim() === "" ? "random" : data.climate,
    terrain: !data.terrain || data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
  };
}

import { CLIMATE_TYPES, TERRAIN_TYPES } from "@/constants/settlementOptions";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { TerrainBlacklist, TerrainBlacklistByClimate } from "@/lib/models/generatorTerrainBlacklists.model";
import { TagsByTerrain } from "@/lib/models/generatorTagsByTerrain.model";
import { TagsByTerrainMapping, TerrainBlacklistMapping } from "@/lib/modules/environment/environment.mappings";

// Apply climate rule: randomize climate if needed

export function applyClimateRule(input: EnvironmentInterface): EnvironmentInterface {
  const climate = input.climate === "random"
    ? getRandom(CLIMATE_TYPES)
    : input.climate;

  return {
    ...input,
    climate,
  };
}

// Apply terrain blacklist rule: filter terrain by climate

export async function applyTerrainBlacklistRule(input: EnvironmentInterface): Promise<EnvironmentInterface> {
  const { climate, terrain } = input;

  // Skip if terrain doesn't include "random"
  if (!climate || !terrain || !terrain.includes("random")) {
    return input;
  }

  try {
    // Try DB lookup
    const entry = await TerrainBlacklist.findOne({ climate }).lean<TerrainBlacklistByClimate>();
    const blacklist = entry?.blacklistedTerrains
      ?? TerrainBlacklistMapping[climate]
      ?? [];

    const validTerrains = TERRAIN_TYPES.filter(t => !blacklist.includes(t));

    const resolvedTerrain = terrain.map(t =>
      t === "random" ? getRandom(validTerrains) : t
    );

    return {
      ...input,
      terrain: resolvedTerrain,
    };
  } catch (err) {
    console.warn(`applyTerrainBlacklistRule failed for "${climate}", falling back to local mapping.`, err);

    const fallbackBlacklist = TerrainBlacklistMapping[climate] ?? [];
    const validTerrains = TERRAIN_TYPES.filter(t => !fallbackBlacklist.includes(t));

    const resolvedTerrain = terrain.map(t =>
      t === "random" ? getRandom(validTerrains) : t
    );

    return {
      ...input,
      terrain: resolvedTerrain,
    };
  }
}


// Apply tag rule: add derived tags based on terrain

export async function applyTagsByTerrainRule(input: EnvironmentInterface): Promise<EnvironmentInterface> {
  const { tags, terrain } = input;

  if (!tags || !terrain || !tags.includes("random")) {
    return input;
  }

  const derivedTags = new Set<string>();

  for (const t of terrain) {
    let possibleTags: string[] | undefined;

    try {
      const entry = await TagsByTerrain.findOne({ terrain: t }).lean();
      possibleTags = entry?.tags ?? TagsByTerrainMapping[t];
    } catch (err) {
      console.warn(`applyTagsByTerrainRule failed for terrain "${t}", using fallback.`, err);
      possibleTags = TagsByTerrainMapping[t];
    }

    if (possibleTags && possibleTags.length > 0) {
      const subset = getRandomSubset(possibleTags, getRandom([1, 2, 3]));
      subset.forEach(tag => derivedTags.add(tag));
    }
  }

  return {
    ...input,
    tags: Array.from(derivedTags),
  };
}
