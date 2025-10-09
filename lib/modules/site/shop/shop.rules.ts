import { SiteFormData } from "@/schemas/site.schema";
import { ShopSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { commonRules } from "../common/rules";
import { SHOP_TYPE_CATEGORIES, SiteShopType } from "@/constants/site/site.options";
import { getRandom } from "@/lib/util/randomValues";

export function isShopSite(data: Partial<SiteFormData>): data is Partial<ShopSite> {
  return data.type === "shop";
}

export function applyShopTypeRule(data: Partial<SiteFormData>){
  if (!isShopSite(data)) return data;

  if (!data.shopType || data.shopType === "random") {
    const allShopTypes: SiteShopType[] = SHOP_TYPE_CATEGORIES.flatMap(category =>
      category.options.map(option => option.value) as SiteShopType[]
    );

    data.shopType = getRandom(allShopTypes);
  }

  return data;
}

const shopRules = [
  applyShopTypeRule,
  ...commonRules,
];

export async function generateShopData(input: SiteGenerationInput): Promise<SiteFormData> {
  return await createSiteGenerator("shop", shopRules)(input);
}
