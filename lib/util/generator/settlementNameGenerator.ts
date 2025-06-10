import { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";

export interface SettlementFragment {
  type: 'prefix' | 'suffix';
  value: string;
  terrain?: string[];
  tags?: string[];
  climate?: string[];
  weight?: number;
}

function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): string {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : "";
}

function filterByMatch(fragments: SettlementFragment[], keys: string[], field: 'terrain' | 'tags') {
  return fragments.filter(f =>
    f[field] && f[field]!.some((val) => keys.includes(val))
  );
}

export function generateSettlementNameFromFragments(
  fragments: GeneratorSettlementFragmentPlain[],
  options: { climate: string; terrain: string[]; tags: string[] }
): string {
  const prefixes = fragments.filter(f => f.type === "prefix");
  const suffixes = fragments.filter(f => f.type === "suffix");

  const terrainPrefixMatches = filterByMatch(prefixes, options.terrain, "terrain");
  const tagSuffixMatches = filterByMatch(suffixes, options.tags, "tags");

  const prefix = weightedRandom(terrainPrefixMatches.length > 0 ? terrainPrefixMatches : prefixes) || "New";
  const suffix = weightedRandom(tagSuffixMatches.length > 0 ? tagSuffixMatches : suffixes) || "Haven";

  return `${prefix}${suffix}`;
}
