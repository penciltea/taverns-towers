import { DomainsByClimateMapping, DomainsByTerrainMapping, DomainsByTagMapping } from "./domains.mappings";

interface DomainInput {
  tags?: string[];
  terrain?: string[];
  climate?: string;
}

export function getDomainsByEnvironment({
  tags = [],
  terrain = [],
  climate,
}: DomainInput): string[] {

  const tagDomains = tags.flatMap((tag) => DomainsByTagMapping[tag] ?? []);
  const terrainDomains = terrain.flatMap((t) => DomainsByTerrainMapping[t] ?? []);
  const climateDomains = climate ? DomainsByClimateMapping[climate] ?? [] : [];

  // Combine all domains and remove duplicates
  const combined = [...tagDomains, ...terrainDomains, ...climateDomains];
  return Array.from(new Set(combined));
}
