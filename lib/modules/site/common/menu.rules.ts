import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByTerrain, MenuItemMappingByTerrainModel } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";
import { Types } from "mongoose";
import { MenuItemMappingByTag, MenuItemMappingByTagModel } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";
import { MenuItemMappingEntry } from "@/lib/models/generator/site/menu/menu.type";
import { MenuItemMappingByMagic, MenuItemMappingByMagicModel } from "@/lib/models/generator/site/menu/menuItemMappingByMagic.model";

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

export const fetchMenuItemsByEnvironment: MenuRuleFn = async (_items, context) => {
    const { climate, terrain, tags, magic, siteType, shopType } = context;

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

    type MagicMappingQuery = BaseMappingQuery & {
        magic?: string;
    }

    const climateQuery: ClimateMappingQuery = {};
    if (climate) climateQuery.climate = climate;

    const terrainQuery: TerrainMappingQuery = {};
    if (terrain?.length) terrainQuery.terrain = { $in: terrain };

    const tagQuery: TagMappingQuery = {};
    if (tags?.length) tagQuery.tag = { $in: tags };

    const magicQuery: MagicMappingQuery = {};
    if (magic) magicQuery.magic = magic;

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
        magic
            ? MenuItemMappingByMagic.findOne(magicQuery).lean<MenuItemMappingByMagicModel>()
            : null,
    ]);

    // Helper: extract valid ObjectIds
    function extractItemIdsFromSingle<T extends MappingDocumentWithItems>(
        result: PromiseSettledResult<T | null | undefined>,
        options: {
            siteType?: string;
            shopType?: string;
            matchField?: keyof T;      // e.g., "tag" or "terrain"
            matchValues?: string[];    // e.g., ["Fishing", "Port"]
        } = {}
    ): Types.ObjectId[] {
        const { siteType, shopType, matchField, matchValues } = options;

        if (result.status !== "fulfilled" || !result.value) return [];

        // Wrap single result into array for consistent processing
        const mappings = Array.isArray(result.value) ? result.value : [result.value];

        return mappings
            .filter(mapping => {
                if (!matchField || !matchValues) return true;
                const fieldValue = mapping[matchField];
                return typeof fieldValue === "string" && matchValues.includes(fieldValue);
            })
            .flatMap(mapping =>
                mapping.items
                    ?.filter((item: MenuItemMappingEntry) => item.siteType === siteType && (!shopType || item.shopType === shopType))
                    .map((item: MenuItemMappingEntry) => item.itemId) ?? []
            );
    }

    function extractItemIdsFromMany<T extends MappingDocumentWithItems>(
        result: PromiseSettledResult<T[] | null | undefined>,
        options: {
            siteType?: string;
            shopType?: string;
            matchField?: keyof T;          // e.g., "tag" or "terrain"
            matchValues?: string[];        // e.g., ["Fishing", "Port"]
        } = {}
    ): Types.ObjectId[] {
        const { siteType, shopType, matchField, matchValues } = options;

        if (result.status !== "fulfilled" || !result.value) return [];

        return result.value.filter(mapping => {
            if (!matchField || !matchValues) return true;
            const fieldValue = mapping[matchField];
            return typeof fieldValue === "string" && matchValues.includes(fieldValue);
        })
        .flatMap(mapping =>
            mapping.items
                ?.filter(item =>
                item.siteType === siteType && (!shopType || item.shopType === shopType)
                )
                .map(item => item.itemId) ?? []
        );
    }
        

    // Extract IDs
    const climateIds = extractItemIdsFromSingle(results[0], {
        siteType,
        shopType,
    });

    const terrainIds = extractItemIdsFromMany<MenuItemMappingByTerrainModel>(results[1], {
        matchField: "terrain",
        matchValues: terrain,
        siteType,
        shopType
    });
    const tagIds = extractItemIdsFromMany<MenuItemMappingByTagModel>(results[2], {
        matchField: "tag",
        matchValues: tags,
        siteType,
        shopType
    });

    const magicIds = extractItemIdsFromSingle(results[3], {
        siteType,
        shopType,
    });

    const combined = [
        ...climateIds,
        ...terrainIds,
        ...tagIds,
        ...magicIds,

    ];
    const uniqueIds: (string | Types.ObjectId)[] = Array.from(new Set(combined));

    const parsedIds = uniqueIds
        .filter(id => Types.ObjectId.isValid(id))  // filters both string/ObjectId
        .map(id => typeof id === "string" ? new Types.ObjectId(id) : id);

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
    // console.log("context: " , context);
    // console.log("climateIds: ", climateIds);
    // console.log("terrainIds: ", terrainIds);
    // console.log("tagIds: ", tagIds);
    // console.log("magicIds: ", magicIds);
    // console.log("menu items: " , menuItems);
    // console.log("finalItems: ", finalItems);

    // console.log("parsedIds:", parsedIds);
    // const rawMenuDocs = await GeneratorSiteMenu.find({}).lean();
    // const matched = rawMenuDocs.filter(doc => parsedIds.some(id => id.toString() === doc._id.toString()));
    // console.log("Matched docs:", matched);

    return finalItems;
};


