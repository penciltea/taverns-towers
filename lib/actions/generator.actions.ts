'use server'

import connectToDatabase from "@/lib/db/connect";
import GeneratorFragment, { GeneratorFragmentPlain } from "@/lib/models/generatorFragment.model";

interface Fragment {
  type: 'prefix' | 'suffix';
  value: string;
  terrain?: string[];
  tags?: string[];
  climate?: string[];
  weight?: number;
}

interface GenerateNameOptions {
  terrain: string[];
  tags: string[];
}

function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): string {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : ""; // fallback handled outside
}

function filterByMatch(fragments: Fragment[], keys: string[], field: 'terrain' | 'tags') {
  return fragments.filter(f =>
    f[field] && f[field]!.some((val) => keys.includes(val))
  );
}

export async function generateSettlementName({
  terrain,
  tags,
}: GenerateNameOptions): Promise<string> {
  await connectToDatabase();

  const fragments = await GeneratorFragment.find().lean() as unknown as GeneratorFragmentPlain[];

  const prefixes = fragments.filter(f => f.type === "prefix");
  const suffixes = fragments.filter(f => f.type === "suffix");

  // Prefer matches to terrain or tags; fallback to full list
  const terrainPrefixMatches = filterByMatch(prefixes, terrain, "terrain");
  const tagSuffixMatches = filterByMatch(suffixes, tags, "tags");

  const prefix = weightedRandom(terrainPrefixMatches.length > 0 ? terrainPrefixMatches : prefixes) || "New";
  const suffix = weightedRandom(tagSuffixMatches.length > 0 ? tagSuffixMatches : suffixes) || "Haven";

  return `${prefix}${suffix}`;
}
