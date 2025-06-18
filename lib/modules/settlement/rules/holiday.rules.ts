import { getRandomSubset } from "@/lib/util/randomValues";
import { HolidaysByClimateMapping, HolidaysByDomainMapping, HolidaysByMagicLevelMapping, HolidaysByTagMapping, HolidaysByTerrainMapping } from "../mappings/holiday.mappings";
import { HolidaysByClimate, HolidaysByClimateModel } from "@/lib/models/generator/settlement/holidayByClimate.model";
import { HolidaysByDomain, HolidaysByDomainModel } from "@/lib/models/generator/settlement/holidayByDomain.model";
import { HolidaysByMagic, HolidaysByMagicModel } from "@/lib/models/generator/settlement/holidayByMagic.model";
import { HolidaysByTag, HolidaysByTagModel } from "@/lib/models/generator/settlement/holidayByTags.model";
import { HolidaysByTerrain, HolidaysByTerrainModel } from "@/lib/models/generator/settlement/holidayByTerrain.model";
import { NormalizedSettlementInput } from "./normalize";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";

export async function applyHolidaysByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = (!data.holidays || data.holidays === "");
  if(!shouldGenerate) return data;

  const climate = data.climate;
  const magic = data.magic;
  const tags = data.tags ?? [];
  const terrain = data.terrain ?? [];
  const domains = data.domains ?? [];
  
  // DB calls for populating arrays
  const results = await Promise.allSettled([
    climate ? HolidaysByClimate.findOne({ climate: data.climate }).lean<HolidaysByClimateModel | null>() : Promise.resolve(null),
    magic ? HolidaysByMagic.findOne({ magic: data.magic }).lean<HolidaysByMagicModel | null>() : Promise.resolve(null),
    HolidaysByTag.find({ tags: { $in: data.tags } }).lean<HolidaysByTagModel[]>(),
    HolidaysByTerrain.find({ terrain: { $in: data.terrain } }).lean<HolidaysByTerrainModel[]>(),
    HolidaysByDomain.find({ domains: { $in: data.domains } }).lean<HolidaysByDomainModel[]>(),
  ]);

  const climateHoliday = extractArrayFromResult(
    results[0],
    (val) => val.holidays,
    climate ? HolidaysByClimateMapping[climate] ?? [] : []
  );

  const magicHoliday = extractArrayFromResult(
    results[1],
    (val) => val.holidays,
    magic ? HolidaysByMagicLevelMapping[magic] ?? [] : []
  );

  const tagHoliday = extractArrayFromResult(
    results[2],
    (val) => val.holidays,
    tags.flatMap((tag) => HolidaysByTagMapping[tag] ?? [])
  );

  const terrainHoliday = extractArrayFromResult(
    results[3],
    (val) => val.holidays,
    terrain.flatMap((terrain) => HolidaysByTerrainMapping[terrain] ?? [])
  );

  const domainHoliday = extractArrayFromResult(
    results[4],
    (val) => val.holidays,
    domains.flatMap((domain) => HolidaysByDomainMapping[domain] ?? [])
  );

  const combined = [
    ...climateHoliday,
    ...magicHoliday,
    ...tagHoliday,
    ...terrainHoliday,
    ...domainHoliday
  ]

  const selected = getRandomSubset(combined, 1, 3);
  // adding check to see if adding line breaks is necessary
  if (selected.length > 0) {
    data.holidays = selected.join("\n");
  }

  return data;
}