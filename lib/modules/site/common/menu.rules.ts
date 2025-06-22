import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByTerrain, MenuItemMappingByTerrainModel } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";
import { Types } from "mongoose";

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

    const climateQuery: Record<string, any> = { climate };
    if (siteType) climateQuery.siteType = siteType;
    if (siteType === "shop" && shopType) climateQuery.shopType = shopType;

    const terrainQuery: Record<string, any> = {};
    if (siteType) terrainQuery.siteType = siteType;
    if (siteType === "shop" && shopType) terrainQuery.shopType = shopType;
    if (terrain?.length) terrainQuery.terrain = { $in: terrain };

    const results = await Promise.allSettled([
        climate
            ? await MenuItemMappingByClimate.findOne(climateQuery).lean<MenuItemMappingByClimateModel>()
            : null,

        terrain
            ? await MenuItemMappingByTerrain.find(terrainQuery).lean<MenuItemMappingByTerrainModel[]>()
            : null
        // ToDo: Add more DB calls for filtering by Terrain, Tags, etc.
    ]);

    const climateResult = results[0];

    const climateIds =
    climateResult.status === "fulfilled" && climateResult.value
        ? (climateResult.value as MenuItemMappingByClimateModel).items ?? []
        : [];

    console.log("climateIds: ", climateIds);

    const terrainResult = results[1];
 
    const terrainMappings =
    terrainResult.status === "fulfilled" && Array.isArray(terrainResult.value)
        ? terrainResult.value as MenuItemMappingByTerrainModel[]
        : [];

    const terrainIds = terrainMappings.flatMap(mapping => mapping.items ?? []);

    const combined = [
        ...climateIds,
        ...terrainIds
    ]; // ToDo: Update with more DB calls/filtering
    const uniqueIds: (string | Types.ObjectId)[] = Array.from(new Set(combined));

    const parsedIds = uniqueIds.map(id =>
    typeof id === "string" && id.startsWith("ObjectId(")
        ? new Types.ObjectId(id.replace(/ObjectId\(['"]?|['"]?\)/g, ""))
        : id
    );

    const menuItems = await GeneratorSiteMenu.find({
        _id: { $in: parsedIds },
    }).lean<GeneratorSiteMenuPlain[]>();

    console.log("menu items: " , menuItems);
    
    return menuItems;
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