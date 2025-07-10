import { EntertainmentSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { ENTERTAINMENT_VENUE_TYPES } from "@/constants/siteOptions";
import { getRandom } from "@/lib/util/randomValues";
import { entryBaseCost, entryConditionModifier, entrySizeModifier } from "./mappings/entertainment.mappings";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";

export function isEntertainmentSite(data: Partial<SiteFormData>): data is Partial<EntertainmentSite> {
  return data.type === "entertainment";
}

export async function applyEntertainmentVenueRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!isEntertainmentSite(data)) return data;  // Return early if not "entertainment" type

  if (!data.venueType || data.venueType === "random") {
    data.venueType = getRandom(ENTERTAINMENT_VENUE_TYPES);
  }

  return data;
}

async function applyEntryCostRule(
  data: Partial<SiteFormData>
): Promise<Partial<SiteFormData>> {
  if (
    data.type !== "entertainment" ||
    !data.size ||
    !data.condition
  ) {
    return data;
  }

  // Street performance zone being hard-set to free before math is applied
  if(data.venueType ===  "Street Performance Zone"){
    data.cost = "Free, tipping encouraged";
  } else {
    const venueType = data.venueType ?? "Other"; // Venue Type is considered an optional field; if left empty, default to "Other" for calculations
    const base = entryBaseCost[venueType] ?? 10;
    const sizeMod = entrySizeModifier[data.size] ?? 0;
    const conditionMod = entryConditionModifier[data.condition] ?? 0;

    const totalMod = 1 + sizeMod + conditionMod;
    const rawCost = Math.round(base * totalMod);
    const costInCp = Math.max(rawCost, 1); // Enforce minimum 1 cp

    data.cost = formatCurrencyFromCp(costInCp);
  }

  return data;
}


const entertainmentRules = [
  ...commonRules,
  applyEntertainmentVenueRule,
  applyEntryCostRule
];

export async function generateEntertainmentData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("entertainment", entertainmentRules)(input);
}