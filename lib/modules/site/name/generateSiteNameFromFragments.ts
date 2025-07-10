import { GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { filterByAttributes } from "./filterByAttributes";
import { groupFragmentsByType } from "./groupFragmentsByType";
import { weightedRandom } from "@/lib/util/randomValues";

export function generateSiteNameFromFragments(
  fragments: GeneratorSiteFragmentPlain[],
  filters: GenerateSiteNameOptions
): string {
  const filtered = filterByAttributes(fragments, filters);
  const grouped = groupFragmentsByType(filtered);
  const suffixOrNounFragments = [...grouped.suffix, ...grouped.noun];

  const formatFragment = weightedRandom(grouped.format);
  const formatTemplate = formatFragment?.value ?? "{{prefix}} {{suffix}}";

  const randomCache: Record<string, string[]> = {
    noun: [],
    suffix: [],
  };

  const getReplacement = (key: string, filters: GenerateSiteNameOptions): string => {
    const options = key.split("|").map(k => k.trim());

    for (const opt of options) {
      switch (opt) {
        case "noun":
        case "suffix": {
          const pool = suffixOrNounFragments;
          if (pool.length === 0) break;

          const used = randomCache[opt] ?? (randomCache[opt] = []);
          const remaining = pool.filter(f => !used.includes(f.value));
          const selectionPool = remaining.length > 0 ? remaining : pool;

          const selected = weightedRandom(selectionPool);
          if (!selected) return "";
          used.push(selected.value);
          return selected.value;
        }

        case "prefix": {
          const selected = weightedRandom(grouped.prefix);
          return selected?.value ?? "";
        }

        case "person": {
          const selected = weightedRandom(grouped.person);
          return selected?.value ?? "";
        }

        default:
          break;
      }
    }

    return options[0] || "";
  };

  const name = formatTemplate.replace(
      /\{\{\s*(.*?)\s*\}\}/g,
      (_: string, key: string): string => getReplacement(key, filters)
  );

  console.log("Fragments grouped:", {
    format: grouped.format,
    prefix: grouped.prefix,
    suffix: grouped.suffix,
  });

  return name;
}