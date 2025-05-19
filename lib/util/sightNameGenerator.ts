import { GeneratorSightFragmentPlain } from "@/lib/models/generatorSightFragment.model";

interface GenerateSightNameOptions {
  category?: string;
  tags?: string[];
  terrain?: string[];
  climate?: string;
  sightType?: string;
  shopType?: string[]
}

function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): string {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : "";
}

function filterByAttributes(
  fragments: GeneratorSightFragmentPlain[],
  filters: GenerateSightNameOptions
): GeneratorSightFragmentPlain[] {
  const { category, tags = [], terrain = [], climate, sightType, shopType } = filters;

  return fragments.filter(f => {
    if (f.type === "storeType" && sightType !== "shop") {
      return false;
    }

    if (f.type === "format") {
      const hasStoreType = f.value.includes("{{storeType}}");
      const hasPersonStoreType = f.value.includes("{{person}}'s {{storeType}}");

      // Only allow these formats for shops
      if ((hasStoreType || hasPersonStoreType) && sightType !== "shop") {
        return false;
      }

      // For all other formats:
      // - If sightTypes is defined, enforce a match
      // - If not, allow for any sightType
      if (f.sightTypes && sightType && !f.sightTypes.includes(sightType)) {
        return false;
      }
    }

    // Generic matching for all other types
    const sightTypeMatch =
      f.type === "format"
        ? true // ← Skip sightType filtering for generic formats
        : sightType
        ? !f.sightTypes || f.sightTypes.includes(sightType)
        : true;
        
    const categoryMatch = category
      ? f.categories?.includes(category)
      : true;

    const tagMatch = tags.length > 0
      ? !f.tags || f.tags.some(tag => tags.includes(tag))
      : true;

    const terrainMatch = terrain.length > 0
      ? !f.terrains || f.terrains.some(t => terrain.includes(t))
      : true;

    const climateMatch = climate
      ? !f.climates || f.climates.includes(climate)
      : true;

    const shopTypeMatch =
      sightType === "shop" && shopType
        ? !f.shopTypes || f.shopTypes.includes(shopType)
        : true;

    return (
      sightTypeMatch &&
      categoryMatch &&
      tagMatch &&
      terrainMatch &&
      climateMatch &&
      shopTypeMatch
    );
  });
}


function groupFragmentsByType(fragments: GeneratorSightFragmentPlain[]) {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    noun: fragments.filter(f => f.type === "noun"),
    person: fragments.filter(f => f.type === "person"),
    storeType: fragments.filter(f => f.type === "storeType"),
    format: fragments.filter(f => f.type === "format"),
  };
}

export function generateSightNameFromFragments(
  fragments: GeneratorSightFragmentPlain[],
  filters: GenerateSightNameOptions
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

  const getReplacement = (key: string): string => {
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

        case "storeType":
          if (filters.sightType === "shop" && grouped.storeType.length > 0) {
            return weightedRandom(grouped.storeType);
          }
          break;

        default:
          break;
      }
    }

    // Fallback if no replacement found
    return options[0] || "";
  };


  const name = formatTemplate.replace(/\{\{\s*(.*?)\s*\}\}/g, (_, key) => getReplacement(key));

  console.log("Fragments grouped:", {
    //prefix: grouped.prefix,
    //suffixOrNoun: suffixOrNounFragments,
    //person: grouped.person,
    //storeType: grouped.storeType,
    format: grouped.format,
    //noun: grouped.noun,
  });

  return name;
}
