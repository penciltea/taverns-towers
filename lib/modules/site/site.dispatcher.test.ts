import { generateSiteValues, generateSiteValuesFromSettlement, SiteGenerator } from "@/lib/modules/site/site.dispatcher";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { SiteGenerationInput } from "@/interfaces/site.interface";

jest.mock("@/lib/modules/site/tavern/tavern.rules", () => ({
    generateTavernData: jest.fn(async (input) => ({ type: "tavern", ...input })),
}));

jest.mock("@/lib/modules/site/shop/shop.rules", () => ({
    generateShopData: jest.fn(async (input) => ({ type: "shop", shopType: "blacksmith", ...input })),
}));

jest.mock("@/lib/modules/site/guild/guild.rules", () => ({
    generateGuildData: jest.fn(async (input) => ({ type: "guild", guildType: "warriors", ...input })),
}));

jest.mock("@/lib/modules/site/temple/temple.rules", () => ({
    generateTempleData: jest.fn(async (input) => ({ type: "temple", ...input })),
}));

jest.mock("@/lib/modules/site/government/government.rules", () => ({
    generateGovernmentData: jest.fn(async (input) => ({ type: "government", function: "ruler", ...input })),
}));

jest.mock("@/lib/modules/site/entertainment/entertainment.rules", () => ({
    generateEntertainmentData: jest.fn(async (input) => ({ type: "entertainment", venueType: "theater", ...input })),
}));

jest.mock("@/lib/modules/site/residence/residence.rules", () => ({
    generateResidenceData: jest.fn(async (input) => ({ type: "residence", ...input })),
}));

jest.mock("@/lib/modules/site/hidden/hidden.rules", () => ({
    generateHiddenData: jest.fn(async (input) => ({ type: "hidden", ...input })),
}));

jest.mock("@/lib/modules/site/miscellaneous/miscellaneous.rules", () => ({
    generateMiscellaneousData: jest.fn(async (input) => ({ type: "miscellaneous", ...input })),
}));

jest.mock("@/lib/actions/siteGenerator.actions", () => ({
    generateSiteName: jest.fn(async () => "Test Site Name"),
}));

describe("Site Dispatcher", () => {
    const mockedGenerateSiteName = generateSiteName as jest.MockedFunction<typeof generateSiteName>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("generateSiteValues", () => {
        it("throws an error if type is invalid", async () => {
            await expect(generateSiteValues("invalidType", {} as SiteGenerationInput)).rejects.toThrow(
                "No generation rules defined for site type: invalidType"
            );
        });

        it("calls the correct generator and generates a name if missing", async () => {
            const input: SiteGenerationInput = { terrain: ["forest"], climate: "temperate" };
            const result = await generateSiteValues("tavern", input);
            expect(result.type).toBe("tavern");
            expect(mockedGenerateSiteName).toHaveBeenCalledWith(
                expect.objectContaining({ siteType: ["tavern"], terrain: ["forest"], climate: "temperate" })
            );
            expect(result.name).toBe("Test Site Name");
        });

        it("does not overwrite name if generator already provides one", async () => {
            const generatorResult: SiteFormData = { type: "shop", shopType: "blacksmith", name: "Existing Name", connections: [] };
            (SiteGenerator.shop as jest.Mock) = jest.fn(async () => generatorResult);
            const input: SiteGenerationInput = {};
            const result = await generateSiteValues("shop", input);
            expect(result.name).toBe("Existing Name");
            expect(mockedGenerateSiteName).toHaveBeenCalled();
        });

        it("extracts shopType, guildType, venueType, and functionType correctly", async () => {
            const shopResult = await generateSiteValues("shop", {} as SiteGenerationInput);
            expect((shopResult as Extract<SiteFormData, { type: "shop" }>).shopType).toBe("blacksmith");

            const guildResult = await generateSiteValues("guild", {} as SiteGenerationInput);
            expect((guildResult as Extract<SiteFormData, { type: "guild" }>).guildType).toBe("warriors");

            const entertainmentResult = await generateSiteValues("entertainment", {} as SiteGenerationInput);
            expect((entertainmentResult as Extract<SiteFormData, { type: "entertainment" }>).venueType).toBe("theater");

            const governmentResult = await generateSiteValues("government", {} as SiteGenerationInput);
            expect((governmentResult as Extract<SiteFormData, { type: "government" }>).function).toBe("ruler");
        });
    });

    describe("generateSiteValuesFromSettlement", () => {
        it("passes settlement context and overrides correctly", async () => {
            const settlement = {
                _id: "settlement123",
                name: "My Settlement",
                climate: "arctic",
                terrain: ["mountain"],
                tags: ["fortress"],
                wealth: "high",
                size: "large",
                crime: ["thieves"],
                domains: ["Death"],
                magic: "low",
                races: "human",
                rulingStyle: "monarchy",
            };

            const overrides: Partial<SiteFormData> & Record<string, unknown> = { customField: "customValue" };

            const result = (await generateSiteValuesFromSettlement("tavern", settlement, overrides)) as SiteFormData & Record<string, unknown>;

            expect(result.type).toBe("tavern");
            expect(result.customField).toBe("customValue");

            expect(mockedGenerateSiteName).toHaveBeenCalledWith(
                expect.objectContaining({
                    terrain: ["mountain"],
                    climate: "arctic",
                    tags: ["fortress"],
                })
            );
        });
    });
});