import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByTerrain, MenuItemMappingByTerrainModel } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";
import { Types } from "mongoose";
import { MenuItemMappingByTag, MenuItemMappingByTagModel } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";
import { MenuItemMappingEntry } from "@/lib/models/generator/site/menu/menu.type";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => Promise<GeneratorSiteMenuPlain[]>;

type BaseMappingQuery = {
  siteType?: string;
  shopType?: string;
};

interface MappingDocumentWithItems {
  items?: MenuItemMappingEntry[];
}

export const applyMenuItemsByConditions: MenuRuleFn = async (_items, context) => {
    const { climate, terrain, tags, magic, wealth, siteType, shopType } = context;

    console.log("context: " , context);

    const menuSupportedSiteTypes = ["tavern", "shop", "temple", "guild"]; // current list of site types that have a menu (menu/wares/services/etc.)
    if (!context.siteType || !menuSupportedSiteTypes.includes(context.siteType)) {
        return []; // skip entirely
    }

    // Query conditions
    type ClimateMappingQuery = BaseMappingQuery & {
        climate?: string;
    };

    type TerrainMappingQuery = BaseMappingQuery & {
        terrain?: string | { $in: string[] };
    };

    type TagMappingQuery = BaseMappingQuery & {
        tag?: string | { $in: string[] };
    };

    const climateQuery: ClimateMappingQuery = {};
    if (climate) climateQuery.climate = climate;

    const terrainQuery: TerrainMappingQuery = {};
    if (terrain?.length) terrainQuery.terrain = { $in: terrain };

    const tagQuery: TagMappingQuery = {};
    if (tags?.length) tagQuery.tag = { $in: tags };

    // Fetch all mapping documents in parallel
    const results = await Promise.allSettled([
        climate
            ? MenuItemMappingByClimate.findOne(climateQuery).lean<MenuItemMappingByClimateModel>()
            : null,
        terrain?.length
            ? MenuItemMappingByTerrain.find(terrainQuery).lean<MenuItemMappingByTerrainModel[]>()
            : [],
        tags?.length
            ? MenuItemMappingByTag.find(tagQuery).lean<MenuItemMappingByTagModel[]>()
            : [],
    ]);

    // Helper: extract valid ObjectIds
    function extractItemIdsFromSingle(
        result: PromiseSettledResult<MappingDocumentWithItems | null | undefined>
    ): Types.ObjectId[] {
        if (result.status !== "fulfilled" || !result.value) return [];

        const mappings = Array.isArray(result.value) ? result.value : [result.value];
        return mappings.flatMap(m =>
            m.items?.filter(
                (item: MenuItemMappingEntry) => item.siteType === siteType && (!shopType || item.shopType === shopType)
            ).map((item: MenuItemMappingEntry) => item.itemId) ?? []
        );
    }

    function extractItemIdsFromMany(
        result: PromiseSettledResult<MappingDocumentWithItems[] | null | undefined>
    ): Types.ObjectId[] {
        if (result.status !== "fulfilled" || !result.value) return [];

        return result.value.flatMap(mapping =>
            mapping.items
            ?.filter(item => item.siteType === siteType && (!shopType || item.shopType === shopType))
            .map(item => item.itemId) ?? []
        );
    }

    // Extract IDs
    const climateIds = extractItemIdsFromSingle(results[0]);
    const terrainIds = extractItemIdsFromMany(results[1]);
    const tagIds = extractItemIdsFromMany(results[2]);


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

    // Extra items that are universal
    const universalItems = await GeneratorSiteMenu.find({
        siteType: context.siteType,
        climate: { $size: 0 },
        terrain: { $size: 0 },
        tags: { $size: 0 },
    }).lean<GeneratorSiteMenuPlain[]>();

    const finalItems = [...menuItems, ...universalItems];

    // Debug block
    // console.log("climateIds: ", climateIds);
    // console.log("terrainIds: ", terrainIds);
    // console.log("tagIds: ", tagIds);
    // console.log("menu items: " , menuItems);
    // console.log("finalItems: ", finalItems);

    
    return finalItems;
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