import { GeneratorSiteFragmentPlain } from "@/lib/models/generatorSiteFragment.model";

interface GenerateSiteNameOptions {
  category?: string;
  tags?: string[];
  terrain?: string[];
  climate?: string;
  siteType?: string[];
  shopType?: string;
}

function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): string {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : "";
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function filterByAttributes(
  fragments: GeneratorSiteFragmentPlain[],
  filters: GenerateSiteNameOptions
): GeneratorSiteFragmentPlain[] {
  const { category, tags = [], terrain = [], climate, siteType = [], shopType } = filters;

  return fragments.filter(f => {
    // Exclude shopType fragments if siteType doesn't include "shop"
    if (f.type === "shopType" && !siteType.includes("shop")) {
      return false;
    }

    // Format fragments have special rules
    if (f.type === "format") {
      const hasShopTypePlaceholder = f.value.includes("{{shopType}}");
      const hasPersonShopTypePlaceholder = f.value.includes("{{person}}'s {{shopType}}");

      // Only allow these formats if siteType includes "shop" and shopType is defined
      if ((hasShopTypePlaceholder || hasPersonShopTypePlaceholder) && (!siteType.includes("shop") || !shopType)) {
        return false;
      }

      // Enforce siteType overlap if siteTypes defined on fragment
      if (f.siteTypes && siteType.length > 0 && !f.siteTypes.some(st => siteType.includes(st))) {
        return false;
      }
    }

    // Generic matching rules:

    // Match siteType if fragment specifies siteTypes; otherwise, allow
    const siteTypeMatch = f.siteTypes && f.siteTypes.length > 0
      ? f.siteTypes.some(st => siteType.includes(st))
      : true;

    // Match category if fragment specifies categories; otherwise, allow
    const categoryMatch = f.categories && f.categories.length > 0
      ? f.categories.includes(category!)
      : true;

    // Match tags if fragment specifies tags; otherwise, allow
    const tagMatch = f.tags && f.tags.length > 0
      ? f.tags.some(tag => tags.includes(tag))
      : true;

    // Match terrain if fragment specifies terrains; otherwise, allow
    const terrainMatch = f.terrains && f.terrains.length > 0
      ? f.terrains.some(t => terrain.includes(t))
      : true;

    // Match climate if fragment specifies climates; otherwise, allow
    const climateMatch = f.climates && f.climates.length > 0
      ? f.climates.includes(climate!)
      : true;

    // Match shopType if siteType includes "shop" and shopType is defined
    const shopTypeMatch = siteType.includes("shop") && shopType
      ? f.shopTypes && f.shopTypes.length > 0
        ? f.shopTypes.includes(shopType)
        : true
      : true;

    return siteTypeMatch && categoryMatch && tagMatch && terrainMatch && climateMatch && shopTypeMatch;
  });
}


function groupFragmentsByType(fragments: GeneratorSiteFragmentPlain[]) {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    noun: fragments.filter(f => f.type === "noun"),
    person: fragments.filter(f => f.type === "person"),
    shopType: fragments.filter(f => f.type === "shopType"),
    format: fragments.filter(f => f.type === "format"),
  };
}

export function generateSiteNameFromFragments(
  fragments: GeneratorSiteFragmentPlain[],
  filters: GenerateSiteNameOptions
): string {
  // Filter first, then group
  const filtered = filterByAttributes(fragments, filters);
  const grouped = groupFragmentsByType(filtered);

  const suffixOrNounFragments = [...grouped.suffix, ...grouped.noun];

  const formatTemplate = weightedRandom(grouped.format) || "{{prefix}} {{suffix}}";

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
          used.push(selected);
          return selected;
        }

        case "prefix":
          if (grouped.prefix.length > 0) return weightedRandom(grouped.prefix);
          break;

        case "person":
          if (grouped.person.length > 0) return weightedRandom(grouped.person);
          break;

        case "shopType":
          if (filters.shopType) {
            const matchingFragment = grouped.shopType.find(f => f.shopType === filters.shopType);
            if (matchingFragment) {
              return toTitleCase(matchingFragment.value);
            }
            return toTitleCase(filters.shopType);
          }
          break;

        default:
          break;
      }
    }

    // Fallback if no replacement found
    return options[0] || "";
  };

  const name = formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => getReplacement(key, filters));

  //console.log("Fragments grouped:", {
    //prefix: grouped.prefix,
    //suffixOrNoun: suffixOrNounFragments,
    //person: grouped.person,
    //shopType: grouped.shopType,
    //format: grouped.format,
    //noun: grouped.noun,
  //});
  return name;
}
