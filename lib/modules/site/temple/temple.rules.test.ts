import { SiteFormData } from "@/schemas/site.schema";
import { isTempleSite, applyTempleDomainsByConditions, applyRelicsByConditions } from "@/lib/modules/site/temple/temple.rules";
import { TempleSite, SiteGenerationContext } from "@/interfaces/site.interface";
import { getRandomSubset } from "@/lib/util/randomValues";

jest.mock("@/lib/models/generator/site/temple/relicsByDomain.model", () => ({
    RelicByDomain: {
        find: jest.fn(() => ({
        lean: jest.fn().mockResolvedValue([{ relics: ["Amulet", "Scroll"] }]),
        })),
    }
}));

jest.mock("@/lib/models/generator/site/temple/relicBySize.model", () => ({
    RelicBySize: {
        findOne: jest.fn(() => ({
        lean: jest.fn().mockResolvedValue({ relics: ["Staff"] }),
        })),
    }
}));

jest.mock("@/lib/models/generator/site/temple/relicsByCondition.model", () => ({
    RelicByCondition: {
        findOne: jest.fn(() => ({
        lean: jest.fn().mockResolvedValue({ relics: ["Chalice"] }),
        })),
    }
}));

jest.mock("@/lib/util/randomValues", () => ({
    getRandomSubset: jest.fn(),
}));

jest.mock("@/lib/modules/common/domains/getDomainsByEnvironment.rules", () => ({
    getDomainsByEnvironment: jest.fn(() => Promise.resolve(["Forge", "Fate"])),
}));

describe("Temple Site Generation Rules", () => {
    const mockedGetRandomSubset = getRandomSubset as jest.MockedFunction<typeof getRandomSubset>;

    let baseTemple: Partial<SiteFormData>;
    let context: SiteGenerationContext;

    beforeEach(() => {
        baseTemple = {
            type: "temple",
            size: "modest",
            condition: "average",
        };

        context = {
            size: "modest",
            wealth: "average",
            tags: [],
            crime: [],
            magic: "low",
            domains: ["Forge", "Fate"],
            terrain: ["forest"],
            climate: "temperate",
        };

        jest.clearAllMocks();
    });

    describe("isTempleSite", () => {
        it("returns true for type 'temple'", () => {
            expect(isTempleSite({ type: "temple" })).toBe(true);
        });

        it("returns false for non-temple types", () => {
            expect(isTempleSite({ type: "shop" })).toBe(false);
            expect(isTempleSite({ type: undefined })).toBe(false);
        });
    });

    describe("applyTempleDomainsByConditions", () => {
        it("assigns domains based on environment and context", async () => {
            mockedGetRandomSubset.mockReturnValue(["Forge", "Fate"]);
            const result = await applyTempleDomainsByConditions(baseTemple, context) as Partial<TempleSite>;
            expect(result.domains).toEqual(["Forge", "Fate"]);
            expect(mockedGetRandomSubset).toHaveBeenCalled();
        });

        it("does nothing for non-temple sites", async () => {
            const nonTemple = { type: "shop" } as Partial<SiteFormData>;
            const result = await applyTempleDomainsByConditions(nonTemple, context);
            expect(result).toEqual(nonTemple);
        });
    });

    describe("applyRelicsByConditions", () => {
        it("assigns relics based on domains, size, and condition", async () => {
            mockedGetRandomSubset.mockReturnValue(["Amulet", "Scroll", "Staff", "Chalice"]);
            const result = await applyRelicsByConditions(baseTemple, context) as Partial<TempleSite>;
            expect(result.relics).toBe("Amulet\nScroll\nStaff\nChalice");
            expect(mockedGetRandomSubset).toHaveBeenCalled();
        });

        it("does nothing for non-temple sites", async () => {
            const nonTemple = { type: "shop" } as Partial<SiteFormData>;
            const result = await applyRelicsByConditions(nonTemple, context);
            expect(result).toEqual(nonTemple);
        });
    });
});