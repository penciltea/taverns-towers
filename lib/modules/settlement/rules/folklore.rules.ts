import { getRandomSubset } from "@/lib/util/randomValues";
import { FolkloreByClimateMapping, FolkloreByDomainMapping, FolkloreByMagicLevelMapping, FolkloreByTagMapping, FolkloreByTerrainMapping } from "../mappings/folklore.mappings";
import { NormalizedSettlementInput } from "./normalize";

export function applyFolkloreByConditions(data: NormalizedSettlementInput) {
  const shouldGenerate = ( !data.folklore || data.folklore === "" );
  if (!shouldGenerate) return data;

  const climate = data.climate;
  const magic = data.magic;
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const domains = data.domains ?? [];
  
  const climateFolklore = climate ? FolkloreByClimateMapping[climate] ?? [] : [];
  const magicFolklore = magic ? FolkloreByMagicLevelMapping[magic] ?? [] : [];
  const tagFolklore = tags.flatMap((tag) => FolkloreByTagMapping[tag] ?? []);
  const terrainFolklore = terrain.flatMap((terrain) => FolkloreByTerrainMapping[terrain] ?? []);
  const domainFolklore = domains.flatMap((domain) => FolkloreByDomainMapping[domain] ?? []);

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