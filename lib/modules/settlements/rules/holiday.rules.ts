import { getRandomSubset } from "@/lib/util/randomValues";
import { HolidaysByClimate, HolidaysByMagicLevel, HolidaysByTag, HolidaysByTerrain } from "../mappings/holiday.mappings";
import { NormalizedSettlementInput } from "./normalize";

export function applyHolidaysByConditions(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (
    (!data.holidays || data.holidays.trim() === "") &&
    data.climate !== "random" &&
    Array.isArray(data.terrain) &&
    !data.terrain.includes("random") &&
    Array.isArray(data.tags) &&
    !data.tags.includes("random") && 
    data.magic !== "random"
  ) {
    const climateHolidays = data.climate ? HolidaysByClimate[data.climate] || [] : [];
    const terrainHolidays = data.terrain.flatMap((t) => HolidaysByTerrain[t] || []);
    const tagHolidays = data.tags.flatMap((t) => HolidaysByTag[t] || []);
    const magicHolidays = data.magic ? HolidaysByMagicLevel[data.magic] || [] : [];

    const combined = [...climateHolidays, ...terrainHolidays, ...tagHolidays, ...magicHolidays];
    const unique = Array.from(new Set(combined));
    const selected = getRandomSubset(unique, 1, 3);

    if (selected.length > 0) {
      data.holidays = selected.join("\n");
    }
  }

  return data;
}