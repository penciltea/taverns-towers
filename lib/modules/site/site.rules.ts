/**
 * Site rules dispatcher and helpers
 *
 * This module maps each site category/type to its corresponding generation rules.
 * It exposes functions to generate site data either from a raw input context or
 * directly using settlement data as context, automatically handling naming.
 *
 * The main components:
 * - `SiteGenerator`: a mapping of site types to async generator functions.
 * - `generateSiteValues`: given a site type and input context, runs the correct
 *    generator and applies site naming logic.
 * - `generateSiteValuesFromSettlement`: convenience helper that extracts relevant
 *    settlement data and calls `generateSiteValues`.
*/

import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationInput } from "@/interfaces/site.interface";
import { Settlement } from "@/interfaces/settlement.interface";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";

import { generateTavernData } from "./tavern/tavern.rules";
import { generateShopData } from "./shop/shop.rules";

import { generateEntertainmentValues } from "./entertainment.rules";
import { generateHiddenValues } from "./hidden.rules";
import { generateGovernmentValues } from "./government.rules";
import { generateGuildValues } from "./guild.rules";
import { generateMiscellaneousValues } from "./miscellaneous.rules";
import { generateResidenceValues } from "./residence.rules";
import { generateTempleValues } from "./temple.rules";


// Maps site type strings to their respective async generation functions
export const SiteGenerator: Record<
  string,
  (input: SiteGenerationInput) => Promise<SiteFormData>
> = {
    entertainment: generateEntertainmentValues,
    government: generateGovernmentValues,
    guild: generateGuildValues,    
    hidden: generateHiddenValues,
    miscellaneous: generateMiscellaneousValues,
    residence: generateResidenceValues,
    shop: generateShopData,
    tavern: generateTavernData,
    temple: generateTempleValues
};


/**
 * Generates site data for a given site type using supplied input context.
 * Calls the specific site generator, then generates a site name if one
 * was not already provided by the generator.
 * 
 * @param type - The site category/type, e.g. 'tavern', 'shop'
 * @param input - Context and overrides used by the generator
 * @returns Generated site data including name
 */
export async function generateSiteValues(
  type: string,
  input: SiteGenerationInput
): Promise<SiteFormData> {
  const generator = SiteGenerator[type];
  if (!generator) throw new Error(`No generation rules defined for site type: ${type}`);

  // Generate base site data from the rules for the given type
  const baseData = await generator(input);

  // Generate a site name if one wasn't provided
  const name = await generateSiteName({
    category: type,
    siteType: [type],
    terrain: input.terrain,
    climate: input.climate,
    tags: input.tags,
  });

  return {
    ...baseData,
    name: baseData.name && baseData.name !== "" ? baseData.name : name,
  };
}

/**
 * Convenience function to generate site data from settlement context.
 * Extracts relevant settlement properties and passes them as context to
 * `generateSiteValues`. Also allows passing overrides for site fields.
 * 
 * @param type - The site category/type to generate
 * @param settlement - Partial settlement data providing environmental context
 * @param overrides - Partial site data to override generated values
 * @returns Generated site data including name
 */

export async function generateSiteValuesFromSettlement(
  type: string,
  settlement: Pick<
    Settlement,
    | "climate"
    | "terrain"
    | "tags"
    | "wealth"
    | "size"
    | "crime"
    | "domains"
    | "magic"
    | "races"
    | "rulingStyle"
    | "_id"
    | "name"
  >,
  overrides: Partial<SiteFormData> = {}
): Promise<SiteFormData> {
  // console.log("settlement input:", {
  //   magic: settlement.magic,
  //   climate: settlement.climate,
  //   terrain: settlement.terrain,
  //   tags: settlement.tags,
  //   wealth: settlement.wealth,
  //   crime: settlement.crime,
  //   rulingStyle: settlement.rulingStyle,
  // });

  return await generateSiteValues(type, {
    overrides,
    climate: settlement.climate,
    terrain: settlement.terrain,
    tags: settlement.tags,
    wealth: settlement.wealth,
    crime: settlement.crime,
    magic: settlement.magic,
    races: settlement.races,
    size: settlement.size,
    rulingStyle: settlement.rulingStyle,
    domains: settlement.domains,
    settlementId: settlement._id,
    settlementName: settlement.name,
    origin: "settlement",
  });
}