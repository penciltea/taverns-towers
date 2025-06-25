import { SiteGenerationContext } from "@/interfaces/site.interface";
import connectToDatabase from "@/lib/db/connect";
import { GeneratorSiteMenuPlain, GeneratorSiteMenu } from "@/lib/models/generator/site/menu.model";
import { MenuRuleFn, menuRulesBySiteType } from "./menu.rules";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { SiteFormData } from "@/schemas/site.schema";
import { SETTLEMENT_SIZE_MULTIPLIERS, SETTLEMENT_WEALTH_BONUSES, SITE_SIZE_BASE, SITE_CONDITION_PENALTIES } from "./mappings";


export type GeneratorSiteMenuLean = Omit<GeneratorSiteMenuPlain, "_id" | "__v">;

export function hasMenuField(data: Partial<SiteFormData>): data is Partial<SiteFormData> & { menu: GeneratorSiteMenuLean[] } {
  return (
    data.type === "tavern" ||
    data.type === "temple" ||
    data.type === "shop" ||
    data.type === "guild"
  );
}

function calculateMenuItemLimit({
    settlementSize,
    settlementWealth,
    siteSize,
    siteCondition,
}: {
    settlementSize?: string;
    settlementWealth?: string;
    siteSize?: string;
    siteCondition?: string;
}): number {
    const baseMultiplier = SETTLEMENT_SIZE_MULTIPLIERS[settlementSize ?? "Town"] ?? 1;
    const wealthBonus = SETTLEMENT_WEALTH_BONUSES[settlementWealth ?? "Modest"] ?? 2;
    const sizeBase = SITE_SIZE_BASE[siteSize ?? "modest"] ?? 3;
    const conditionPenalty = SITE_CONDITION_PENALTIES[siteCondition ?? "average"] ?? 0;

    const result = (sizeBase + wealthBonus + conditionPenalty) * baseMultiplier;

    // debug block
    // console.log("baseMult: " , baseMultiplier);
    // console.log("wealthBonus: ", wealthBonus);
    // console.log("sizeBase: ", sizeBase);
    // console.log("conditionPenalty: " , conditionPenalty);
    // console.log("result: " , result);

    return Math.max(1, Math.floor(result));
}

export async function applyMenuItemLimitByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>> {
    if (!hasMenuField(data)) return data; // If siteType doesn't have a menu, return early

    const {
        size: settlementSize,
        wealth: settlementWealth,
    } = context;

    const {
        size: siteSize,
        condition: siteCondition,
        menu = [],
    } = data;

    const itemLimit = calculateMenuItemLimit({
        settlementSize,
        settlementWealth,
        siteSize,
        siteCondition,
    });

    // debug block 
    // console.log("menu.length before limit:", menu.length);
    // console.log("itemLimit:", itemLimit);

    return {
        ...data,
        menu: getRandomSubset(menu, { count: itemLimit }),
    };
}

export async function fetchMenuItems({
  context,
  rules = [],
}: {
  context: SiteGenerationContext;
  rules: MenuRuleFn[];
}): Promise<GeneratorSiteMenuPlain[]> {
  await connectToDatabase();

  const baseQuery: any = {
    siteType: context.siteType,
  };

  if (context.siteType === "shop" && context.shopType) {
    baseQuery.shopType = context.shopType;
  }

  const rawItems = await GeneratorSiteMenu.find(baseQuery).lean<GeneratorSiteMenuPlain[]>();

  let filteredItems = rawItems;
  for (const rule of rules) {
    filteredItems = await rule(filteredItems, context);
  }

  return filteredItems; // raw items with full data, including _id etc.
}

export async function generateMenu(
  context: SiteGenerationContext,
  partialFormData: Partial<SiteFormData>
): Promise<GeneratorSiteMenuLean[]> {
  // Get rules by site type
  const rules = menuRulesBySiteType[context.siteType ?? ""] || [];

  // Step 1: Fetch raw items using rules
  const rawItems = await fetchMenuItems({ context, rules });

  // Step 2: Apply menu item limit
  const limitedData = await applyMenuItemLimitByConditions(
    { ...partialFormData, menu: rawItems },
    context
  );

  if (hasMenuField(limitedData)) {
    return limitedData.menu.map(item => ({
      name: item.name ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      price: typeof item.price === "string" ? item.price : String(item.price ?? ""),
      quality: item.quality ?? "",
      rarity: item.rarity ?? "",
      magic: item.magic ?? "",
      siteType: item.siteType ?? "",
      climate: item.climate ?? [],
      terrain: item.terrain ?? [],
      tags: item.tags ?? [],
    }));
  }

  return []; // fallback if somehow called for a site with no menu
}

export async function generateMenuItem(
  context: SiteGenerationContext
): Promise<GeneratorSiteMenuLean[]> {
  // Get rules by site type
  const rules = menuRulesBySiteType[context.siteType ?? ""] || [];

  // Step 1: Fetch raw items using rules
  const allItems = await fetchMenuItems({ context, rules });

  if (!allItems.length) return [];

  const randomItem = getRandom(allItems);
  return [randomItem];
}