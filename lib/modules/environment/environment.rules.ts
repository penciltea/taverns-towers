import { EnvironmentInterface } from "@/interfaces/environment.interface";
import { CLIMATE_TYPES, TERRAIN_TYPES } from "@/constants/environment.options";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { TerrainBlacklist, TerrainBlacklistByClimate } from "@/lib/models/generator/settlement/terrainBlacklists.model";
import { TagsByTerrain } from "@/lib/models/generator/settlement/tagsByTerrain.model";
import { TagsByTerrainMapping, TerrainBlacklistMapping } from "@/lib/modules/environment/environment.mappings";

// Normalize input to allow "random" as a placeholder
export function normalizeEnvironmentInput(data: Partial<EnvironmentInterface>): EnvironmentInterface {
  return {
    climate: !data.climate || data.climate.trim() === "" ? "random" : data.climate,
    terrain: !data.terrain || data.terrain.length === 0 ? ["random"] : data.terrain,
    tags: !data.tags || data.tags.length === 0 ? ["random"] : data.tags,
  };
}

// Replace 'random' climate with a real value from CLIMATE_TYPES
export function applyClimateRule(input: EnvironmentInterface): EnvironmentInterface {
  const climate = input.climate === "random"
    ? getRandom(CLIMATE_TYPES)
    : input.climate;

  return {
    ...input,
    climate,
  };
}

// Replace 'random' terrain entries with valid terrain values
export async function applyTerrainBlacklistRule(input: EnvironmentInterface): Promise<EnvironmentInterface> {
  const { climate, terrain } = input;

  // Only process if terrain includes 'random'
  if (!climate || !terrain || !terrain.includes("random")) {
    return input;
  }

  try {
    const entry = await TerrainBlacklist.findOne({ climate }).lean<TerrainBlacklistByClimate>();
    const blacklist = entry?.blacklistedTerrains ?? TerrainBlacklistMapping[climate] ?? [];

    const validTerrains = TERRAIN_TYPES.filter(t => !blacklist.includes(t));

    // Replace each 'random' terrain with a valid random terrain
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

// Replace 'random' tags with derived tags based on terrain
export async function applyTagsByTerrainRule(input: EnvironmentInterface): Promise<EnvironmentInterface> {
  const { tags, terrain } = input;

  // If missing, just return input but remove "random" from tags
  if (!tags || !terrain) {
    return { ...input, tags: tags?.filter(t => t.trim().toLowerCase() !== "random") ?? [] };
  }

  const derivedTags = new Set<string>();

  // If user selected "random", derive tags from terrain
  const hasRandom = tags.some(t => t.trim().toLowerCase() === "random");
  if (!hasRandom) return input; // preserve user-selected tags

  for (const t of terrain) {
    let possibleTags: string[] = [];

    try {
      possibleTags = (await TagsByTerrain.findOne({ terrain: t }).lean())?.tags ?? TagsByTerrainMapping[t] ?? [];
    } catch {
      possibleTags = TagsByTerrainMapping[t] ?? [];
    }

    // Filter out "random" tags and trim
    const validTags = possibleTags
      .map(tag => tag.trim())
      .filter(tag => tag.toLowerCase() !== "random");

    if (validTags.length > 0) {
      const subset = getRandomSubset(validTags, { min: 1, max: 3 });
      subset.forEach(tag => derivedTags.add(tag));
    }
  }

  // Return derived tags (may be empty)
  return { ...input, tags: Array.from(derivedTags) };
}

// remove "random"
export async function removeRandomMarkers(input: EnvironmentInterface): Promise<EnvironmentInterface> {
  const climate = !input.climate || input.climate.trim().toLowerCase() === "random"
    ? getRandom(CLIMATE_TYPES)
    : input.climate;

  const terrainNeedsReplacement = input.terrain.some(t => t.trim().toLowerCase() === "random");
  const terrain = (!input.terrain.length || terrainNeedsReplacement)
    ? [getRandom(TERRAIN_TYPES)]
    : input.terrain.filter(t => t.trim().toLowerCase() !== "random");

  const tags = input.tags
    .filter(t => t.trim().toLowerCase() !== "random");

  return { climate, terrain, tags };
}