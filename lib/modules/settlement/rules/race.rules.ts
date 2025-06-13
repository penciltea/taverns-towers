import { getRandomSubset } from "@/lib/util/randomValues";
import { CommonRacesByTerrainMapping, RacesByMagicMapping, RacesByTagMapping, RacesByWealthMapping, RacesByClimateMapping, raceCountBySize } from "../mappings/race.mappings";
import { RacesByTerrain } from "@/lib/models/generator/settlement/racesByTerrain.model";
import { RacesByTag } from "@/lib/models/generator/settlement/racesByTag.model";
import { RacesByMagic } from "@/lib/models/generator/settlement/racesByMagic.model";
import { RacesByWealth } from "@/lib/models/generator/settlement/racesByWealth.model";
import { RacesByClimate } from "@/lib/models/generator/settlement/racesByClimate.model";
import { NormalizedSettlementInput } from "./normalize";


export async function applyRacesByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    const shouldGenerate = !data.races || data.races.trim() === "" || data.races === "random";

    if (!shouldGenerate) return data;

    const terrain = data.terrain ?? [];
    const tags = data.tags ?? [];
    const magic = data.magic;
    const wealth = data.wealth;
    const climate = data.climate;

    const [
      terrainResult,
      tagResult,
      magicResult,
      wealthResult,
      climateResult
    ] = await Promise.allSettled([
      RacesByTerrain.find({ terrain: { $in: terrain } }).lean(),
      RacesByTag.find({ tag: { $in: tags } }).lean(),
      magic ? RacesByMagic.findOne({ magic }).lean() : Promise.resolve(null),
      wealth ? RacesByWealth.findOne({ wealth }).lean() : Promise.resolve(null),
      climate ? RacesByClimate.findOne({ climate }).lean() : Promise.resolve(null),
    ]);

    const baseRaces = terrainResult.status === "fulfilled" ? terrainResult.value.flatMap(r => r.races ?? []) : [];
    const tagRaces = tagResult.status === "fulfilled" ? tagResult.value.flatMap(r => r.races ?? []) : [];
    const magicRaces = magicResult.status === "fulfilled" && magicResult.value ? magicResult.value.races ?? [] : [];
    const wealthRaces = wealthResult.status === "fulfilled" && wealthResult.value ? wealthResult.value.races ?? [] : [];
    const climateRaces = climateResult.status === "fulfilled" && climateResult.value ? climateResult.value.races ?? [] : [];

    const combined = [...baseRaces, ...tagRaces, ...magicRaces, ...wealthRaces, ...climateRaces];
    const unique = Array.from(new Set(combined));

    if (unique.includes("All Races")) {
      data.races = "All Races";
      return data;
    }

    const [min, max] = raceCountBySize[data.size ?? "Town"] ?? [2, 4];
    data.races = getRandomSubset(unique, min, max).join(", ");

  } catch (err) {
    console.warn("applyRacesByConditions failed, using fallback mappings:", err);

    const terrain = data.terrain ?? [];
    const tags = data.tags ?? [];
    const magic = data.magic;
    const wealth = data.wealth;
    const climate = data.climate;

    const fallbackBase = terrain.flatMap(t => CommonRacesByTerrainMapping[t] ?? []);
    const fallbackTag = tags.flatMap(t => RacesByTagMapping[t] ?? []);
    const fallbackMagic = magic ? RacesByMagicMapping[magic] ?? [] : [];
    const fallbackWealth = wealth ? RacesByWealthMapping[wealth] ?? [] : [];
    const fallbackClimate = climate ? RacesByClimateMapping[climate] ?? [] : [];

    const combinedFallback = [...fallbackBase, ...fallbackTag, ...fallbackMagic, ...fallbackWealth, ...fallbackClimate];
    const uniqueFallback = Array.from(new Set(combinedFallback));

    if (uniqueFallback.includes("All Races")) {
      data.races = "All Races";
    } else {
      const [min, max] = raceCountBySize[data.size ?? "Town"] ?? [2, 4];
      data.races = getRandomSubset(uniqueFallback, min, max).join(", ");
    }
  }

  return data;
}