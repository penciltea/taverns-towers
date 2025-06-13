import { getRandomSubset } from "@/lib/util/randomValues";
import { FolkloreByClimateMapping, FolkloreByDomainMapping, FolkloreByMagicLevelMapping, FolkloreByTagMapping, FolkloreByTerrainMapping } from "../mappings/folklore.mappings";
import { FolkloreByClimate } from "@/lib/models/generator/settlement/folkloreByClimate.model";
import { FolkloreByDomain } from "@/lib/models/generator/settlement/folkloreByDomain.model";
import { FolkloreByMagic } from "@/lib/models/generator/settlement/folkloreByMagic.model";
import { FolkloreByTag } from "@/lib/models/generator/settlement/folkloreByTags.model";
import { FolkloreByTerrain } from "@/lib/models/generator/settlement/folkloreByTerrain.model";
import { NormalizedSettlementInput } from "./normalize";

export async function applyFolkloreByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    if (
      !data.folklore || data.folklore === "" &&
      data.climate && data.climate !== "random" &&
      data.tags && !data.tags.includes("random") &&
      data.terrain && !data.terrain.includes("random") &&
      data.domains && !data.domains.includes("random") &&
      data.magic && data.magic !== "random"
    ) {
      const results = await Promise.allSettled([
        FolkloreByClimate.findOne({ climate: data.climate }).lean(),
        FolkloreByMagic.findOne({ magic: data.magic }).lean(),
        FolkloreByTag.find({ tags: { $in: data.tags } }).lean(),
        FolkloreByTerrain.find({ terrain: { $in: data.terrain } }).lean(),
        FolkloreByDomain.find({ domains: { $in: data.domains } }).lean(),
      ]);

      const climateEntry = results[0].status === 'fulfilled' ? results[0].value : null;
      const magicEntry = results[1].status === 'fulfilled' ? results[1].value : null;
      const tagEntries = results[2].status === 'fulfilled' ? results[2].value : [];
      const terrainEntries = results[3].status === 'fulfilled' ? results[3].value : [];
      const domainEntries = results[4].status === 'fulfilled' ? results[4].value : [];

      const climateFolklore = climateEntry?.folklore ?? [];
      const magicFolklore = magicEntry?.folklore ?? [];
      const domainFolklore = domainEntries.flatMap(entry => entry.folklore ?? []);
      const tagFolklore = tagEntries.flatMap(entry => entry.folklore ?? []);
      const terrainFolklore = terrainEntries.flatMap(entry => entry.folklore ?? []);

      const allFolklore = [
        ...climateFolklore,
        ...magicFolklore,
        ...domainFolklore,
        ...tagFolklore,
        ...terrainFolklore,
      ];

      const unique = Array.from(new Set(allFolklore));
      const selected = getRandomSubset(unique, 1, 3);

      if (selected.length > 0) {
        data.folklore = selected.join("\n");
      }
    }
  } catch (err) {
    console.warn("applyFolkloreByConditions failed, using local fallback:", err);

    const fallbackClimateFolklore = FolkloreByClimateMapping[data.climate] ?? [];
    const fallbackMagicFolklore = FolkloreByMagicLevelMapping[data.magic] ?? [];
    const fallbackDomainFolklore = data.domains.flatMap(domain => FolkloreByDomainMapping[domain] ?? []);
    const fallbackTagFolklore = data.tags.flatMap(tag => FolkloreByTagMapping[tag] ?? []);
    const fallbackTerrainFolklore = data.terrain.flatMap(terrain => FolkloreByTerrainMapping[terrain] ?? []);

    const fallbackFolklore = [
      ...fallbackClimateFolklore,
      ...fallbackMagicFolklore,
      ...fallbackDomainFolklore,
      ...fallbackTagFolklore,
      ...fallbackTerrainFolklore,
    ];

    const unique = Array.from(new Set(fallbackFolklore));
    const selected = getRandomSubset(unique, 1, 3);

    if (selected.length > 0) {
      data.folklore = selected.join("\n");
    }
  }

  return data;
}