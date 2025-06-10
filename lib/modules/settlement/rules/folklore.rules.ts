import { NormalizedSettlementInput } from "./normalize";
import { FolkloreByTag, FolkloreByTerrain, FolkloreByClimate, FolkloreByMagicLevel } from "../mappings/folklore.mappings";
import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/environmentOptions";
import { MagicLevel } from "@/constants/settlementOptions";
import { getRandomSubset } from "@/lib/util/randomValues";

export function getFolkloreByConditions({
  climate,
  terrain,
  tags,
  magicLevel,
}: {
  climate?: ClimateTypes;
  terrain?: TerrainTypes[];
  tags?: TagTypes[];
  magicLevel?: MagicLevel;
}): string[] {
  const climateFolklore = climate ? FolkloreByClimate[climate] || [] : [];
  const terrainFolklore = terrain?.flatMap((t) => FolkloreByTerrain[t] || []) || [];
  const tagFolklore = tags?.flatMap((t) => FolkloreByTag[t] || []) || [];
  const magicFolklore = magicLevel ? FolkloreByMagicLevel[magicLevel] || [] : [];

  const combined = [
    ...climateFolklore,
    ...terrainFolklore,
    ...tagFolklore,
    ...magicFolklore,
  ];
  const unique = Array.from(new Set(combined));
  return getRandomSubset(unique, 1, 3);
}

export function applyFolkloreByConditions(
  data: NormalizedSettlementInput
): NormalizedSettlementInput {
  if (
    !Array.isArray(data.folklore) ||
    data.folklore.length === 0 ||
    (data.folklore.length === 1 && data.folklore[0] === "random")
  ) {
    const suggested = getFolkloreByConditions({
      climate: data.climate,
      terrain: data.terrain,
      tags: data.tags,
      magicLevel: data.magic,
    });

    const uniqueFolklore = Array.from(new Set(suggested));
    const selected = getRandomSubset(uniqueFolklore, 1, 3);

    if (selected.length > 0) {
      data.folklore = selected.join("\n");
    }
  }

  return data;
}
