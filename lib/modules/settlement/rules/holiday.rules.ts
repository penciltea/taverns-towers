import { getRandomSubset } from "@/lib/util/randomValues";
import { HolidaysByClimateMapping, HolidaysByDomainMapping, HolidaysByMagicLevelMapping, HolidaysByTagMapping, HolidaysByTerrainMapping } from "../mappings/holiday.mappings";
import { NormalizedSettlementInput } from "./normalize";

export function applyHolidaysByConditions(data: NormalizedSettlementInput) {
  const shouldGenerate = (!data.holidays || data.holidays === "");
  if(!shouldGenerate) return data;

  const climate = data.climate;
  const magic = data.magic;
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const domains = data.domains ?? [];

  const climateHoliday = climate ? HolidaysByClimateMapping[climate] ?? [] : [];
  const magicHoliday = magic ? HolidaysByMagicLevelMapping[magic] ?? [] : [];
  const tagHoliday = tags.flatMap((tag) => HolidaysByTagMapping[tag] ?? []);
  const terrainHoliday = terrain.flatMap((terrain) => HolidaysByTerrainMapping[terrain] ?? []);
  const domainHoliday = domains.flatMap((domain) => HolidaysByDomainMapping[domain] ?? []);

  const combined = [
    ...climateHoliday,
    ...magicHoliday,
    ...tagHoliday,
    ...terrainHoliday,
    ...domainHoliday
  ]

  const selected = getRandomSubset(combined, { min: 1, max: 3 });
  // adding check to see if adding line breaks is necessary
  if (selected.length > 0) {
    data.holidays = selected.join("\n");
  }

  return data;
}