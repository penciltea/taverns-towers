/**
 * Site Helpers
 *
 * - `isValidSiteCategory`: Type guard to verify if a string is a valid site category.
 * - `createSiteGenerator`: Factory to create site generator functions for specific site types,
 *    applying an ordered list of async rules to generate or enrich site data.
*/


import { MENU_CATEGORY_OPTIONS_BY_SITE, SHOP_TYPE_CATEGORIES, SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteCategory } from "@/constants/siteOptions";
import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationContext, SiteGenerationInput } from "@/interfaces/site.interface";

/**
 * Type guard to check whether a given string is a valid site category.
 *
 * @param value - The string to validate (can be null)
 * @returns True if value matches one of the predefined site categories; otherwise false
 */
export function isValidSiteCategory(value: string | null): value is SiteCategory {
  if (typeof value !== "string") return false;

  // Checks if the value exists among known site categories by comparing against constant list
  return SITE_CATEGORIES.some((category) => category.value === value);
}

/**
 * Creates a site generator function for a given site type.
 * The generator applies a series of asynchronous rules to the input data and context,
 * progressively enriching or modifying the site data.
 *
 * @param type - The site type this generator will produce (e.g., 'tavern', 'shop', etc.)
 * @param rules - An array of async functions (rules) to apply in order
 *                Each rule receives the current site data and context, returns partial updates
 * @returns A function that accepts SiteGenerationInput and returns a fully generated site data object
*/

export function createSiteGenerator<T extends SiteFormData["type"]>(
  type: T,
  rules: ((
    data: Extract<SiteFormData, { type: T }>, 
    context: SiteGenerationContext
  ) => Promise<Partial<Extract<SiteFormData, { type: T }>>>)[]
): (input: SiteGenerationInput) => Promise<Extract<SiteFormData, { type: T }>> {
  return async (input) => {
    // Separate overrides (pre-set fields) from the rest of the generation context
    const { overrides = {}, ...context } = input;

    // Initialize base site data with the specified type and any overrides passed
    const base: Extract<SiteFormData, { type: T }> = {
      type,
      ...overrides,
    } as Extract<SiteFormData, { type: T }>;

    let result = base;

    // Apply each async rule sequentially to enrich/modify the site data
    for (const rule of rules) {
      result = {
        ...result,
        ...(await rule(result, context)),
      };
    }

    return result;
  };
}


/**
 * Getting shop type values from the nested arrays of shop types
*/
export const getShopTypes = SHOP_TYPE_CATEGORIES.flatMap(group =>
  group.options.map(option => option.value)
);

/**
 * A utility function for getting menu item categories by site type (and shop type if siteType is 'shop')
*/

export function getCategoryOptions(
  siteType: string,
  shopType?: string,
  fallbackCategory?: string
): string[] {
  const entry = MENU_CATEGORY_OPTIONS_BY_SITE[siteType];
  let categories: string[] = [];

  if (Array.isArray(entry)) {
    categories = entry;
  } else if (shopType && typeof entry === "object") {
    categories = entry[shopType.toLowerCase()] ?? [];
  }

  if (
    fallbackCategory &&
    !categories.includes(fallbackCategory) &&
    fallbackCategory !== "Other"
  ) {
    categories = [...categories, fallbackCategory];
  }

  // Always add "Other" as the final fallback option
  if (!categories.includes("Other")) {
    categories.push("Other");
  }

  return categories;
}