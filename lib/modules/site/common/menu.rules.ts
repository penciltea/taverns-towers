import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByTerrain, MenuItemMappingByTerrainModel } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";
import { Types } from "mongoose";
import { MenuItemMappingByTag, MenuItemMappingByTagModel } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => Promise<GeneratorSiteMenuPlain[]>;

export const applyMenuItemsByConditions: MenuRuleFn = async (_items, context) => {
    const { climate, terrain, tags, magic, wealth, siteType, shopType } = context;

    const menuSupportedSiteTypes = ["tavern", "shop", "temple", "guild"]; // current list of site types that have a menu (menu/wares/services/etc.)
    if (!context.siteType || !menuSupportedSiteTypes.includes(context.siteType)) {
        return []; // skip entirely
    }

    // Query for climate
    // climate is a single string value
    const climateQuery: Partial<Pick<MenuItemMappingByClimateModel, "climate" | "siteType" | "shopType">> = { climate };
    if (siteType) climateQuery.siteType = siteType;
    if (siteType === "shop" && shopType) climateQuery.shopType = shopType;

    // Query for terrain
    // terrain is an array of strings
    type TerrainMappingQuery = Partial<Omit<MenuItemMappingByTerrainModel, "terrain">> & {
        terrain?: string | { $in: string[] };
    };

    const terrainQuery: TerrainMappingQuery = {};

    if (siteType) terrainQuery.siteType = siteType;
    if (siteType === "shop" && shopType) terrainQuery.shopType = shopType;
    if (terrain?.length) terrainQuery.terrain = { $in: terrain };


    // Query for tag
    // tag is an array of strings
    type TagMappingQuery = Partial<Omit<MenuItemMappingByTagModel, "tag">> & {
        tag?: string | { $in: string[] };
    };

    const tagQuery: TagMappingQuery = {};

    if (siteType) tagQuery.siteType = siteType;
    if (siteType === "shop" && shopType) tagQuery.shopType = shopType;
    if (tags?.length) tagQuery.tag = { $in: tags };



    const results = await Promise.allSettled([
        climate
            ? await MenuItemMappingByClimate.findOne(climateQuery).lean<MenuItemMappingByClimateModel>()
            : null,

        terrain
            ? await MenuItemMappingByTerrain.find(terrainQuery).lean<MenuItemMappingByTerrainModel[]>()
            : null,
        
        tags
            ? await MenuItemMappingByTag.find(tagQuery).lean<MenuItemMappingByTagModel[]>()
            : null,
        // ToDo: Add more DB calls for filtering by Terrain, Tags, etc.
    ]);

    const climateResult = results[0];

    const climateIds =
    climateResult.status === "fulfilled" && climateResult.value
        ? (climateResult.value as MenuItemMappingByClimateModel).items ?? []
        : [];


    const terrainResult = results[1];
 
    const terrainMappings =
    terrainResult.status === "fulfilled" && Array.isArray(terrainResult.value)
        ? terrainResult.value as MenuItemMappingByTerrainModel[]
        : [];

    const terrainIds = terrainMappings.flatMap(mapping => mapping.items ?? []);

    const tagResult = results[2];
 
    const tagMappings =
    tagResult.status === "fulfilled" && Array.isArray(tagResult.value)
        ? tagResult.value as MenuItemMappingByTagModel[]
        : [];

    const tagIds = tagMappings.flatMap(mapping => mapping.items ?? []);

    const combined = [
        ...climateIds,
        ...terrainIds,
        ...tagIds,

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


    console.log("climateIds: ", climateIds);
    console.log("terrainIds: ", terrainIds);
    console.log("tagIds: ", tagIds);

    //console.log("menu items: " , menuItems);
    
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