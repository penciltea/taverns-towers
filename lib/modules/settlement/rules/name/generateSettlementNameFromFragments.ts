import { filterSettlementByAttributes } from "./filterSettlementByAttributes";
import { groupSettlementFragmentsByType } from "./groupSettlementFragmentsByType";
import { weightedRandom } from "@/lib/util/randomValues";
import { GenerateSettlementNameOptions, SettlementGroupKey } from "@/interfaces/settlement.interface";
import { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";

export function generateSettlementNameFromFragments({
  fragments,
  filters,
  fallbackFormats,
  allowedKeys = ["prefix", "suffix", "connector", "descriptor", "size", "noun", "format"],
}: {
  fragments: GeneratorSettlementFragmentPlain[];
  filters: GenerateSettlementNameOptions;
  fallbackFormats: string[];
  allowedKeys?: string[];
}): string {
  //console.log("=== START GENERATE SETTLEMENT NAME ===");
  //console.log("Filters:", filters);

  // Step 1: Filter fragments by attributes
  const filtered = filterSettlementByAttributes(fragments, filters);
  //console.log("Filtered fragments:", filtered.map(f => ({ type: f.type, value: f.value })));

  // Step 2: Group fragments by type
  const grouped = groupSettlementFragmentsByType(filtered);
  const unfilteredGrouped = groupSettlementFragmentsByType(fragments);
  //console.log("Grouped fragments (filtered):", grouped);
  //console.log("Grouped fragments (unfiltered):", unfilteredGrouped);

  // Step 3: Format validation function
  function canSatisfyFormat(template: string | undefined): boolean {
    if (!template) return false;
    const matches = [...template.matchAll(/\{\{\s*(.*?)\s*\}\}/g)];
    return matches.every(([, key]) => {
      if (!allowedKeys.includes(key)) return false;
      const typedKey = key as SettlementGroupKey;
      const group = grouped[typedKey] ?? unfilteredGrouped[typedKey];
      return Array.isArray(group) && group.length > 0;
    });
  }

  // Step 4: Weighted selection of format
  const formatFragments = fragments.filter(f => f.type === "format");
  //console.log("All format fragments:", formatFragments.map(f => f.value));

  const validFormats = formatFragments.filter(f => canSatisfyFormat(f.value));
  //console.log("Valid formats after filtering:", validFormats.map(f => f.value));

  const selectedFormatFragment = validFormats.length > 0
    ? weightedRandom(validFormats.map(f => ({ ...f, weight: f.weight ?? 1 })))
    : undefined;

  //console.log("Selected format fragment:", selectedFormatFragment?.value);

  const fallbackTemplate = fallbackFormats.find(canSatisfyFormat) || "{{prefix}}{{suffix}}";
  //console.log("Fallback template chosen:", fallbackTemplate);

  const formatTemplate = selectedFormatFragment?.value || fallbackTemplate;
  //console.log("Final format template:", formatTemplate);

  // Step 5: Replacement logic
  const usedFragments: Record<SettlementGroupKey, string[]> = {
    prefix: [],
    suffix: [],
    noun: [],
    descriptor: [],
    connector: [],
    size: [],
    format: []
  };

  const getReplacement = (key: string): string => {
    if (!allowedKeys.includes(key)) return "";

    const typedKey = key as SettlementGroupKey;

    // Step 5: filtered pool first
    let pool: GeneratorSettlementFragmentPlain[] = grouped[typedKey] ?? [];

    // Fallback: if no filtered fragments, try unfiltered (universal)
    if (pool.length === 0) {
      pool = unfilteredGrouped[typedKey] ?? [];
    }
    const used = usedFragments[typedKey] ?? (usedFragments[typedKey] = []);
    const remaining = pool.filter(f => !used.includes(f.value));
    const selectionPool = remaining.length > 0 ? remaining : pool;

    //console.log(`Replacement pool for '${key}':`, selectionPool.map(f => f.value));

    const selected = weightedRandom(selectionPool);
    if (!selected) return "";

    used.push(selected.value);
    //console.log(`Selected '${key}':`, selected.value);
    return selected.value;
  };

  // Step 6: Replace placeholders in the format
  const result = formatTemplate.replace(/\{\{\s*(\w+)(\|[a-z]+)?\s*\}\}/g, (_: string, rawKey: string, modifier?: string) => {
    const replacement = getReplacement(rawKey);

    if (!replacement) return "";

    switch (modifier) {
      case "|lower":
        return replacement.toLowerCase();
      case "|upper":
        return replacement.toUpperCase();
      case "|capitalize":
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      default:
        return replacement;
    }
  });
  //console.log("=== GENERATED SETTLEMENT NAME ===", result);

  return result;
}