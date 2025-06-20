import { SiteGenerationContext } from "@/interfaces/site.interface";
import connectToDatabase from "@/lib/db/connect";
import { GeneratorSiteMenuPlain, GeneratorSiteMenu } from "@/lib/models/generator/site/menu.model";
import { MenuRuleFn } from "./menu.rules";

export type GeneratorSiteMenuLean = Omit<GeneratorSiteMenuPlain, "_id" | "__v">;

export async function generateMenuItems({
  context,
  rules = [],
  itemLimit = 5,
}: {
  context: SiteGenerationContext;
  rules: MenuRuleFn[];
  itemLimit?: number;
}): Promise<GeneratorSiteMenuLean[]> {
  await connectToDatabase();

  const baseQuery: any = {
    siteType: context.siteType,
  };

  if (context.siteType === "shop" && context.shopType) {
    baseQuery.shopType = context.shopType;
  }

  const rawItems = await GeneratorSiteMenu.find(baseQuery).lean<GeneratorSiteMenuLean[]>();

  // Apply all rules in order
  let filteredItems = rawItems;
  for (const rule of rules) {
    filteredItems = rule(filteredItems, context);
  }

  const finalItems = getRandomSubset(filteredItems, itemLimit).map(item => ({
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
    // omit _id, __v, or anything complex
  }));

  return finalItems;
}

// Utility function for sampling
function getRandomSubset<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}