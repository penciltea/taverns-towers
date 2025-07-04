import { Types } from "mongoose";
import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";
import { MenuItemMappingByClimate, MenuItemMappingByClimateModel } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByTerrain, MenuItemMappingByTerrainModel } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";
import { MenuItemMappingByTag, MenuItemMappingByTagModel } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";
import { MenuItemMappingEntry } from "@/lib/models/generator/site/menu/menu.type";
import { MenuItemMappingByMagic, MenuItemMappingByMagicModel } from "@/lib/models/generator/site/menu/menuItemMappingByMagic.model";
import { FALLBACK_CLIMATE_ITEMS, FALLBACK_TERRAIN_ITEMS, FALLBACK_TAG_ITEMS, FALLBACK_MAGIC_ITEMS, FALLBACK_UNIVERSAL_ITEMS } from "./mappings/menu.mappings";
import { getRandomSubset } from "@/lib/util/randomValues";
import { SETTLEMENT_SIZE_MULTIPLIERS, SETTLEMENT_WEALTH_BONUSES, SITE_SIZE_BASE, SITE_CONDITION_PENALTIES } from "./mappings/mappings";
import { siteTypeHasMenu } from "@/lib/util/siteHelpers";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => Promise<GeneratorSiteMenuPlain[]>;

