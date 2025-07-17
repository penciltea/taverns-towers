import { GenerateSiteNameOptions, GroupKey } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { filterByAttributes } from "./filterByAttributes";
import { groupFragmentsByType } from "./groupFragmentsByType";
import { weightedRandom } from "@/lib/util/randomValues";
import { filterBySubType } from "./filterBySubtype";

export function generateSiteNameFromFragments({
  fragments,
  filters,
  subtypeKey,
  getSubtypeValues,
  fallbackFormats,
  allowedKeys = ["prefix", "suffix", "noun", "person", "siteTypeName", "fullName"],
}: {
  fragments: GeneratorSiteFragmentPlain[];
  filters: GenerateSiteNameOptions;
  subtypeKey?: keyof GeneratorSiteFragmentPlain;
  getSubtypeValues?: (filters: GenerateSiteNameOptions) => string[] | undefined;
  fallbackFormats: string[];
  allowedKeys?: string[];
}): string {
  // Step 1: Filter by basic attributes
  let filtered = filterByAttributes(fragments, filters);

  // Step 2: Subtype filtering
  if (subtypeKey && getSubtypeValues) {
    const values = getSubtypeValues(filters);
    filtered = filterBySubType(filtered, subtypeKey, values);
  }

  // Step 3: Group fragments
  const grouped = groupFragmentsByType(filtered);
  const unfilteredGrouped = groupFragmentsByType(fragments);

  // Step 4: Validate format templates
  function canSatisfyFormat(template: string | undefined): boolean {
    if (!template) return false;
    const matches = [...template.matchAll(/\{\{\s*(.*?)\s*\}\}/g)];
    return matches.every(([, key]) => {
      if (!allowedKeys.includes(key)) return false;
      const typedKey = key as GroupKey;
      const group = grouped[typedKey] ?? unfilteredGrouped[typedKey];
      return Array.isArray(group) && group.length > 0;
    });
  }

  // Try formatFragment first, then fallbacks
  const formatCandidates = [grouped.format?.length ? weightedRandom(grouped.format)?.value : undefined, ...fallbackFormats];
  const formatTemplate = formatCandidates.find(canSatisfyFormat) || "The {{prefix}} {{noun}}";

  // Step 5: Replacement logic
  const usedFragments: Record<GroupKey, string[]> = {
    prefix: [],
    suffix: [],
    noun: [],
    person: [],
    siteTypeName: [],
    fullName: [],
    format: [],
  };

  const getReplacement = (key: string): string => {
    if (!allowedKeys.includes(key)) return "";

    const typedKey = key as GroupKey;
    // Try filtered pool first
    let pool = grouped[typedKey] ?? [];

    // Fallback: if no filtered fragments, try unfiltered (universal)
    if (pool.length === 0) {
      pool = unfilteredGrouped[typedKey] ?? [];
    }
    const used = usedFragments[typedKey] ?? (usedFragments[typedKey] = []);
    const remaining = pool.filter(f => !used.includes(f.value));
    const selectionPool = remaining.length > 0 ? remaining : pool;

    const selected = weightedRandom(selectionPool);
    if (!selected) return "";

    used.push(selected.value);
    return selected.value;
  };
  

  return formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_: string, key: string) => getReplacement(key));
}