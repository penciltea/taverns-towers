import { Types } from "mongoose";
import { fetchMenuItemsByCondition, filterByWealthLevel, applyMenuSizeLimit, applyQuantityRule } from "@/lib/modules/site/common/menu.rules";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { getRandomSubset } from "@/lib/util/randomValues";
import { MenuItemMappingByClimate } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByMagic } from "@/lib/models/generator/site/menu/menuItemMappingByMagic.model";
import { MenuItemMappingByTag } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";
import { MenuItemMappingByTerrain } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";

jest.mock("@/lib/models/generator/site/menu.model", () => ({
    GeneratorSiteMenu: {
        find: jest.fn(),
    },
}));

jest.mock("@/lib/models/generator/site/menu/menuItemMappingByClimate.model", () => ({
    MenuItemMappingByClimate: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/menu/menuItemMappingByTerrain.model", () => ({
    MenuItemMappingByTerrain: { find: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/menu/menuItemMappingByTag.model", () => ({
    MenuItemMappingByTag: { find: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/menu/menuItemMappingByMagic.model", () => ({
    MenuItemMappingByMagic: { findOne: jest.fn() },
}));

jest.mock("@/lib/util/randomValues", () => ({
    getRandomSubset: jest.fn((arr, _opts) => arr.slice(0, 2)), // deterministic
}));

// helper to simulate mongoose query chains
function mockQuery<T>(result: T) {
    return { lean: jest.fn().mockResolvedValue(result) };
}

describe("Menu Generation Rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchMenuItemsByCondition", () => {
        it("returns empty array if siteType is missing or invalid", async () => {
            const context = { siteType: undefined } as any;
            const result = await fetchMenuItemsByCondition([], context);

            expect(result).toEqual([]);
        });

        it("uses fallback items if DB returns nothing", async () => {
            (MenuItemMappingByClimate.findOne as jest.Mock).mockReturnValue(mockQuery(null));
            (MenuItemMappingByTerrain.find as jest.Mock).mockReturnValue(mockQuery([]));
            (MenuItemMappingByTag.find as jest.Mock).mockReturnValue(mockQuery([]));
            (MenuItemMappingByMagic.findOne as jest.Mock).mockReturnValue(mockQuery(null));
            (GeneratorSiteMenu.find as jest.Mock).mockReturnValue(mockQuery([]));

            const context = {
                siteType: "tavern",
                climate: "temperate",
                terrain: ["forest"],
                tags: [],
                magic: undefined,
            };
            const result = await fetchMenuItemsByCondition([], context);

            expect(result).toBeInstanceOf(Array);
        });

        it("calls GeneratorSiteMenu.find if item IDs exist", async () => {
            const fakeItemId = new Types.ObjectId();

            // Mock the climate mapping to return one item
            (MenuItemMappingByClimate.findOne as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue({
                    climate: "temperate",
                    items: [
                        {
                            siteType: "tavern",
                            itemId: fakeItemId,
                            shopType: undefined,
                        },
                    ],
                }),
            });

            (MenuItemMappingByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
            (MenuItemMappingByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
            (MenuItemMappingByMagic.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

            // GeneratorSiteMenu.find needs to return an object with .lean()
            const leanMock = jest.fn().mockResolvedValue([{ _id: fakeItemId, name: "Ale", siteType: "tavern" }]);
            (GeneratorSiteMenu.find as jest.Mock).mockReturnValue({ lean: leanMock });

            const context = {
                siteType: "tavern",
                climate: "temperate",
                terrain: ["forest"],
                tags: [],
                magic: undefined,
            };

            const result = await fetchMenuItemsByCondition([], context);

            // Debug log to check if itemIds were populated
            console.log("Result:", result);

            expect(GeneratorSiteMenu.find).toHaveBeenCalled(); // ensure DB query was called
            expect(result.some((i) => i.name === "Ale")).toBe(true);
        });
    });

    describe("filterByWealthLevel", () => {
        const baseItems = [
            { name: "Cheap Ale", quality: "Poor" },
            { name: "Fine Wine", quality: "Fine" },
            { name: "Royal Feast", quality: "Masterwork" },
        ] as GeneratorSiteMenuPlain[];

        it("filters items for Impoverished", async () => {
            const context = { wealth: "Impoverished" };
            const filtered = await filterByWealthLevel(baseItems, context);

            expect(filtered.some((i: typeof baseItems[0]) => i.quality === "Masterwork")).toBe(false);
            expect(filtered.some((i: typeof baseItems[0]) => i.quality === "Poor")).toBe(true);
        });

        it("keeps most items for Wealthy", async () => {
            const context = { wealth: "Wealthy" };
            const filtered = await filterByWealthLevel(baseItems, context);

            expect(filtered.length).toBeGreaterThan(0);
        });
    });

    describe("applyMenuSizeLimit", () => {
        it("limits items using getRandomSubset", async () => {
            const items = [{ name: "Item1" }, { name: "Item2" }, { name: "Item3" }] as GeneratorSiteMenuPlain[];
            const context = { size: "Town", wealth: "Modest", siteSize: "modest", siteCondition: "average" };

            const result = await applyMenuSizeLimit(items, context);
            expect(getRandomSubset).toHaveBeenCalled();
            expect(result.length).toBeLessThanOrEqual(items.length);
        });
    });

    describe("applyQuantityRule", () => {
        it("assigns quantities based on site size and condition", async () => {
            const items = [
                { name: "Item1", quality: "Standard", rarity: "Common" },
                { name: "Item2", quality: "Exquisite", rarity: "Rare" },
            ] as GeneratorSiteMenuPlain[];

            const context = { siteSize: "modest", siteCondition: "average" };
            const result = await applyQuantityRule(items, context);

            result.forEach((i: any) => {
                expect(i.quantity).toBeDefined();
                expect(Number(i.quantity)).toBeGreaterThanOrEqual(1);
            });
        });
    });
});