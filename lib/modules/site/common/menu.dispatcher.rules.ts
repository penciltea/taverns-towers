import { generateMenu, applyMenuRules, normalizeMenuItem } from "./menu.dispatcher";
import connectToDatabase from "@/lib/db/connect";
import { getRandom } from "@/lib/util/randomValues";
import { GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { SiteGenerationContext } from "@/interfaces/site.interface";

// Mock dependencies
jest.mock("@/lib/db/connect", () => jest.fn());
jest.mock("@/lib/util/randomValues", () => ({
  getRandom: jest.fn(),
}));

// Fully typed MenuRuleFn mocks
import type { MenuRuleFn } from "./menu.rules";

const tavernRule: jest.Mock<ReturnType<MenuRuleFn>, Parameters<MenuRuleFn>> = jest.fn();
const shopRule: jest.Mock<ReturnType<MenuRuleFn>, Parameters<MenuRuleFn>> = jest.fn();

jest.mock("../menu.rules", () => ({
  menuRulesBySiteType: {
    tavern: [tavernRule],
    shop: [shopRule],
  },
}));

describe("normalizeMenuItem", () => {
    it("fills missing fields with defaults", () => {
        const result = normalizeMenuItem({});
        expect(result).toEqual({
        name: "",
        description: "",
        category: "",
        price: "0",
        quality: "",
        quantity: "1",
        rarity: "",
        });
    });

    it("converts numeric price to string", () => {
        const result = normalizeMenuItem({ price: '50' });
        expect(result.price).toBe("50");
    });

    it("leaves string price unchanged", () => {
        const result = normalizeMenuItem({ price: "10 gp" });
        expect(result.price).toBe("10 gp");
    });
});

describe("applyMenuRules", () => {
    beforeEach(() => {
        (connectToDatabase as jest.Mock).mockResolvedValue(undefined);
        tavernRule.mockReset();
        shopRule.mockReset();
    });

    it("calls connectToDatabase and applies rules", async () => {
        const context: SiteGenerationContext = { siteType: "tavern" };
        tavernRule.mockResolvedValue([{ name: "foo", siteType: "tavern", price: "1 gp" }]);

        const result = await applyMenuRules({ context, rules: [tavernRule] });

        expect(connectToDatabase).toHaveBeenCalled();
        expect(tavernRule).toHaveBeenCalledWith([], context);
        expect(result).toEqual([{ name: "foo", siteType: "tavern", price: "1 gp" }]);
    });

    it("applies multiple rules sequentially", async () => {
        const context: SiteGenerationContext = { siteType: "shop", shopType: "blacksmith" };
        const firstRule = jest.fn<ReturnType<MenuRuleFn>, Parameters<MenuRuleFn>>().mockResolvedValue([
            { name: "foo", siteType: "shop", price: "2 gp" },
        ]);
        const secondRule = jest.fn<ReturnType<MenuRuleFn>, Parameters<MenuRuleFn>>().mockResolvedValue([
            { name: "bar", siteType: "shop", price: "3 gp" },
        ]);

        const result = await applyMenuRules({ context, rules: [firstRule, secondRule] });

        expect(firstRule).toHaveBeenCalledWith([], context);
        expect(secondRule).toHaveBeenCalledWith([{ name: "foo", siteType: "shop", price: "2 gp" }], context);
        expect(result).toEqual([{ name: "bar", siteType: "shop", price: "3 gp" }]);
    });
});

describe("generateMenu", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns empty array if no items", async () => {
        tavernRule.mockResolvedValue([]);
        const context: SiteGenerationContext = { siteType: "tavern" };
        const result = await generateMenu(context);
        expect(result).toEqual([]);
    });

    it("returns a single random item when singleItem flag is true", async () => {
        const item: GeneratorSiteMenuPlain = { name: "Ale", price: "2 gp", siteType: "tavern" };
        tavernRule.mockResolvedValue([item]);
        (getRandom as jest.Mock).mockReturnValue(item);

        const context: SiteGenerationContext & { singleItem: true } = { siteType: "tavern", singleItem: true };
        const result = await generateMenu(context);
        expect(result).toEqual([normalizeMenuItem(item)]);
        expect(getRandom).toHaveBeenCalled();
    });

    it("returns all normalized items when singleItem is false", async () => {
        const items: GeneratorSiteMenuPlain[] = [
            { name: "Ale", price: "2 gp", siteType: "tavern" },
            { name: "Bread", price: "1 gp", siteType: "tavern" },
        ];
        tavernRule.mockResolvedValue(items);

        const context: SiteGenerationContext = { siteType: "tavern" };
        const result = await generateMenu(context);
        expect(result).toEqual(items.map(normalizeMenuItem));
    });
});
