import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteCategory } from "@/constants/siteOptions";
import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationContext, SiteGenerationInput } from "../modules/site/types";


export function isValidSiteCategory(value: string | null): value is SiteCategory {
  if (typeof value !== "string") return false;
  return SITE_CATEGORIES.some((category) => category.value === value);
}


// Creates a site generator function for a specific site type and its rules
export function createSiteGenerator<T extends SiteFormData["type"]>(
  type: T,
  rules: ((
    data: Extract<SiteFormData, { type: T }>, 
    context: SiteGenerationContext
  ) => Promise<Partial<Extract<SiteFormData, { type: T }>>>)[]
): (input: SiteGenerationInput) => Promise<Extract<SiteFormData, { type: T }>> {
  return async (input) => {
    const { overrides = {}, ...context } = input;

    const base: Extract<SiteFormData, { type: T }> = {
      type,
      ...overrides,
    } as Extract<SiteFormData, { type: T }>;

    let result = base;

    for (const rule of rules) {
      result = {
        ...result,
        ...(await rule(result, context)),
      };
    }

    return result;
  };
}