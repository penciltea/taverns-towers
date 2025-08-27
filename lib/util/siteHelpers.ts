/**
 * Site Helpers
 *
 * - `isValidSiteCategory`: Type guard to verify if a string is a valid site category.
 * - `createSiteGenerator`: Factory to create site generator functions for specific site types,
 *    applying an ordered list of async rules to generate or enrich site data.
*/


import { SHOP_TYPE_CATEGORIES, SITE_CATEGORIES, SiteCategory } from "@/constants/site/site.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { MENU_CATEGORY_OPTIONS_BY_SITE } from "@/constants/site/menu.options";
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
 * Getting guild type values from nested arrays of guild types
 */
export const getGuildTypes = GUILD_TYPES.flatMap(group =>
  group.options.map(option => option.value)
);

/** 
 * Getting guild membership requirements from nested arrays
 */
export const getGuildMembershipRequirements = GUILD_MEMBERSHIP_REQUIREMENTS.flatMap(group => group.options.map(opt => opt.value));

/**
 * A utility function for getting menu item categories by site type (and shop type if siteType is 'shop' or guild type if siteType is 'guild')
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

/** 
 * A util function for determining if a site type has a menu or not
 */

export function siteTypeHasMenu(siteType: string | undefined): boolean {
  const MENU_SUPPORTED_TYPES = ["shop", "tavern", "guild", "temple"]; // add more if needed
  return !!siteType && MENU_SUPPORTED_TYPES.includes(siteType);
}


export function mapSiteToForm(site: any): SiteFormData | null {
  switch (site.type) {
    case "tavern":
      return {
        type: "tavern",
        name: site.name ?? "",
        clientele: site.clientele ?? "",
        entertainment: site.entertainment ?? [],
        cost: site.cost ?? "",
        menu: site.menu ?? [],
        connections: site.connections ?? [],
      };
    case "temple":
      return {
        type: "temple",
        name: site.name ?? "",
        domains: site.domains ?? [],
        relics: site.relics ?? "",
        menu: site.menu ?? [],
        connections: site.connections ?? [],
      };
    case "shop":
      return {
        type: "shop",
        name: site.name ?? "",
        shopType: site.shopType ?? "" as any,
        menu: site.menu ?? [],
        connections: site.connections ?? [],
      };
    case "guild":
      return {
        type: "guild",
        name: site.name ?? "",
        guildType: site.guildType ?? "" as any,
        guildName: site.guildName ?? "",
        membershipRequirements: site.membershipRequirements ?? [],
        knownRivals: site.knownRivals ?? "",
        menu: site.menu ?? [],
        connections: site.connections ?? [],
      };
    case "government":
      return {
        type: "government",
        name: site.name ?? "",
        function: site.function ?? "" as any,
        security: site.security ?? "" as any,
        connections: site.connections ?? [],
      };
    case "entertainment":
      return {
        type: "entertainment",
        name: site.name ?? "",
        venueType: site.venueType ?? "" as any,
        cost: site.cost ?? "",
        performances: site.performances ?? "",
        connections: site.connections ?? [],
      };
    case "hidden":
      return {
        type: "hidden",
        name: site.name ?? "",
        secrecy: site.secrecy ?? [],
        knownTo: site.knownTo ?? "",
        defenses: site.defenses ?? "",
        purpose: site.purpose ?? "",
        connections: site.connections ?? [],
      };
    case "residence":
      return {
        type: "residence",
        name: site.name ?? "",
        notableFeatures: site.notableFeatures ?? "",
        connections: site.connections ?? [],
      };
    case "miscellaneous":
      return {
        type: "miscellaneous",
        name: site.name ?? "",
        features: site.features ?? "",
        use: site.use ?? "",
        connections: site.connections ?? [],
      };
    default:
      console.warn("Unknown site type", site.type);
      return null;
  }
}