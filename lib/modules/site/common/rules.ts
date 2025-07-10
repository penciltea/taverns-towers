import { getRandom } from "@/lib/util/randomValues";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";
import { SiteFormData } from "@/schemas/site.schema";


export async function applySiteSizeRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!data.size || data.size === "random") {
    data.size = getRandom(SITE_SIZE).value;
  }
  
  return data;
}

export async function applySiteConditionRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!data.condition || data.condition === "random") {
    data.condition = getRandom(SITE_CONDITION).value;
  }
  
  return data;
}

export const commonRules = [applySiteSizeRule, applySiteConditionRule];
