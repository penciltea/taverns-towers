import { CLIMATE_TYPES, TERRAIN_TYPES } from "@/constants/settlementOptions";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";
import { TerrainBlacklist, TerrainBlacklistByClimate } from "@/lib/models/generatorTerrainBlacklists.model";
import { TagsByTerrainMapping, TerrainBlacklistMapping } from "../mappings/environment.mappings";
import { TagsByTerrain } from "@/lib/models/generatorTagsByTerrain.model";

// Logic for setting Climate if set to "random"
export function applyClimateRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
    if(data.climate === "random"){
        data.climate = getRandom(CLIMATE_TYPES);
    }
    return data;
}

// Logic for removing incompatible terrain types based on the climate
export async function applyTerrainBlacklistRule(
  data: NormalizedSettlementInput
): Promise<NormalizedSettlementInput> {
  try {
    if (
      data.climate &&
      data.terrain &&
      data.climate !== "random" &&
      data.terrain.includes("random")
    ) {
      // Try DB lookup
      const entry = await TerrainBlacklist
        .findOne({ climate: data.climate })
        .lean<TerrainBlacklistByClimate>();

      // If DB fails or is empty, use fallback mapping
      const blacklist = entry?.blacklistedTerrains 
        ?? TerrainBlacklistMapping[data.climate] 
        ?? [];

      const validTerrains = TERRAIN_TYPES.filter(
        (terrain) => !blacklist.includes(terrain)
      );

      data.terrain = data.terrain.flatMap((t) =>
        t === "random" ? [getRandom(validTerrains)] : [t]
      );
    }
  } catch (err) {
    console.warn("applyTerrainBlacklistRule failed, using local fallback:", err);

    // Use mapping fallback even on DB error
    const fallbackBlacklist = TerrainBlacklistMapping[data.climate] ?? [];

    const validTerrains = TERRAIN_TYPES.filter(
      (terrain) => !fallbackBlacklist.includes(terrain)
    );

    data.terrain = data.terrain.map((t) =>
      t === "random" ? getRandom(validTerrains) : t
    );
  }

  return data;
}

// Logic for adding tags based on terrain type
export async function applyTagsByTerrainRule(
  data: NormalizedSettlementInput
): Promise<NormalizedSettlementInput> {
  if (
    data.tags &&
    data.terrain &&
    data.tags.includes("random")
  ) {
    const derivedTags: string[] = [];

    for (const terrain of data.terrain) {
      let possibleTags: string[] | undefined;

      try {
        const entry = await TagsByTerrain.findOne({ terrain }).lean();
        possibleTags = entry?.tags ?? TagsByTerrainMapping[terrain];
      } catch (err) {
        console.warn(`Failed to load tags for terrain "${terrain}" from DB, using fallback`, err);
        possibleTags = TagsByTerrainMapping[terrain];
      }

      if (possibleTags && possibleTags.length > 0) {
        const subset = getRandomSubset(possibleTags, getRandom([1, 2, 3]));
        derivedTags.push(...subset);
      }
    }

    data.tags = Array.from(new Set(derivedTags)); // de-duplicate
  }

  return data;
}