import { GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";

export function filterByAttributes(
  fragments: GeneratorSiteFragmentPlain[],
  filters: GenerateSiteNameOptions
): GeneratorSiteFragmentPlain[] {
  const { tags = [], terrain = [], climate, siteType = [] } = filters;

  return fragments.filter(f => {
    // Basic universal filters

    // Normalize input siteType filter
    const normalizedSiteTypes = Array.isArray(siteType)
      ? siteType.map(s => s.toLowerCase())
      : siteType
      ? [siteType]
      : [];

    // Normalize fragment.siteType
    const fragmentSiteTypes = Array.isArray(f.siteType)
      ? f.siteType.map(s => s.toLowerCase())
      : f.siteType
      ? [f.siteType]
      : [];

    // Allow fragment if:
    // - no filter is passed in
    // - or the fragment is "universal" (has no siteType defined)
    // - or there's an intersection
    const matchesSiteType =
      normalizedSiteTypes.length === 0 ||
      fragmentSiteTypes.length === 0 ||
      fragmentSiteTypes.some(type => normalizedSiteTypes.includes(type));

    if (!matchesSiteType) return false;

    // Tag filter (case-insensitive)
    if (f.tags?.length) {
      const normalizedTags = tags.map(t => t.toLowerCase());
      if (!f.tags.some((tag: string) => normalizedTags.includes(tag.toLowerCase()))) return false;
    }

    // Terrain filter (case-insensitive)
    if (f.terrain?.length) {
      const normalizedTerrain = terrain.map(t => t.toLowerCase());
      if (!f.terrain.some((t: string) => normalizedTerrain.includes(t.toLowerCase()))) return false;
    }

    // Climate filter (case-insensitive)
    if (f.climate?.length && climate && !f.climate.includes(climate.toLowerCase())) return false;

    // console.log("Filtering fragment", f.value, {
    //   fragmentSiteTypes,
    //   normalizedSiteTypes,
    // });

    return true;
  });
}