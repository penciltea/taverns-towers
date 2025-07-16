import { ResidenceSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";

export function isResidenceSite(data: Partial<SiteFormData>): data is Partial<ResidenceSite> {
  return data.type === "residence";
}



const residenceRules = [
  ...commonRules
];

export async function generateResidenceData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("residence", residenceRules)(input);
}