export const filterByWealthLevel: MenuRuleFn = async (items, context) => {
  const { wealth } = context;
  if (!wealth) return items;

  // console.log("wealth: " , wealth);

  return items.filter(item => {
    const quality = item.quality ?? "Standard";

    switch (wealth) {
      case "Impoverished":
        if (["Exquisite", "Masterwork"].includes(quality)) return false;
        if (quality === "Fine") return Math.random() < 0.1;
        return true;

      case "Struggling":
        if (["Exquisite", "Masterwork"].includes(quality)) return false;
        if (quality === "Fine") return Math.random() < 0.25;
        return true;

      case "Modest":
        if (["Exquisite", "Masterwork"].includes(quality)) return Math.random() < 0.33;
        return true;

      case "Wealthy":
        if (quality === "Poor") return false;
        if (["Exquisite", "Masterwork"].includes(quality)) return Math.random() < 0.8;
        return true;

      case "Affluent":
        if (quality === "Poor") return false;
        return true;

      default:
        return true;
    }
  });
};

export const applyQuantityRule: MenuRuleFn = async (items, context) => {
  const { siteSize, siteCondition } = context;

  const sizeWeights: Record<string, number> = {
    tiny: 1,
    small: 2,
    modest: 3,
    large: 4,
    grand: 5,
    sprawling: 6,
  };

  const conditionWeights: Record<string, number> = {
    squalid: -1,
    poor: 0,
    average: 1,
    wealthy: 2,
    aristocratic: 3,
  };

  const qualityPenalties: Record<string, number> = {
    Poor: 1,
    Standard: 0,
    Fine: -1,
    Masterwork: -2,
    Exquisite: -3,
  };

  const rarityPenalties: Record<string, number> = {
    Common: 1,
    Uncommon: 0,
    Rare: -1,
    "Very Rare": -2,
    Legendary: -3,
  };

  const sizeVal = siteSize ? sizeWeights[siteSize] ?? 3 : 3;
  const conditionVal = siteCondition ? conditionWeights[siteCondition] ?? 1 : 1;

  return items.map((item) => {
    const qualityPenalty = item.quality ? qualityPenalties[item.quality] ?? 0 : 0;
    const rarityPenalty = item.rarity ? rarityPenalties[item.rarity] ?? 0 : 0;

    const baseQty = sizeVal + conditionVal + qualityPenalty + rarityPenalty;
    const quantity = Math.max(0, Math.min(baseQty, 10)).toString();

    
    return {
      ...item,
      quantity,
      description: item.description ?? "",
      name: item.name ?? "Unnamed Item",
      price: item.price ?? "0",
    };
  });
};


const commonMenuRules: MenuRuleFn[] = [
  fetchMenuItemsByEnvironment,
  filterByWealthLevel,
  applyQuantityRule
];

export function withCommonRules(rules: MenuRuleFn[]): MenuRuleFn[] {
  return [...commonMenuRules, ...rules];
}

export const menuRulesBySiteType: Record<string, MenuRuleFn[]> = {
  tavern: [...commonMenuRules, ...tavernMenuRules],
  // shop: [...commonMenuRules],
  //temple: [filterByTags],
};