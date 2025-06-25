import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { ShopSite, SiteGenerationInput } from "@/interfaces/site.interface";

export function isShopSite(data: Partial<SiteFormData>): data is Partial<ShopSite> {
  return data.type === "shop";
}

const shopRules = [
  ...commonRules
];

export async function generateShopData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("shop", shopRules)(input);
}