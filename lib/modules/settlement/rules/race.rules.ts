import { getRandomSubset } from "@/lib/util/randomValues";
import { CommonRacesByTerrainMapping, RacesByMagicMapping, RacesByTagMapping, RacesByWealthMapping, RacesByClimateMapping, raceCountBySize } from "../mappings/race.mappings";
import { NormalizedSettlementInput } from "./normalize";


export function applyRacesByConditions(data: NormalizedSettlementInput) {
  const shouldGenerate = !data.races || data.races.trim() === "" || data.races === "random";
  if (!shouldGenerate) return data; // If race field is already filled in, just return data

  // fields that are used as factors for race generation
  const terrain = data.terrain ?? [];
  const tags = data.tags ?? [];
  const magic = data.magic;
  const wealth = data.wealth;
  const climate = data.climate;

  const terrainRaces = terrain.flatMap((terrain) => CommonRacesByTerrainMapping[terrain] ?? []);
  const tagRaces = tags.flatMap((tag) => RacesByTagMapping[tag] ?? []);
  const magicRaces = magic ? RacesByMagicMapping[magic] ?? [] : [];
  const wealthRaces = wealth ? RacesByWealthMapping[wealth] ?? [] : [];
  const climateRaces = climate ? RacesByClimateMapping[climate] ?? [] : [];
  
  const combined = [
    ...terrainRaces,
    ...tagRaces,
    ...magicRaces,
    ...wealthRaces,
    ...climateRaces
  ];

  const unique = Array.from(new Set(combined));

  // If "All races" is chosen, exclude other options from array
  if (unique.includes("All Races")) {
    data.races = "All Races";
    return data;
  }

  const [min, max] = raceCountBySize[data.size ?? "Town"] ?? [2, 4];  // Choosing number of races to present based on settlement size, with "town" as the fallback
  data.races = getRandomSubset(unique, { min, max }).join(", ");

  return data;
}