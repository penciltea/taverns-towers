import { getRandomSubset } from "@/lib/util/randomValues";
import { DomainsByClimateMapping, DomainsByTerrainMapping, DomainsByTagMapping, domainCountBySize } from "../mappings/domain.mappings";
import { DomainsByTag } from "@/lib/models/generator/settlement/domainByTags.model";
import { DomainsByTerrain } from "@/lib/models/generator/settlement/domainByTerrain.model";
import { DomainsByClimate } from "@/lib/models/generator/settlement/domainByClimate.model";
import { NormalizedSettlementInput } from "./normalize";

export async function applyDomainsByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    const shouldGenerate = !data.domains || data.domains.includes("random")

    if (!shouldGenerate) return data;

    const tags = data.tags ?? [];
    const terrain = data.terrain ?? [];
    const climate = data.climate;

    const [tagResult, terrainResult, climateResult] = await Promise.allSettled([
      DomainsByTag.find({ tag: { $in: tags } }).lean(),
      DomainsByTerrain.find({ terrain: { $in: terrain } }).lean(),
      climate ? DomainsByClimate.findOne({ climate }).lean() : Promise.resolve(null),
    ]);

    const tagDomains = tagResult.status === "fulfilled" ? tagResult.value.flatMap(r => r.domains ?? []) : [];
    const terrainDomains = terrainResult.status === "fulfilled" ? terrainResult.value.flatMap(r => r.domains ?? []) : [];
    const climateDomains = climateResult.status === "fulfilled" && climateResult.value ? climateResult.value.domains ?? [] : [];

    const combined = [...tagDomains, ...terrainDomains, ...climateDomains];
    const unique = Array.from(new Set(combined));

    const [min, max] = domainCountBySize[data.size ?? "Town"] ?? [3, 4];
    data.domains = getRandomSubset(unique, min, max);
  } catch (err) {
    console.warn("applyDomainsByConditions failed, using fallback mappings:", err);

    const tags = data.tags ?? [];
    const terrain = data.terrain ?? [];
    const climate = data.climate;

    const fallbackTags = tags.flatMap(tag => DomainsByTagMapping[tag] ?? []);
    const fallbackTerrain = terrain.flatMap(t => DomainsByTerrainMapping[t] ?? []);
    const fallbackClimate = climate ? DomainsByClimateMapping[climate] ?? [] : [];

    const combinedFallback = [...fallbackTags, ...fallbackTerrain, ...fallbackClimate];
    const uniqueFallback = Array.from(new Set(combinedFallback));

    const [min, max] = domainCountBySize[data.size ?? "Town"] ?? [3, 4];
    data.domains = getRandomSubset(uniqueFallback, min, max);
  }

  return data;
}