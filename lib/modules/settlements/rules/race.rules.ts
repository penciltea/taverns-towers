import { RacesByTerrain } from "@/lib/models/generatorRacesByTerrain.model";
import { getRandomSubset } from "@/lib/util/randomValues";
import { NormalizedSettlementInput } from "./normalize";
import { CommonRacesByTerrain } from "../mappings/race.mappings";

export async function applyRacesByTerrain(
  data: NormalizedSettlementInput
): Promise<NormalizedSettlementInput> {
  try {
    if (
      (!data.races || data.races.trim() === "") &&
      Array.isArray(data.terrain) &&
      !data.terrain.includes("random") &&
      data.terrain.length > 0
    ) {
      const results = await RacesByTerrain.find({
        terrain: { $in: data.terrain },
      }).lean();

      const allRaces = results.flatMap((entry: { races: any; }) => entry.races ?? []);
      const uniqueRaces = Array.from(new Set(allRaces));

      if (uniqueRaces.includes("All Races")) {
        data.races = "All Races";
        return data;
      }

      if (uniqueRaces.length > 0) {
        const selectedRaces = getRandomSubset(uniqueRaces, 1, 3);
        data.races = selectedRaces.join(", ");
        return data;
      }
    }
  } catch (err) {
    console.warn("applyRacesByTerrain failed, using local fallback:", err);
  }

  // Fallback logic
  const fallbackRaces = data.terrain.flatMap(
    (t) => CommonRacesByTerrain[t] ?? []
  );
  const uniqueFallback = Array.from(new Set(fallbackRaces));

  if (uniqueFallback.includes("All Races")) {
    data.races = "All Races";
  } else {
    const selectedFallback = getRandomSubset(uniqueFallback, 1, 3);
    data.races = selectedFallback.join(", ");
  }
  return data;
}