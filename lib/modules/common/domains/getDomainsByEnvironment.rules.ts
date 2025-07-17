import { DomainsByClimateMapping, DomainsByTerrainMapping, DomainsByTagMapping } from "./domains.mappings";
import { DomainsByTag, DomainsByTagModel } from "@/lib/models/generator/common/domainByTags.model";
import { DomainsByTerrain, DomainsByTerrainModel } from "@/lib/models/generator/common/domainByTerrain.model";
import { DomainsByClimate, DomainsByClimateModel } from "@/lib/models/generator/common/domainByClimate.model";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

interface DomainInput {
  tags?: string[];
  terrain?: string[];
  climate?: string;
}

export async function getDomainsByEnvironment({
  tags = [],
  terrain = [],
  climate,
}: DomainInput): Promise<string[]> { 

  // DB calls for populating arrays
  const results = await Promise.allSettled([
    DomainsByTag.find({ tag: { $in: tags } }).lean<DomainsByTagModel[]>(),
    DomainsByTerrain.find({ terrain: { $in: terrain } }).lean<DomainsByTerrainModel[]>(),
    climate ? DomainsByClimate.findOne({ climate }).lean<DomainsByClimateModel | null>() : Promise.resolve(null),
  ]);

  const tagDomains = extractArrayFromResult(
    results[0],
    (val) => val.domains,
    tags.flatMap((tag) => DomainsByTagMapping[tag] ?? [])
  );

  const terrainDomains = extractArrayFromResult(
    results[1],
    (val) => val.domains,
    terrain.flatMap((terrain) => DomainsByTerrainMapping[terrain] ?? [])
  );

  const climateDomains = extractArrayFromResult(
    results[2],
    (val) => val.domains,
    climate ? DomainsByClimateMapping[climate] ?? [] : []
  );

  // Combine, remove duplicates, and return final data
  const combined = [...tagDomains, ...terrainDomains, ...climateDomains];
  const unique = Array.from(new Set(combined));

  return unique;
}