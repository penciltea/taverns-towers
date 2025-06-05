import { getRandomSubset } from "@/lib/util/randomValues";
import { DomainsByClimateMapping, DomainsByTerrainMapping, DomainsByTagMapping } from "../mappings/domain.mappings";
import { DomainsByTag } from "@/lib/models/generatorDomainByTags.model";
import { DomainsByTerrain } from "@/lib/models/generatorDomainByTerrain.model";
import { DomainsByClimate } from "@/lib/models/generatorDomainByClimate.model";
import { NormalizedSettlementInput } from "./normalize";

export async function applyDomainsByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    const shouldGenerate =
      !Array.isArray(data.domains) ||
      data.domains.length === 0 ||
      (data.domains.length === 1 && data.domains[0] === "random");

    if (
      shouldGenerate &&
      data.tags &&
      !data.tags.includes("random") &&
      data.terrain &&
      !data.terrain.includes("random") &&
      data.climate &&
      data.climate !== "random"
    ) {
      const [tagEntries, terrainEntries, climateEntry] = await Promise.all([
        DomainsByTag.find({ tags: { $in: data.tags } }).lean(),
        DomainsByTerrain.find({ terrain: { $in: data.terrain } }).lean(),
        DomainsByClimate.findOne({ climate: data.climate }).lean(),
      ]);

      const tagDomains = tagEntries?.flatMap(entry => entry.domains) ?? [];
      const terrainDomains = terrainEntries?.flatMap(entry => entry.domains) ?? [];
      const climateDomains = climateEntry?.domains ?? [];

      const fallbackTagDomains = data.tags.flatMap(tag => DomainsByTagMapping[tag] ?? []);
      const fallbackTerrainDomains = data.terrain.flatMap(t => DomainsByTerrainMapping[t] ?? []);
      const fallbackClimateDomains = DomainsByClimateMapping[data.climate] ?? [];

      const allDomains = [
        ...tagDomains,
        ...terrainDomains,
        ...climateDomains,
        ...fallbackTagDomains,
        ...fallbackTerrainDomains,
        ...fallbackClimateDomains,
      ];

      const unique = Array.from(new Set(allDomains));
      data.domains = getRandomSubset(unique, 1, 3);
    }
  } catch (err) {
    console.warn("applyDomainsByConditions failed, using local fallback:", err);

    const fallbackDomains = [
      ...(data.tags?.flatMap(tag => DomainsByTagMapping[tag] ?? []) ?? []),
      ...(data.terrain?.flatMap(t => DomainsByTerrainMapping[t] ?? []) ?? []),
      ...(data.climate ? DomainsByClimateMapping[data.climate] ?? [] : []),
    ];

    const unique = Array.from(new Set(fallbackDomains));
    data.domains = getRandomSubset(unique, 1, 3);
  }

  return data;
}
