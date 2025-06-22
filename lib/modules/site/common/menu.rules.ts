import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => Promise<GeneratorSiteMenuPlain[]>;

export const applyMenuItemsByConditions: MenuRuleFn = async (_items, context) => {
    const { climate, terrain, tags, magic, wealth, siteType, shopType } = context;

    const menuSupportedSiteTypes = ["tavern", "shop", "temple", "guild"];
    if (!context.siteType || !menuSupportedSiteTypes.includes(context.siteType)) {
        return []; // skip entirely
    }

    const mappingQuery: Record<string, any> = { climate };
    if (siteType) mappingQuery.siteType = siteType;
    if (siteType === "shop" && shopType) mappingQuery.shopType = shopType;

    console.log("mapping: " , mappingQuery);

    const results = await Promise.allSettled([
        climate
            ? await MenuItemMappingByClimate.findOne(mappingQuery).lean<MenuItemMappingByClimateModel>()
            : null
        // ToDo: Add more DB calls for filtering by Terrain, Tags, etc.
    ]);

    const climateResult = results[0];

    const climateIds =
    climateResult.status === "fulfilled" && climateResult.value
        ? (climateResult.value as MenuItemMappingByClimateModel).items ?? []
        : [];

    console.log("climateIds: ", climateIds);

    const combined = [
        ...climateIds
    ]; // ToDo: Update with more DB calls/filtering
    const uniqueIds = Array.from(new Set(combined));

    const menuItems = await GeneratorSiteMenu.find({
        _id: { $in: uniqueIds },
    }).lean<GeneratorSiteMenuPlain[]>();
    
    return menuItems;
};



export const filterByClimate: MenuRuleFn = (items, context) => {
    //console.log("Context: ", context);
    //console.log("Items: " , items);
  if (!context.climate) return items;
  return items.filter(
    item => !item.climate?.length || item.climate.includes(context.climate!)
  );
};

export const filterByTerrain: MenuRuleFn = (items, context) => {
  if (!context.terrain?.length) return items;
  return items.filter(
    item =>
      !item.terrain?.length ||
      item.terrain.some(t => context.terrain!.includes(t))
  );
};

export const filterByMagicLevel: MenuRuleFn = (items, context) => {
  if (!context.magic) return items;
  return items.filter(
    item => !item.magic || item.magic <= context.magic!
  );
};

const commonMenuRules: MenuRuleFn[] = [
  applyMenuItemsByConditions
  // Add more tavern-specific rules here
];

export function withCommonRules(rules: MenuRuleFn[]): MenuRuleFn[] {
  return [...commonMenuRules, ...rules];
}

export const menuRulesBySiteType: Record<string, MenuRuleFn[]> = {
  tavern: [...commonMenuRules, ...tavernMenuRules],
  //shop: [filterByClimate, filterByMagicLevel],
  //temple: [filterByTags],
};