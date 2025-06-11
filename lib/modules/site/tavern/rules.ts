import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";

// Tavern-specific rules (add more as needed)
async function applyTavernClienteleRule(
  data: Partial<SiteFormData>
): Promise<Partial<SiteFormData>> {
  if (data.type === "tavern" && !data.clientele) {
    data.clientele = "Adventurers, locals, and travelers";
  }
  return data;
}
const tavernRules = [
  ...commonRules,
  applyTavernClienteleRule, // add more custom tavern rules here
];

export const generateTavernData = createSiteGenerator("tavern", tavernRules);