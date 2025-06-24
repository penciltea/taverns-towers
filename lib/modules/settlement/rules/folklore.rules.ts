import { getRandomSubset } from "@/lib/util/randomValues";
import { FolkloreByClimateMapping, FolkloreByDomainMapping, FolkloreByMagicLevelMapping, FolkloreByTagMapping, FolkloreByTerrainMapping } from "../mappings/folklore.mappings";
import { FolkloreByClimate, FolkloreByClimateModel } from "@/lib/models/generator/settlement/folkloreByClimate.model";
import { FolkloreByDomain, FolkloreByDomainModel } from "@/lib/models/generator/settlement/folkloreByDomain.model";
import { FolkloreByMagic, FolkloreByMagicModel } from "@/lib/models/generator/settlement/folkloreByMagic.model";
import { FolkloreByTag, FolkloreByTagModel } from "@/lib/models/generator/settlement/folkloreByTags.model";
import { FolkloreByTerrain, FolkloreByTerrainModel } from "@/lib/models/generator/settlement/folkloreByTerrain.model";
import { NormalizedSettlementInput } from "./normalize";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

export async function applyFolkloreByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = ( !data.folklore || data.folklore === "" );
  if (!shouldGenerate) return data;

  const climate = data.climate;
  const magic = data.magic;
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const domains = data.domains ?? [];
  

  // DB calls for populating arrays
  const results = await Promise.allSettled([
    climate ? FolkloreByClimate.findOne({ climate }).lean<FolkloreByClimateModel | null>() : Promise.resolve(null),
    magic ? FolkloreByMagic.findOne({ magic }).lean<FolkloreByMagicModel | null>() : Promise.resolve(null),
    FolkloreByTag.find({ tags: { $in: data.tags } }).lean<FolkloreByTagModel[]>(),
    FolkloreByTerrain.find({ terrain: { $in: data.terrain } }).lean<FolkloreByTerrainModel[]>(),
    FolkloreByDomain.find({ domains: { $in: data.domains } }).lean<FolkloreByDomainModel[]>(),
  ]);

  const climateFolklore = extractArrayFromResult(
    results[0],
    (val) => val.folklore,
    climate ? FolkloreByClimateMapping[climate] ?? [] : []
  );

  const magicFolklore = extractArrayFromResult(
    results[1],
    (val) => val.folklore,
    magic ? FolkloreByMagicLevelMapping[magic] ?? [] : []
  );

  const tagFolklore = extractArrayFromResult(
    results[2],
    (val) => val.folklore,
    tags.flatMap((tag) => FolkloreByTagMapping[tag] ?? [])
  );

  const terrainFolklore = extractArrayFromResult(
    results[3],
    (val) => val.folklore,
    terrain.flatMap((terrain) => FolkloreByTerrainMapping[terrain] ?? [])
  );

  const domainFolklore = extractArrayFromResult(
    results[4],
    (val) => val.folklore,
    domains.flatMap((domain) => FolkloreByDomainMapping[domain] ?? [])
  );


  const combined = [
    ...climateFolklore,
    ...magicFolklore,
    ...tagFolklore,
    ...terrainFolklore,
    ...domainFolklore
  ]

  const selected = getRandomSubset(combined, { min: 1, max: 3 });
  // adding check to see if adding line breaks is necessary
  if (selected.length > 0) {
    data.folklore = selected.join("\n");
  }

  return data;
}