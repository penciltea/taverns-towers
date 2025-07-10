import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";

export function groupFragmentsByType(fragments: GeneratorSiteFragmentPlain[]) {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    noun: fragments.filter(f => f.type === "noun"),
    person: fragments.filter(f => f.type === "person"),
    shopType: fragments.filter(f => f.type === "shopType"),
    format: fragments.filter(f => f.type === "format"),
  };
}