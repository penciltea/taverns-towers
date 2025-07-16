import { MiscellaneousSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";

export function isMiscellaneousSite(data: Partial<SiteFormData>): data is Partial<MiscellaneousSite> {
  return data.type === "miscellaneous";
}



const miscellaneousRules = [
  ...commonRules
];

export async function generateMiscellaneousData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("miscellaneous", miscellaneousRules)(input);
}