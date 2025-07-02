import { generatorMenuItem, SiteGenerationContext } from "@/interfaces/site.interface";
import connectToDatabase from "@/lib/db/connect";
import { GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { MenuRuleFn, menuRulesBySiteType } from "./menu.rules";
import { getRandom } from "@/lib/util/randomValues";

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

  const baseQuery: any = {
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
  context: SiteGenerationContext
): Promise<generatorMenuItem[]> {
  // Get rules by site type
  const rules = menuRulesBySiteType[context.siteType ?? ""] || [];

  // Step 1: Fetch raw items using rules
  const items = await applyMenuRules({ context, rules });

  return items.map(normalizeMenuItem);
}

export async function generateMenuItem(
  context: SiteGenerationContext
): Promise<generatorMenuItem[]> {
  // Get rules by site type
  const rules = menuRulesBySiteType[context.siteType ?? ""] || [];

  // Fetch & Run through menu rules
  const allItems = await applyMenuRules({ context, rules });

  if (!allItems.length) return [];

  // Randomly pick an item from the list
  const randomItem = getRandom(allItems);

  // Normalize single item to the same shape as full menu items
  const normalizedItem = normalizeMenuItem(randomItem);

  return [normalizedItem];
}