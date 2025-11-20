import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { SITE_CONDITION, SITE_SIZE, SITE_THEMES } from "@/constants/site/site.options";
import { SiteFormData } from "@/schemas/site.schema";


export function applySiteSizeRule(data: Partial<SiteFormData>) {
  if (!data.size || data.size === "random") {
    data.size = getRandom(SITE_SIZE).value;
  }
  
  return data;
}

export function applySiteConditionRule(data: Partial<SiteFormData>) {
  if (!data.condition || data.condition === "random") {
    data.condition = getRandom(SITE_CONDITION).value;
  }
  
  return data;
}

export function applySiteThemeRule(data: Partial<SiteFormData>){
  if(shouldReplace(data.siteTheme)){
    const allThemeOptions = SITE_THEMES.flatMap(group => group.options);
     data.siteTheme = [getRandom(allThemeOptions).value];
  }
  return data;
}

export const commonRules = [applySiteSizeRule, applySiteConditionRule, applySiteThemeRule];
