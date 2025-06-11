import { getRandom } from "@/lib/util/randomValues";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import { SiteFormData } from "@/schemas/site.schema";

export async function applySizeRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!data.size || data.size === "random") {
    const randomOption = getRandom(SITE_SIZE);
    data.size = randomOption.value;
  }
  return data;
}

export async function applyConditionRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!data.condition || data.condition === "random") {
    const randomOption = getRandom(SITE_CONDITION);
    data.condition = randomOption.value;
  }
  return data;
}

export const commonRules = [applySizeRule, applyConditionRule];