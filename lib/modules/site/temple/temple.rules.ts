import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { TempleSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { getRandom } from "@/lib/util/randomValues";

export function isTempleSite(data: Partial<SiteFormData>): data is Partial<TempleSite> {
  return data.type === "temple";
}



const templeRules = [
  ...commonRules,
];

export async function generateTempleData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("temple", templeRules)(input);
}