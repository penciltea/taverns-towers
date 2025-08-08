import { GenerateNpcNameOptions } from "@/interfaces/npc.interface";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";

export function filterByAttributes(
  fragments: GeneratorNpcFragmentPlain[],
  filters: GenerateNpcNameOptions
): GeneratorNpcFragmentPlain[] {
  const { race = [] } = filters;

  return fragments.filter(f => {
    // Basic universal filters

    // Normalize input race filter
    const normalizedRaces = Array.isArray(race)
      ? (race as string[]).map(r => r.toLowerCase())
      : race
      ? [race.toLowerCase()]
      : [];

    // Normalize fragment.race
    const fragmentRaces = Array.isArray(f.race)
      ? f.race.map(r => r.toLowerCase())
      : f.race
      ? [f.race]
      : [];

    // Allow fragment if:
    // - no filter is passed in
    // - or the fragment is "universal" (has no race defined)
    // - or there's an intersection
    const matchesRace =
      normalizedRaces.length === 0 ||
      fragmentRaces.length === 0 ||
      fragmentRaces.some(race => normalizedRaces.includes(race));

    if (!matchesRace) return false;

    console.log("Filtering fragment", f.value, {
      fragmentRaces,
      normalizedRaces,
    });

    return true;
  });
}