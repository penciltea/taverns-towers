import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { ShopSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { SHOP_TYPE_CATEGORIES } from "@/constants/siteOptions";
import { getRandom } from "@/lib/util/randomValues";

export function isShopSite(data: Partial<SiteFormData>): data is Partial<ShopSite> {
  return data.type === "shop";
}

export async function applyShopTypeRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!isShopSite(data)) return data;

  if (!data.shopType || data.shopType === "random") {
    // Flatten all options' values into one array
    const allShopTypes = SHOP_TYPE_CATEGORIES.flatMap(category =>
      category.options.map(option => option.value)
    );

    data.shopType = getRandom(allShopTypes);
  }

  return data;
}

const shopRules = [
  applyShopTypeRule,
  ...commonRules
];

export async function generateShopData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("shop", shopRules)(input);
}