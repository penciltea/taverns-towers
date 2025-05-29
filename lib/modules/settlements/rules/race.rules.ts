import { connectToDatabase } from "@/lib/db/connect";
import RacesByTerrain from "@/lib/models/generatorRacesByTerrain.model";
import { getRandomSubset } from "@/lib/util/randomValues";
import { NormalizedSettlementInput } from "./normalize";

export async function applyRacesByTerrain(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  if (
    (!data.races || data.races.trim() === "") &&
    Array.isArray(data.terrain) &&
    !data.terrain.includes("random") &&
    data.terrain.length > 0
  ) {
    await connectToDatabase();

    const results = await RacesByTerrain.find({ terrain: { $in: data.terrain } }).lean();
    const allRaces = results.flatMap((entry) => entry.races ?? []);
    const uniqueRaces = Array.from(new Set(allRaces));
    const selectedRaces = getRandomSubset(uniqueRaces, 1, 3);
    data.races = selectedRaces.join(", ");
  }

  return data;
}
