import { getRandom } from "@/lib/util/randomValues";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import type { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationInput } from "./types";

type NormalizedShopInput = SiteFormData & {
  size: string;
  terrain: string[];
  tags: string[];
  climate: string;
};

function normalizeInput(data: SiteGenerationInput): NormalizedShopInput {
  const isShop = data.type === "shop";

  return {
    ...(data as SiteFormData),
    type: "shop",
    size: data.size && data.size !== "" ? data.size : "random",
    terrain: data.terrain && data.terrain.length > 0 ? data.terrain : ["random"],
    tags: data.tags && data.tags.length > 0 ? data.tags : ["random"],
    climate: data.climate && data.climate !== "" ? data.climate : "random",
    condition: data.condition && data.condition !== "" ? data.condition : "random",
    shopType:
      isShop && data.shopType && data.shopType !== "" 
        ? data.shopType
        : "random",
  };
}

async function applySizeRule(data: NormalizedShopInput) {
  if (data.size === "random" || !data.size) {
    const randomOption = getRandom(SITE_SIZE);
    data.size = randomOption.value;
  }
  return data;
}

async function applyConditionRule(data: NormalizedShopInput) {
  if (data.condition === "random" || !data.condition) {
    const randomOption = getRandom(SITE_CONDITION);
    data.condition = randomOption.value;
  }
  return data;
}

export async function generateShopValues(input: SiteGenerationInput): Promise<SiteFormData> {
    let data = normalizeInput(input);
    const rules = [
        applySizeRule,
        applyConditionRule,
    ];
    
    for ( const rule of rules ) {
      data = await rule(data);
    }

    return data;
}