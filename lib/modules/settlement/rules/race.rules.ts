import { getRandomSubset } from "@/lib/util/randomValues";
import { CommonRacesByTerrainMapping, RacesByMagicMapping, RacesByTagMapping, RacesByWealthMapping, RacesByClimateMapping, raceCountBySize } from "../mappings/race.mappings";
import { RacesByTerrain, RacesByTerrainModel } from "@/lib/models/generator/settlement/racesByTerrain.model";
import { RacesByTag, RacesByTagModel } from "@/lib/models/generator/settlement/racesByTag.model";
import { RacesByMagic, RacesByMagicModel } from "@/lib/models/generator/settlement/racesByMagic.model";
import { RacesByWealth, RacesByWealthModel } from "@/lib/models/generator/settlement/racesByWealth.model";
import { RacesByClimate, RacesByClimateModel } from "@/lib/models/generator/settlement/racesByClimate.model";
import { NormalizedSettlementInput } from "./normalize";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";


export async function applyRacesByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = !data.races || data.races.trim() === "" || data.races === "random";
  if (!shouldGenerate) return data; // If race field is already filled in, just return data

  // fields that are used as factors for race generation
  const terrain = data.terrain ?? [];
  const tags = data.tags ?? [];
  const magic = data.magic;
  const wealth = data.wealth;
  const climate = data.climate;

  // DB calls for populating arrays
  const results = await Promise.allSettled([
    RacesByTerrain.find({ terrain: { $in: terrain } }).lean<RacesByTerrainModel[]>(),
    RacesByTag.find({ tag: { $in: tags } }).lean<RacesByTagModel[]>(),
    magic ? RacesByMagic.findOne({ magic }).lean<RacesByMagicModel | null>() : Promise.resolve(null),
    wealth ? RacesByWealth.findOne({ wealth }).lean<RacesByWealthModel | null>() : Promise.resolve(null),
    climate ? RacesByClimate.findOne({ climate }).lean<RacesByClimateModel | null>() : Promise.resolve(null),
  ]);

  const terrainRaces = extractArrayFromResult(
    results[0],
    (val) => val.races,
    terrain.flatMap((terrain) => CommonRacesByTerrainMapping[terrain] ?? [])
  );

  const tagRaces = extractArrayFromResult(
    results[1],
    (val) => val.races,
    tags.flatMap((tag) => RacesByTagMapping[tag] ?? [])
  );

  const magicRaces = extractArrayFromResult(
    results[2],
    (val) => val.races,
    magic ? RacesByMagicMapping[magic] ?? [] : []
  );

  const wealthRaces = extractArrayFromResult(
    results[3],
    (val) => val.races,
    wealth ? RacesByWealthMapping[wealth] ?? [] : []
  );

  const climateRaces = extractArrayFromResult(
    results[4],
    (val) => val.races,
    climate ? RacesByClimateMapping[climate] ?? [] : []
  );
  
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
  data.races = getRandomSubset(unique, min, max).join(", ");

  return data;
}