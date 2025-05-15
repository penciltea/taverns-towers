import { GeneratorSightFragmentPlain } from "@/lib/models/generatorSightFragment.model";

interface GenerateSightNameOptions {
  category?: string;
  tags?: string[];
  terrain?: string[];
  climate?: string;
  sightType?: string;
}

function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): string {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : "";
}

function filterByAttributes(
  fragments: GeneratorSightFragmentPlain[],
  filters: GenerateSightNameOptions
): GeneratorSightFragmentPlain[] {
  const { category, tags = [], terrain = [], climate, sightType } = filters;

  return fragments.filter(f => {
    const categoryMatch = category ? f.categories?.includes(category) : true;
    const sightTypeMatch = sightType ? f.sightTypes?.includes(sightType) : true;
    const tagMatch = tags.length > 0 ? f.tags?.some(tag => tags.includes(tag)) : true;
    const terrainMatch = terrain.length > 0 ? f.terrains?.some(t => terrain.includes(t)) : true;
    const climateMatch = climate ? f.climates?.includes(climate) : true;

    return categoryMatch && sightTypeMatch && tagMatch && terrainMatch && climateMatch;
  });
}

export function generateSightNameFromFragments(
  fragments: GeneratorSightFragmentPlain[],
  filters: GenerateSightNameOptions
): string {
  const prefixes = fragments.filter(f => f.type === "prefix");
  const suffixes = fragments.filter(f => f.type === "suffix");

  const filteredPrefixes = filterByAttributes(prefixes, filters);
  const filteredSuffixes = filterByAttributes(suffixes, filters);

  const prefix = weightedRandom(filteredPrefixes.length > 0 ? filteredPrefixes : prefixes) || "Old";
  const suffix = weightedRandom(filteredSuffixes.length > 0 ? filteredSuffixes : suffixes) || "Place";

  return `${prefix} ${suffix}`;
}
