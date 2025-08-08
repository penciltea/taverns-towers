import { GenerateNpcNameOptions, NpcGroupKey } from "@/interfaces/npc.interface";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { filterByAttributes } from "./filterByAttributes";
import { groupNpcFragmentsByType } from "./groupNpcFragmentsByType";
import { getRandom, weightedRandom } from "@/lib/util/randomValues";

export function generateNpcNameFromFragments({
    fragments,
    filters,
    fallbackFormats,
    allowedKeys = ["prefix", "suffix", "first", "last", "fullName"],
}: {
    fragments: GeneratorNpcFragmentPlain[];
    filters: GenerateNpcNameOptions;
    fallbackFormats: string[];
    allowedKeys?: string[];
}): string {
    // Step 1: Filter by basic attributes
    let filtered = filterByAttributes(fragments, filters);

    // Step 2: Group fragments
    const grouped = groupNpcFragmentsByType(filtered);
    const unfilteredGrouped = groupNpcFragmentsByType(fragments);

    // Step 3: Validate format templates
    function canSatisfyFormat(template: string | undefined): boolean {
        if (!template) return false;
        const matches = [...template.matchAll(/\{\{\s*(.*?)\s*\}\}/g)];
        return matches.every(([, key]) => {
        if (!allowedKeys.includes(key)) return false;
        const typedKey = key as NpcGroupKey;
        const group = grouped[typedKey] ?? unfilteredGrouped[typedKey];
        return Array.isArray(group) && group.length > 0;
        });
  }

    // Try formatFragment first, then fallbacks
    const formatCandidates = [
        ...(grouped.format ?? []).map(f => f.value),
        ...fallbackFormats,
    ];

    const validFormats = formatCandidates.filter(canSatisfyFormat);
    const formatTemplate = getRandom(validFormats) || "{{first}} {{last}}";

    // Step 4: Replacement logic
    const usedFragments: Record<NpcGroupKey, string[]> = {
        prefix: [],
        suffix: [],
        first: [],
        last: [],
        fullName: [],
        format: [],
    };

    const getReplacement = (key: string): string => {
        if (!allowedKeys.includes(key)) {
            console.warn(`Unknown fragment key: ${key}`);
            return "";
        }

        const typedKey = key as NpcGroupKey;
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