import { generateSiteNameFromFragments } from "./generateSiteNameFromFragments";
import { GenerateSiteNameOptions, SiteNameGenerator } from "@/interfaces/site.interface";
//import { templeNameGenerator } from "../temple/temple.name.generator";
//import { tavernNameGenerator } from "../tavern/tavern.name.generator";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { shopNameGenerator } from "../shop/shop.name.generator";

const siteNameGeneratorsByType: Record<string, SiteNameGenerator> = {
  shop: shopNameGenerator
  //temple: templeNameGenerator,
  //tavern: tavernNameGenerator,
};

export const defaultSiteNameGenerator: SiteNameGenerator = {
  generateName(fragments, options) {
    return generateSiteNameFromFragments(fragments, options);
  },
};

export function dispatchSiteName(
  fragments: GeneratorSiteFragmentPlain[],
  options: GenerateSiteNameOptions
): string {
  const siteTypeKey = (options.siteType?.[0] ?? "").toLowerCase();
  const generator = siteNameGeneratorsByType[siteTypeKey] || defaultSiteNameGenerator;
  return generator.generateName(fragments, options);
}