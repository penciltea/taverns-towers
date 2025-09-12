import { Query, Types } from "mongoose";
import { fetchMenuItemsByCondition, filterByWealthLevel, applyMenuSizeLimit, applyQuantityRule } from "@/lib/modules/site/common/menu.rules";
import { GeneratorSiteMenu, GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { getRandomSubset } from "@/lib/util/randomValues";
import { MenuItemMappingByClimate } from "@/lib/models/generator/site/menu/menuItemMappingByClimate.model";
import { MenuItemMappingByMagic } from "@/lib/models/generator/site/menu/menuItemMappingByMagic.model";
import { MenuItemMappingByTag } from "@/lib/models/generator/site/menu/menuItemMappingByTag.model";
import { MenuItemMappingByTerrain } from "@/lib/models/generator/site/menu/menuItemMappingByTerrain.model";

jest.mock("@/lib/models/generator/site/menu.model", () => ({
    GeneratorSiteMenu: { find: jest.fn() },
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
    getRandomSubset: jest.fn((arr: string[]) => arr.slice(0, 2)), // deterministic
}));

// Helper to simulate mongoose query chains
function mockQuery<T>(result: T): Query<T & Document, T> {
  return {
    lean: jest.fn().mockResolvedValue(result),
    exec: jest.fn().mockResolvedValue(result),
  } as unknown as Query<T & Document, T>;
}

describe("Menu Generation Rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchMenuItemsByCondition", () => {
        it("returns empty array if siteType is missing or invalid", async () => {
            const context = { siteType: undefined };
            const result = await fetchMenuItemsByCondition([], context);
            expect(result).toEqual([]);
        });

        it("uses fallback items if DB returns nothing", async () => {
            (MenuItemMappingByClimate.findOne as jest.MockedFunction<
                typeof MenuItemMappingByClimate.findOne
            >).mockReturnValue(mockQuery(null));

            (MenuItemMappingByTerrain.find as jest.MockedFunction<
                typeof MenuItemMappingByTerrain.find
            >).mockReturnValue(mockQuery([]));

            (MenuItemMappingByTag.find as jest.MockedFunction<typeof MenuItemMappingByTag.find>).mockReturnValue(
                mockQuery([])
            );

            (MenuItemMappingByMagic.findOne as jest.MockedFunction<
                typeof MenuItemMappingByMagic.findOne
            >).mockReturnValue(mockQuery(null));

            (GeneratorSiteMenu.find as jest.MockedFunction<typeof GeneratorSiteMenu.find>).mockReturnValue(
                mockQuery([])
            );

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

            (MenuItemMappingByClimate.findOne as jest.MockedFunction<
                typeof MenuItemMappingByClimate.findOne
                >).mockReturnValue(
                mockQuery({
                    climate: "temperate",
                    items: [
                    { siteType: "tavern", itemId: fakeItemId, shopType: undefined },
                    ],
                })
            );

            (MenuItemMappingByTerrain.find as jest.MockedFunction<
                typeof MenuItemMappingByTerrain.find
            >).mockReturnValue(mockQuery([]));

            (MenuItemMappingByTag.find as jest.MockedFunction<
                typeof MenuItemMappingByTag.find
            >).mockReturnValue(mockQuery([]));

            (MenuItemMappingByMagic.findOne as jest.MockedFunction<
                typeof MenuItemMappingByMagic.findOne
            >).mockReturnValue(mockQuery(null));

            (GeneratorSiteMenu.find as jest.MockedFunction<
                typeof GeneratorSiteMenu.find
            >).mockReturnValue(
                mockQuery([{ _id: fakeItemId, name: "Ale", siteType: "tavern" }])
            );

            const context = {
                siteType: "tavern",
                climate: "temperate",
                terrain: ["forest"],
                tags: [],
                magic: undefined,
            };

            const result = await fetchMenuItemsByCondition([], context);
            console.log("Result:", result);

            expect(GeneratorSiteMenu.find).toHaveBeenCalled();
            expect(result.some((i) => i.name === "Ale")).toBe(true);
        });
    });

    describe("filterByWealthLevel", () => {
        const baseItems: GeneratorSiteMenuPlain[] = [
            { name: "Cheap Ale", quality: "Poor", price: "1cp", siteType: "tavern" },
            { name: "Fine Wine", quality: "Fine", price: "2cp", siteType: "tavern" },
            { name: "Royal Feast", quality: "Masterwork", price: "3cp", siteType: "tavern" },
        ];

        it("filters items for Impoverished", async () => {
            const context = { wealth: "Impoverished" };
            const filtered = await filterByWealthLevel(baseItems, context);

            expect(filtered.some((i) => i.quality === "Masterwork")).toBe(false);
            expect(filtered.some((i) => i.quality === "Poor")).toBe(true);
            });

        it("keeps most items for Wealthy", async () => {
            const context = { wealth: "Wealthy" };
            const filtered = await filterByWealthLevel(baseItems, context);
            expect(filtered.length).toBeGreaterThan(0);
        });
    });

    describe("applyMenuSizeLimit", () => {
        it("limits items using getRandomSubset", async () => {
            const items: GeneratorSiteMenuPlain[] = [
                { name: "Item1", price: "1cp", siteType: "tavern" },
                { name: "Item2", price: "2cp", siteType: "tavern" },
                { name: "Item3", price: "3cp", siteType: "tavern" },
            ];
            const context = { size: "Town", wealth: "Modest", siteSize: "modest", siteCondition: "average" };

            const result = await applyMenuSizeLimit(items, context);

            expect(getRandomSubset).toHaveBeenCalled();
            expect(result.length).toBeLessThanOrEqual(items.length);
        });
    });

    describe("applyQuantityRule", () => {
        it("assigns quantities based on site size and condition", async () => {
            const items: GeneratorSiteMenuPlain[] = [
                { name: "Item1", quality: "Standard", rarity: "Common", price: "1cp", siteType: "tavern" },
                { name: "Item2", quality: "Exquisite", rarity: "Rare", price: "2cp", siteType: "tavern" },
            ];

            const context = { siteSize: "modest", siteCondition: "average" };
            const result = await applyQuantityRule(items, context);

            result.forEach((i) => {
                expect(i.quantity).toBeDefined();
                expect(Number(i.quantity)).toBeGreaterThanOrEqual(1);
            });
        });
    });
});