import { GovernmentSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { GOVERNMENT_FUNCTIONS, SiteGovernmentFunctionType, SiteSecurityLevel } from "@/constants/site/government.options";
import { getRandom } from "@/lib/util/randomValues";
import { SECURITY_BASELINE_BY_FUNCTION, SIZE_SECURITY_WEIGHT, CONDITION_SECURITY_WEIGHT } from "./mappings/government.mappings";

export function isGovernmentSite(data: Partial<SiteFormData>): data is Partial<GovernmentSite> {
  return data.type === "government";
}

export async function applyGovernmentFunctionRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!isGovernmentSite(data)) return data;  // Return early if not "government" type

  if (!data.function || data.function === "random") {
    // Flatten all options' values into one array
    const allGovernmentFunctions = GOVERNMENT_FUNCTIONS.flatMap(category =>
      category.options.map(option => option.value)
    );

    data.function = getRandom(allGovernmentFunctions) as SiteGovernmentFunctionType;
  }

  return data;
}

export async function applySecurityByConditions(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>>{
    if(!isGovernmentSite(data)) return data; // Return early if not "government" type

    const { size, condition, function: siteFunction } = data;

    const sizeWeight = SIZE_SECURITY_WEIGHT[size as keyof typeof SIZE_SECURITY_WEIGHT] ?? 0;
    const conditionWeight = CONDITION_SECURITY_WEIGHT[condition as keyof typeof CONDITION_SECURITY_WEIGHT] ?? 0;

    const allowed = SECURITY_BASELINE_BY_FUNCTION[siteFunction as SiteGovernmentFunctionType] ?? ["low"];

    const weight = sizeWeight + conditionWeight;

    const index = Math.min(Math.floor(weight / 2), allowed.length - 1);

    data.security = allowed[index];

    return data;
}


const governmentRules = [
  ...commonRules,
  applyGovernmentFunctionRule,
  applySecurityByConditions
];

export async function generateGovernmentData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("government", governmentRules)(input);
}