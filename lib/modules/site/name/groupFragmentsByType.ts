import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import type { GroupKey } from "@/interfaces/site.interface";

export function groupFragmentsByType(fragments: GeneratorSiteFragmentPlain[]): Record<GroupKey, GeneratorSiteFragmentPlain[]> {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    noun: fragments.filter(f => f.type === "noun"),
    person: fragments.filter(f => f.type === "person"),
    siteTypeName: fragments.filter(f => f.type === "siteTypeName"),
    fullName: fragments.filter(f => f.type === "fullName"),
    format: fragments.filter(f => f.type === "format"),
  };
}