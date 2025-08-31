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

    if (!fragmentSubtypes) return true;

    let normalizedFragmentSubtypes: string[];

    if (Array.isArray(fragmentSubtypes)) {
      normalizedFragmentSubtypes = fragmentSubtypes.map(s => s.toLowerCase());
    } else if (typeof fragmentSubtypes === "string") {
      normalizedFragmentSubtypes = [fragmentSubtypes.toLowerCase()];
    } else {
      // it's a number → we can't lowercase it, so wrap it as string
      normalizedFragmentSubtypes = [String(fragmentSubtypes)];
    }

    return normalizedFragmentSubtypes.some(val => normalized.includes(val));
  });
}
