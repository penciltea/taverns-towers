import { getRandomSubset } from "@/lib/util/randomValues";
import { HolidaysByClimateMapping, HolidaysByDomainMapping, HolidaysByMagicLevelMapping, HolidaysByTagMapping, HolidaysByTerrainMapping } from "../mappings/holiday.mappings";
import { HolidaysByClimate } from "@/lib/models/generator/settlement/holidayByClimate.model";
import { HolidaysByDomain } from "@/lib/models/generator/settlement/holidayByDomain.model";
import { HolidaysByMagic } from "@/lib/models/generator/settlement/holidayByMagic.model";
import { HolidaysByTag } from "@/lib/models/generator/settlement/holidayByTags.model";
import { HolidaysByTerrain } from "@/lib/models/generator/settlement/holidayByTerrain.model";
import { NormalizedSettlementInput } from "./normalize";

export async function applyHolidaysByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    if(data.holidays !== "" &&
      data.climate && data.climate !== "randoom" && 
      data.tags && !data.tags.includes("random") &&
      data.terrain && !data.terrain.includes("random") && 
      data.domains && !data.domains.includes("random") && 
      data.magic && data.magic !== "random"
    ) {
      const [ climateEntry, magicEntry, tagEntries, terrainEntries, domainEntries ] = await Promise.all([
        HolidaysByClimate.findOne({ climate: data.climate }).lean(),
        HolidaysByMagic.findOne({ magic: data.magic }).lean(),
        HolidaysByTag.find({ tags: { $in: data.tags }}).lean(),
        HolidaysByTerrain.find({ terrain: { $in: data.terrain }}).lean(),
        HolidaysByDomain.find({ domains: { $in: data.domains }}).lean()
      ]);

      const climateHolidays = climateEntry?.holidays ?? [];
      const magicHolidays = magicEntry?.holidays ?? [];
      const domainHolidays = domainEntries?.flatMap(entry => entry.holidays) ?? [];
      const tagHolidays = tagEntries?.flatMap(entry => entry.holidays) ?? [];
      const terrainHolidays = terrainEntries?.flatMap(entry => entry.holidays) ?? [];

      const allHolidays = [
        ...climateHolidays,
        ...magicHolidays,
        ...domainHolidays,
        ...tagHolidays,
        ...terrainHolidays
      ];

      const unique = Array.from(new Set(allHolidays));
      const selected = getRandomSubset(unique, 1, 3);

      if (selected.length > 0) {
        data.holidays = selected.join("\n");
      }
    }
  } catch (err) {
    console.warn("applyHolidaysByConditions failed, using local fallback:", err);

      const fallbackClimateHolidays = HolidaysByClimateMapping[data.climate] ?? [];
      const fallbackMagicHolidays = HolidaysByMagicLevelMapping[data.magic] ?? [];
      const fallbackDomainHolidays = data.domains.flatMap(domain => HolidaysByDomainMapping[domain]) ?? [];
      const fallbackTagHolidays = data.tags.flatMap(tag => HolidaysByTagMapping[tag]) ?? [];
      const fallbackTerrainHolidays = data.terrain.flatMap(terrain => HolidaysByTerrainMapping[terrain]) ?? [];

      const fallbackHolidays = [
        ...fallbackClimateHolidays,
        ...fallbackMagicHolidays,
        ...fallbackDomainHolidays,
        ...fallbackTagHolidays,
        ...fallbackTerrainHolidays
      ];

      const unique = Array.from(new Set(fallbackHolidays));
      const selected = getRandomSubset(unique, 1, 3);

      if (selected.length > 0) {
        data.holidays = selected.join("\n");
      }
  }

  return data;
}