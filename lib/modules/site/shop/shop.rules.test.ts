import { SiteFormData } from "@/schemas/site.schema";
import { applyShopTypeRule, isShopSite } from "@/lib/modules/site/shop/shop.rules";
import { SHOP_TYPE_CATEGORIES, SiteShopType } from "@/constants/site/site.options";
import { getRandom } from "@/lib/util/randomValues";
import { ShopSite } from "@/interfaces/site.interface";

jest.mock("@/lib/util/randomValues", () => ({
    getRandom: jest.fn(),
}));

describe("Shop Site Generation Rules", () => {
    const mockedGetRandom = getRandom as jest.MockedFunction<typeof getRandom>;

    let baseSite: Partial<SiteFormData>;

    beforeEach(() => {
        baseSite = {
        type: "shop",
        shopType: "random",
        };
        mockedGetRandom.mockReset();
    });

    describe("isShopSite", () => {
        it("returns true for type 'shop'", () => {
            expect(isShopSite({ type: "shop" })).toBe(true);
        });

        it("returns false for non-shop types", () => {
            expect(isShopSite({ type: "tavern" })).toBe(false);
            expect(isShopSite({ type: undefined })).toBe(false);
        });
    });

    describe("applyShopTypeRule", () => {
        it("replaces 'random' shopType with a valid value", async () => {
            const validTypes: SiteShopType[] = SHOP_TYPE_CATEGORIES.flatMap(
                c => c.options.map(o => o.value) as SiteShopType[]
            );

            mockedGetRandom.mockImplementation(() => validTypes[0]);

            const result = await applyShopTypeRule(baseSite) as Partial<ShopSite>;
            expect(result.shopType).toBe(validTypes[0]);
            expect(validTypes).toContain(result.shopType as SiteShopType);
        });

        it("does not overwrite existing shopType", async () => {
            const existingType: SiteShopType = SHOP_TYPE_CATEGORIES[0].options[0].value as SiteShopType;
            const siteWithType = { ...baseSite, shopType: existingType };

            const result = await applyShopTypeRule(siteWithType) as Partial<ShopSite>;
            expect(result.shopType).toBe(existingType);
        });

        it("does nothing for non-shop sites", async () => {
            const nonShopSite = { type: "tavern", shopType: "random" } as Partial<SiteFormData>;
            const result = await applyShopTypeRule(nonShopSite);
            expect(result).toEqual(nonShopSite);
        });

        it("selects from all available shop types", async () => {
            const allShopTypes: SiteShopType[] = SHOP_TYPE_CATEGORIES.flatMap(
                c => c.options.map(o => o.value) as SiteShopType[]
            );
            mockedGetRandom.mockImplementation(() => allShopTypes[allShopTypes.length - 1]);

            const result = await applyShopTypeRule(baseSite) as Partial<ShopSite>;
            expect(result.shopType).toBe(allShopTypes[allShopTypes.length - 1]);
        });
    });
});
