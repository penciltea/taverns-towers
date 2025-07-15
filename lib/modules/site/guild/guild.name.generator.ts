import { SiteNameGenerator, GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { weightedRandom } from "@/lib/util/randomValues";
import { filterByAttributes } from "../name/filterByAttributes";
import { groupFragmentsByType } from "../name/groupFragmentsByType";
import { filterBySubType } from "../name/filterBySubtype";
import { toTitleCase } from "@/lib/util/stringFormats";

export const guildNameGenerator: SiteNameGenerator = {
  generateName(fragments: GeneratorSiteFragmentPlain[], filters: GenerateSiteNameOptions): string {
    console.log("filters: ", filters);
    // console.log("filters.data: ", filters.data);


    // Step 1: Common filters (siteType, tags, terrain, etc)
    let filtered = filterByAttributes(fragments, filters);

    // Step 2: Apply `guildType` filtering via helper (handles data fallback)
    const guildTypes =
        filters.guildType ??
        (filters.data?.type === "guild" && Array.isArray(filters.data.guildType)
            ? filters.data.guildType
            : undefined);
    filtered = filterBySubType(filtered, "guildType", guildTypes);

    // Step 3: Group for selection
    const grouped = groupFragmentsByType(filtered);

    // Step 4: Pick a format template (fragment or fallback)
    const fallbackFormats = [
      "The {{prefix}} {{noun}}",
      "The {{guildHallName}}"
    ];

    const formatFragment = weightedRandom(grouped.format);
    const fallbackFormatFragment = weightedRandom(
      fallbackFormats.map(fmt => ({ value: fmt, weight: 1 }))
    );
    const formatTemplate = formatFragment?.value || fallbackFormatFragment?.value || "The {{guildHallName}}";

    // Step 5: Fill in placeholders
    const usedFragments: Record<string, string[]> = {
      noun: [],
      suffix: [],
      prefix: [],
    };

    const getReplacement = (key: string): string => {
      switch (key) {
        case "guildHallName": {
            const pool = grouped.guildHallName ?? [];
            if (pool.length > 0) {
                const selected = weightedRandom(pool);
                return selected?.value ?? "";
            }

            // fallback: convert raw guildType to Title Case
            const fallback = guildTypes?.[0];
            return fallback ? toTitleCase(fallback) : "";
        }

        case "prefix":
        case "suffix":
        case "noun": {
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

    // console.log("Fragments grouped:", {
    //   format: grouped.format,
    //   prefix: grouped.prefix,
    //   suffix: grouped.suffix,
    // });

    return formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_: string, key: string) => getReplacement(key));
  }
};