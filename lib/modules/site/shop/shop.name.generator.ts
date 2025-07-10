import { SiteNameGenerator, GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { weightedRandom } from "@/lib/util/randomValues";
import { filterByAttributes } from "../name/filterByAttributes";
import { groupFragmentsByType } from "../name/groupFragmentsByType";
import { filterBySubType } from "../name/filterBySubtype";

export const shopNameGenerator: SiteNameGenerator = {
  generateName(fragments: GeneratorSiteFragmentPlain[], filters: GenerateSiteNameOptions): string {
    // Step 1: Common filters (siteType, tags, terrain, etc)
    console.log("filters: ", filters);
    console.log("filters.data: ", filters.data);
    let filtered = filterByAttributes(fragments, filters);

    // Step 2: Apply `shopType` filtering via helper (handles data fallback)
    const shopTypes =
        filters.shopType ??
        (filters.data?.type === "shop" && Array.isArray(filters.data.shopType)
            ? filters.data.shopType
            : undefined);
    filtered = filterBySubType(filtered, "shopType", shopTypes);

    // Step 3: Group for selection
    const grouped = groupFragmentsByType(filtered);

    // Step 4: Pick a format template (fragment or fallback)
    const fallbackFormats = [
      "The {{prefix}} {{noun}}",
      "{{person}}'s {{shopType}}",
      "The {{shopType}} of {{prefix}}"
    ];

    const formatFragment = weightedRandom(grouped.format);
    const fallbackFormatFragment = weightedRandom(
      fallbackFormats.map(fmt => ({ value: fmt, weight: 1 }))
    );
    const formatTemplate = formatFragment?.value || fallbackFormatFragment?.value || "The {{shopType}}";

    // Step 5: Fill in placeholders
    const usedFragments: Record<string, string[]> = {
      noun: [],
      suffix: [],
      prefix: [],
      person: [],
    };

    const getReplacement = (key: string): string => {
      switch (key) {
        case "shopType":
          return shopTypes?.[0] ?? "";

        case "prefix":
        case "suffix":
        case "noun":
        case "person": {
          const pool = grouped[key] ?? [];
          const used = usedFragments[key];
          const remaining = pool.filter(f => !used.includes(f.value));
          const selectionPool = remaining.length > 0 ? remaining : pool;

          const selected = weightedRandom(selectionPool);
          if (!selected) return "";
          used.push(selected.value);
          return selected.value;
        }

        default:
          return key;
      }
    };

    return formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_: string, key: string) => getReplacement(key));
  }
};