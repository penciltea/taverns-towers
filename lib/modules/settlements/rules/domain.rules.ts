import { NormalizedSettlementInput } from "./normalize";
import { DomainsByClimate, DomainsByTerrain, DomainsByTag } from "../mappings/domain.mappings";
import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/settlementOptions";
import { getRandomSubset } from "@/lib/util/randomValues";

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


export function applyDomainsByConditions(data: NormalizedSettlementInput): NormalizedSettlementInput {
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