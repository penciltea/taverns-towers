import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";

export function filterBySubType(
  fragments: GeneratorSiteFragmentPlain[],
  subtypeKey: keyof GeneratorSiteFragmentPlain,
  filterValues?: string[]
): GeneratorSiteFragmentPlain[] {
  if (!Array.isArray(filterValues) || filterValues.length === 0) return fragments;

  const normalized = filterValues.map(s => s.toLowerCase());

  return fragments.filter(fragment => {
    const fragmentSubtypes = fragment[subtypeKey];
    if (!fragmentSubtypes || fragmentSubtypes.length === 0) return true;

    const normalizedFragmentSubtypes = Array.isArray(fragmentSubtypes)
      ? fragmentSubtypes.map(s => s.toLowerCase())
      : [fragmentSubtypes.toLowerCase()];

    return normalizedFragmentSubtypes.some(val => normalized.includes(val));
  });
}