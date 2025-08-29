import { generatorMenuItem, SiteGenerationContext } from "@/interfaces/site.interface";
import connectToDatabase from "@/lib/db/connect";
import { GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { MenuRuleFn, menuRulesBySiteType } from "./menu.rules";
import { getRandom } from "@/lib/util/randomValues";
import { FilterQuery } from "mongoose";

export function normalizeMenuItem(item: Partial<generatorMenuItem>): generatorMenuItem{
  return{
     name: item.name ?? "",
      description: item.description ?? "",
      category: item.category ?? "",
      price: typeof item.price === "string" ? item.price : String(item.price ?? ""),
      quality: item.quality ?? "",
      quantity: item.quantity ?? "1",
      rarity: item.rarity ?? ""
  }
}

export async function applyMenuRules({
  context,
  rules = [],
}: {
  context: SiteGenerationContext;
  rules: MenuRuleFn[];
}): Promise<GeneratorSiteMenuPlain[]> {
  await connectToDatabase();

  const baseQuery: FilterQuery<GeneratorSiteMenuPlain> = {
    siteType: context.siteType,
  };

  if (context.siteType === "shop" && context.shopType) {
    baseQuery.shopType = context.shopType;
  }

  let filteredItems: GeneratorSiteMenuPlain[] = [];
  for (const rule of rules) {
    filteredItems = await rule(filteredItems, context);
  }

  return filteredItems;
}

export async function generateMenu(
  context: SiteGenerationContext & { singleItem?: boolean }
): Promise<generatorMenuItem[]> {
  // Get rules by site type
  const rules = menuRulesBySiteType[context.siteType ?? ""] || [];

  const allItems = await applyMenuRules({ context, rules });

  if (!allItems.length) return [];

  // If singleItem flag is set to true, randomly pull an item from the list of available ones
  if (context.singleItem) {
    const randomItem = getRandom(allItems);
    return [normalizeMenuItem(randomItem)];
  }

  // Return full normalized list if singleItem is false or undefined
  return allItems.map(normalizeMenuItem);
}