import { getRandomSubset } from "@/lib/util/randomValues";
import { CommonRacesByTerrain } from "../mappings/race.mappings";
import { NormalizedSettlementInput } from "./normalize";

// Logic for applying common races by terrain

export function applyRacesByTerrain(data: NormalizedSettlementInput): NormalizedSettlementInput {
  if (
    (!data.races || data.races.trim() === "") &&
    Array.isArray(data.terrain) &&
    !data.terrain.includes("random") &&
    data.terrain.length > 0
  ) {
    const allRaces = data.terrain.flatMap((t) => CommonRacesByTerrain[t] || []);
    const uniqueRaces = Array.from(new Set(allRaces));
    const selectedRaces = getRandomSubset(uniqueRaces, 1, 3);
    data.races = selectedRaces.join(", ");
  }

  return data;
}
