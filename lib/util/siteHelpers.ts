/**
 * Site Helpers
 *
 * - `isValidSiteCategory`: Type guard to verify if a string is a valid site category.
 * - `createSiteGenerator`: Factory to create site generator functions for specific site types,
 *    applying an ordered list of async rules to generate or enrich site data.
*/


import { ENTERTAINMENT_VENUE_TYPES, SHOP_TYPE_CATEGORIES, SITE_CATEGORIES, SiteCategory } from "@/constants/site/site.options";
import { GUILD_MEMBERSHIP_REQUIREMENTS, GUILD_TYPES } from "@/constants/site/guild.options";
import { MENU_CATEGORY_OPTIONS_BY_SITE } from "@/constants/site/menu.options";
import { SiteFormData } from "@/schemas/site.schema";
import { EntertainmentSite, GovernmentSite, GuildSite, HiddenSite, MiscellaneousSite, ResidenceSite, ShopSite, SiteGenerationContext, SiteGenerationInput, SiteType, TavernSite, TempleSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "./getLabelFromValue";
import { isEntertainmentSite } from "../modules/site/entertainment/entertainment.rules";
import { isGovernmentSite } from "../modules/site/government/government.rules";
import { isGuildSite } from "../modules/site/guild/guild.rules";
import { isShopSite } from "../modules/site/shop/shop.rules";
import { getShopTypeLabel } from "@/components/Site/Dialog/ShopDetails";

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


export function mapSiteToForm(site: SiteType): SiteFormData | null {
  switch (site.type) {
    case "tavern":
      // TypeScript now knows 'site' is TavernSite
      const tavernSite = site as TavernSite;
      return {
        type: "tavern",
        name: tavernSite.name ?? "",
        clientele: tavernSite.clientele ?? "",
        entertainment: tavernSite.entertainment ?? [],
        cost: tavernSite.cost ?? "",
        menu: tavernSite.menu ?? [],
        connections: tavernSite.connections ?? [],
      };

    case "temple":
      const templeSite = site as TempleSite;
      return {
        type: "temple",
        name: templeSite.name ?? "",
        size: templeSite.size ?? "",
        condition: templeSite.condition ?? "",
        domains: templeSite.domains ?? [],
        relics: templeSite.relics ?? "",
        menu: templeSite.menu ?? [],
        connections: templeSite.connections ?? [],
      };

    case "shop":
      const shopSite = site as ShopSite;
      return {
        type: "shop",
        name: shopSite.name ?? "",
        shopType: shopSite.shopType ?? "" as ShopSite["shopType"],
        size: shopSite.size ?? "",
        condition: shopSite.condition ?? "",
        menu: shopSite.menu ?? [],
        connections: shopSite.connections ?? [],
      };

    case "guild":
      const guildSite = site as GuildSite;
      return {
        type: "guild",
        name: guildSite.name ?? "",
        size: guildSite.size ?? "",
        condition: guildSite.condition ?? "",
        guildType: guildSite.guildType ?? "" as GuildSite["guildType"],
        guildName: guildSite.guildName ?? "",
        membershipRequirements: guildSite.membershipRequirements ?? [],
        knownRivals: guildSite.knownRivals ?? "",
        menu: guildSite.menu ?? [],
        connections: guildSite.connections ?? [],
      };
    case "government":
      const governmentSite = site as GovernmentSite;
      return {
        type: "government",
        name: governmentSite.name ?? "",
        size: governmentSite.size ?? "",
        condition: governmentSite.condition ?? "",
        function: governmentSite.function as GovernmentSite["function"] ?? "" ,
        security: governmentSite.security as GovernmentSite["security"] ?? "",
        connections: governmentSite.connections ?? [],
      };
    case "entertainment":
      const entertainmentSite = site as EntertainmentSite;
      return {
        type: "entertainment",
        name: entertainmentSite.name ?? "",
        size: entertainmentSite.size ?? "",
        condition: entertainmentSite.condition ?? "",
        venueType: entertainmentSite.venueType ?? "" as EntertainmentSite["venueType"],
        cost: entertainmentSite.cost ?? "",
        connections: entertainmentSite.connections ?? [],
      };
    case "hidden":
      const hiddenSite = site as HiddenSite;
      return {
        type: "hidden",
        name: hiddenSite.name ?? "",
        size: hiddenSite.size ?? "",
        condition: hiddenSite.condition ?? "",
        secrecy: hiddenSite.secrecy ?? [],
        knownTo: hiddenSite.knownTo ?? [],
        defenses: hiddenSite.defenses ?? [],
        purpose: hiddenSite.purpose ?? [],
        connections: hiddenSite.connections ?? [],
      };
    case "residence":
      const residenceSite = site as ResidenceSite;
      return {
        type: "residence",
        name: residenceSite.name ?? "",
        size: residenceSite.size ?? "",
        condition: residenceSite.condition ?? "",
        notableFeatures: residenceSite.notableFeatures ?? "",
        connections: residenceSite.connections ?? [],
      };
    case "miscellaneous":
      const miscellaneousSite = site as MiscellaneousSite;
      return {
        type: "miscellaneous",
        name: miscellaneousSite.name ?? "",
        size: miscellaneousSite.size ?? "",
        condition: miscellaneousSite.condition ?? "",
        features: miscellaneousSite.features ?? "",
        use: miscellaneousSite.use ?? "",
        connections: miscellaneousSite.connections ?? [],
      };
    default:
      return null;
  }
}


export function handleSiteLabel(site: SiteType){
    const baseLabel = getLabelFromValue(SITE_CATEGORIES, site.type);

    if(site.type === 'shop') {
      return `${baseLabel} (${getShopTypeLabel(site.shopType)})`;
    } else if(site.type === 'guild') {
      return `${baseLabel} (getGuildypeLabel(site.guildType)})`;
    } else if(site.type === 'government' && site.function){
      return `${baseLabel} (getGovernmentTypeLabel(site.function)})`;
    } else if(site.type === 'entertainment'){
      return `${baseLabel} (${getLabelFromValue(ENTERTAINMENT_VENUE_TYPES, site.venueType ?? "")})`;
    }
    return baseLabel;
  }