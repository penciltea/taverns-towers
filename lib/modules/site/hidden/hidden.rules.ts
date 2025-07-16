import { HiddenSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";

export function isHiddenSite(data: Partial<SiteFormData>): data is Partial<HiddenSite> {
  return data.type === "hidden";
}



const hiddenRules = [
  ...commonRules
];

export async function generateHiddenData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("hidden", hiddenRules)(input);
}