export const fetchMenuItemsByCondition: MenuRuleFn = async (_items, context) => {
  const { climate, terrain, tags, magic, siteType, shopType, guildType } = context;

  if (!siteType || !siteTypeHasMenu(siteType)) return [];

  // Build queries (or null if not applicable)
  const climateQuery = climate ? { climate } : null;
  const terrainQuery = terrain?.length ? { terrain: { $in: terrain } } : null;
  const tagQuery = tags?.length ? { tag: { $in: tags } } : null;
  const magicQuery = magic ? { magic } : null;

  const [climateRes, terrainRes, tagRes, magicRes] = await Promise.allSettled([
    climateQuery ? MenuItemMappingByClimate.findOne(climateQuery).lean<MenuItemMappingByClimateModel>() : null,
    terrainQuery ? MenuItemMappingByTerrain.find(terrainQuery).lean<MenuItemMappingByTerrainModel>() : [],
    tagQuery ? MenuItemMappingByTag.find(tagQuery).lean<MenuItemMappingByTagModel>() : [],
    magicQuery ? MenuItemMappingByMagic.findOne(magicQuery).lean<MenuItemMappingByMagicModel>() : null,
  ]);

  const matchesContext = (item: { siteType: string; shopType?: string; guildType?: string | string[] }) => {
    if (item.siteType !== siteType) return false;
    if (siteType === "shop") return !shopType || item.shopType === shopType;
    if (siteType === "guild") {
      if (!guildType) return true;
      return Array.isArray(item.guildType) ? item.guildType.includes(guildType) : item.guildType === guildType;
    }
    return false;
  };

  function extractFromMapping(
    result: PromiseSettledResult<{ items: MenuItemMappingEntry[] } | { items: MenuItemMappingEntry[] }[] | null>,
    fallback: Record<string, GeneratorSiteMenuPlain[]> | undefined,
    keys: string[] | undefined,
  ): (GeneratorSiteMenuPlain | Types.ObjectId)[] {
    if (result.status === "fulfilled" && result.value) {
      const mappings = Array.isArray(result.value) ? result.value : [result.value];
      return mappings.flatMap(m =>
        (m.items ?? []).filter(matchesContext).map(i => i.itemId)
      );
    }
    if (fallback && keys?.length) {
      return keys.flatMap(key => (fallback[key] || []).filter(matchesContext));
    }
    return [];
  }

  // Helper to get fallback keys for universal items
  function getUniversalKeys() {
    if (siteType === "shop") return shopType ? [shopType] : [];
    if (siteType === "guild") {
      if (Array.isArray(guildType)) return guildType;
      if (typeof guildType === "string") return [guildType];
    }
    return [];
  }

  const fallbackContext = { siteType, shopType, guildType };

  const climateIds = extractFromMapping(climateRes, FALLBACK_CLIMATE_ITEMS, climate ? [climate] : []);
  const terrainIds = extractFromMapping(terrainRes, FALLBACK_TERRAIN_ITEMS, terrain ?? []);
  const tagIds = extractFromMapping(tagRes, FALLBACK_TAG_ITEMS, tags ?? []);
  const magicIds = extractFromMapping(magicRes, FALLBACK_MAGIC_ITEMS, magic ? [magic] : []);

  // Build universal query for DB
  const universalQuery: any = {
    siteType,
    climate: { $size: 0 },
    terrain: { $size: 0 },
    tags: { $size: 0 },
  };

  if (siteType === "shop" && shopType) universalQuery.shopType = shopType;
  if (siteType === "guild" && guildType) {
    universalQuery.guildType = Array.isArray(guildType) ? { $in: guildType } : guildType;
  }

  // Fetch universal items from DB or fallback
  let universalFallbackItems: GeneratorSiteMenuPlain[] = [];

  try {
    universalFallbackItems = await GeneratorSiteMenu.find(universalQuery).lean<GeneratorSiteMenuPlain[]>();
    if (!universalFallbackItems.length) {
      const keys = getUniversalKeys();
      universalFallbackItems = keys.flatMap(key => FALLBACK_UNIVERSAL_ITEMS[key] ?? []);
    }
  } catch {
    const keys = getUniversalKeys();
    universalFallbackItems = keys.flatMap(key => FALLBACK_UNIVERSAL_ITEMS[key] ?? []);
  }

  // Combine all fallback items
  const allFallbackItems = [...climateIds, ...terrainIds, ...tagIds, ...magicIds, ...universalFallbackItems];

  // Separate IDs and full fallback items
  const itemIds: Types.ObjectId[] = [];
  const fullItems: GeneratorSiteMenuPlain[] = [];

  for (const item of allFallbackItems) {
    if (typeof item === "object" && "name" in item && "price" in item && "siteType" in item) {
      fullItems.push(item);
    } else {
      itemIds.push(typeof item === "string" ? new Types.ObjectId(item) : item);
    }
  }

  const dbItems = itemIds.length
    ? await GeneratorSiteMenu.find({ _id: { $in: itemIds } }).lean<GeneratorSiteMenuPlain[]>()
    : [];

  return [...dbItems, ...fullItems];
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

export const applyMenuSizeLimit: MenuRuleFn = async (items, context) => {
  const {
    size: settlementSize,
    wealth: settlementWealth,
    siteSize,
    siteCondition,
  } = context;

  const baseMultiplier = SETTLEMENT_SIZE_MULTIPLIERS[settlementSize ?? "Town"] ?? 1;
  const wealthBonus = SETTLEMENT_WEALTH_BONUSES[settlementWealth ?? "Modest"] ?? 2;
  const sizeBase = SITE_SIZE_BASE[siteSize ?? "modest"] ?? 3;
  const conditionPenalty = SITE_CONDITION_PENALTIES[siteCondition ?? "average"] ?? 0;

  const result = (sizeBase + wealthBonus + conditionPenalty) * baseMultiplier;
  const itemLimit = Math.max(1, Math.floor(result));

  // Debug block
  // console.log("ItemLimit: ", itemLimit)

  return getRandomSubset(items, { count: itemLimit });
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
    const quantity = Math.max(1, Math.min(baseQty, 10)).toString();

    
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
  fetchMenuItemsByCondition,
  filterByWealthLevel,
  applyMenuSizeLimit,
  applyQuantityRule
];

export function withCommonRules(rules: MenuRuleFn[]): MenuRuleFn[] {
  return [...commonMenuRules, ...rules];
}

export const menuRulesBySiteType: Record<string, MenuRuleFn[]> = {
  tavern: withCommonRules(tavernMenuRules),
  shop: withCommonRules([]),
  temple: withCommonRules([]),
  guild: withCommonRules([]),
};