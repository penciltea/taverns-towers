import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteCategory } from "@/constants/siteOptions";
import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationInput } from "../modules/site/types";
import { runSiteRules } from "../modules/site/runSiteRules";


export function isValidSiteCategory(value: string | null): value is SiteCategory {
  if (typeof value !== "string") return false;
  return SITE_CATEGORIES.some((category) => category.value === value);
}


// Creates a site generator function for a specific site type and its rules
export function createSiteGenerator<
  T extends SiteFormData["type"]
>(
  type: T,
  rules: ((data: Extract<SiteFormData, { type: T }>) => Promise<Partial<Extract<SiteFormData, { type: T }>>>)[] // Rules must match the shape for this type
): (input: SiteGenerationInput) => Promise<Extract<SiteFormData, { type: T }>> {
  return async (input) => {
    const base: Extract<SiteFormData, { type: T }> = {
      type,
      ...input,
    } as Extract<SiteFormData, { type: T }>;

    const result = await runSiteRules(base, rules);
    return {
      ...base,
      ...result,
    };
  };
}