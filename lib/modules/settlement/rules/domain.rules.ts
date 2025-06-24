import { getRandomSubset } from "@/lib/util/randomValues";
import { DomainsByClimateMapping, DomainsByTerrainMapping, DomainsByTagMapping, domainCountBySize } from "../mappings/domain.mappings";
import { DomainsByTag, DomainsByTagModel } from "@/lib/models/generator/settlement/domainByTags.model";
import { DomainsByTerrain, DomainsByTerrainModel } from "@/lib/models/generator/settlement/domainByTerrain.model";
import { DomainsByClimate, DomainsByClimateModel } from "@/lib/models/generator/settlement/domainByClimate.model";
import { NormalizedSettlementInput } from "./normalize";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

export async function applyDomainsByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = !data.domains || data.domains.includes("random")
  if (!shouldGenerate) return data; 
  
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const climate = data.climate;

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

  const combined = [...tagDomains, ...terrainDomains, ...climateDomains];
  const unique = Array.from(new Set(combined));

  const [min, max] = domainCountBySize[data.size ?? "Town"] ?? [3, 4]; // set a number of domains as determined by the settlement's size, defaulting to "town" if unavailalble
  data.domains = getRandomSubset(unique, {min, max});  // get a random assortment of domains based off the settlement number of domains


  return data;
}