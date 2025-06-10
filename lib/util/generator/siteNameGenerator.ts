import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";

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
  const { category, tags = [], terrain = [], climate, shopType } = filters;
  const normalizedSiteTypes = Array.isArray(filters.siteType)
    ? filters.siteType.map(s => s.toLowerCase())
    : filters.siteType
      ? [(filters.siteType as string).toLowerCase()]
      : [];

  return fragments.filter(f => {
    const isShopSite = normalizedSiteTypes.includes("shop");

    // 1. Skip shopType fragments if not a shop site
    if (f.type === "shopType" && !isShopSite) return false;

    // 2. Format-specific checks for shopType placeholder
    if (f.type === "format") {
      const hasShopType = f.value.includes("{{shopType}}") || f.value.includes("{{person}}'s {{shopType}}");
      if (hasShopType && (!isShopSite || !shopType)) return false;
    }

    // 3. Match siteType or listOfSiteTypes
    const fragmentSiteTypes: string[] = [];

    if (typeof f.siteType === "string") {
      fragmentSiteTypes.push(f.siteType.toLowerCase());
    }

    if (Array.isArray(f.listOfSiteTypes)) {
      fragmentSiteTypes.push(...f.listOfSiteTypes.map(st => st.toLowerCase()));
    }

    const matchesSiteType = fragmentSiteTypes.length > 0
      ? fragmentSiteTypes.some(type => normalizedSiteTypes.includes(type))
      : true;

    if (!matchesSiteType) return false;

    // 4. Category match
    if (f.categories?.length && !f.categories.includes(category!)) return false;

    // 5. Tag match
    if (f.tags?.length) {
      const normalizedTags = tags.map(t => t.toLowerCase());
      if (!f.tags.some((tag: string) => normalizedTags.includes(tag.toLowerCase()))) return false;
    }

    // 6. Terrain match
    if (f.terrain?.length) {
      const normalizedTerrain = terrain.map(t => t.toLowerCase());
      if (!f.terrain.some((t: string) => normalizedTerrain.includes(t.toLowerCase()))) return false;
    }

    // 7. Climate match
    if (f.climate?.length && climate && !f.climate.includes(climate)) return false;

    // 8. Shop type match
    if (isShopSite && shopType && f.shopTypes?.length && !f.shopTypes.includes(shopType)) {
      return false;
    }

    return true;
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
          if (!selected) return "";
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
            const matching = grouped.shopType.find(f => f.shopType === filters.shopType);
            return toTitleCase(matching?.value ?? filters.shopType);
          }
          break;

        default:
          break;
      }
    }

    return options[0] || "";
  };

  const name = formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) =>
    getReplacement(key, filters)
  );

  // console.log("Fragments grouped:", { 
    
    // format: grouped.format,
    // prefix: grouped.prefix
  // 
  // });

  return name;
}