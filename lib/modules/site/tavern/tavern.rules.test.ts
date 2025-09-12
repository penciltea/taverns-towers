import { isTavernSite, applyTavernClienteleByConditions, applyEntertainmentByConditions, applyTavernRoomCostRule, generateTavernData } from "./tavern.rules";
import { SiteFormData } from "@/schemas/site.schema";
import { SizeTypes, WealthLevel, MagicLevel } from "@/constants/settlementOptions";
import { SiteGenerationContext, SiteGenerationInput, TavernSite } from "@/interfaces/site.interface";

jest.mock("@/lib/models/generator/site/tavern/clienteleBySettlementSize.model", () => ({
    ClienteleBySettlementSize: { findOne: jest.fn(() => mockLean({ clientele: ["Adventurers"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleByWealth.model", () => ({
    ClienteleByWealth: { findOne: jest.fn(() => mockLean({ clientele: ["Merchants"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleByTag.model", () => ({
    ClienteleByTag: { find: jest.fn(() => mockLean([{ clientele: ["Nobles"] }])) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleByCrime.model", () => ({
    ClienteleByCrime: { find: jest.fn(() => mockLean([{ clientele: ["Thieves"] }])) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleByMagic.model", () => ({
    ClienteleByMagic: { findOne: jest.fn(() => mockLean({ clientele: ["Mages"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleBySize.model", () => ({
    ClienteleBySize: { findOne: jest.fn(() => mockLean({ clientele: ["Travelers"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/clienteleByCondition.model", () => ({
    ClienteleByCondition: { findOne: jest.fn(() => mockLean({ clientele: ["Locals"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/entertainmentBySize.model", () => ({
    EntertainmentBySize: { findOne: jest.fn(() => mockLean({ entertainment: ["Bardic Song"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/entertainmentByCondition.model", () => ({
    EntertainmentByCondition: { findOne: jest.fn(() => mockLean({ entertainment: ["Dancing"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/entertainmentByMagic.model", () => ({
    EntertainmentByMagic: { findOne: jest.fn(() => mockLean({ entertainment: ["Fire Show"] })) },
}));

jest.mock("@/lib/models/generator/site/tavern/entertainmentByTag.model", () => ({
    EntertainmentByTag: { find: jest.fn(() => mockLean([{ entertainment: ["Comedy"] }])) },
}));


jest.mock("@/lib/util/randomValues", () => ({
    getRandomSubset: (arr: string[], opts: { count?: number; min?: number; max?: number }) =>
        arr.slice(0, opts.count ?? opts.max ?? arr.length),
    getRandom: <T>(arr: T[]): T => arr[0] // deterministic pick
}));
jest.mock("@/lib/util/convertCurrency", () => ({
    formatCurrencyFromCp: (val: number) => `${val} cp`
}));
jest.mock("@/lib/util/stringFormats", () => ({
    capitalizeFirstLetter: (val: string) => val.charAt(0).toUpperCase() + val.slice(1)
}));
jest.mock("@/lib/util/siteHelpers", () => ({
    createSiteGenerator: (type: string, rules: Array<(data: Partial<SiteFormData>, context: SiteGenerationContext) => Promise<Partial<SiteFormData>>>) => async (input: SiteGenerationInput) => {
        let result = { type, ...input } as Partial<SiteFormData>;
        for (const rule of rules) {
            result = await rule(result, input);
        }
        return result;
    },
}));

// helper to simulate mongoose `.lean()`
const mockLean = <T>(val: T) => ({
    lean: jest.fn().mockResolvedValue(val),
});

const baseTavern: Partial<SiteFormData> = {
    type: "tavern",
    connections: [],
    entertainment: [],
    clientele: "",
};

describe("Tavern Rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("isTavernSite", () => {
        it("returns true for tavern type", () => {
            expect(isTavernSite({ type: "tavern" } as Partial<TavernSite>)).toBe(true);
        });
        it("returns false for non-tavern type", () => {
            expect(isTavernSite({ type: "shop" } as Partial<SiteFormData>)).toBe(false);
        });
    });

    describe("applyTavernClienteleByConditions", () => {
        it("returns clientele from DB", async () => {
        const { ClienteleBySettlementSize } = await import(
            "@/lib/models/generator/site/tavern/clienteleBySettlementSize.model"
        );
        (ClienteleBySettlementSize.findOne as jest.Mock).mockReturnValue(
            mockLean({ clientele: ["Adventurers"] })
        );

        const result = (await applyTavernClienteleByConditions(
            { ...baseTavern },
            {
                size: "village" as SizeTypes,
                wealth: "modest" as WealthLevel,
                tags: [],
                crime: [],
                magic: "average" as MagicLevel,
            }
        )) as Partial<TavernSite>;

        expect(result.clientele).toContain("Adventurers");
        });

        it("skips if not a tavern", async () => {
        const result = await applyTavernClienteleByConditions(
            { type: "shop" },
            { size: "village" }
        ) as Partial<TavernSite>;
        expect(result).toEqual({ type: "shop" });
        });
    });

    describe("applyEntertainmentByConditions", () => {
        it("returns entertainment from DB", async () => {
            const { EntertainmentBySize } = await import(
                "@/lib/models/generator/site/tavern/entertainmentBySize.model"
            );
            (EntertainmentBySize.findOne as jest.Mock).mockReturnValue(
                mockLean({ entertainment: ["Bardic Song"] })
            );

            const result = (await applyEntertainmentByConditions(
                { ...baseTavern, size: "medium", condition: "average" },
                { magic: "average", tags: [] }
            )) as Partial<TavernSite>;

            expect(result.entertainment).toContain("Bardic Song");
            });

            it("skips if not a tavern", async () => {
            const result = await applyEntertainmentByConditions(
                { type: "temple" },
                { magic: "low" } as Partial<TavernSite>
            );
            expect(result).toEqual({ type: "temple" });
        });
    });

    describe("applyTavernRoomCostRule", () => {
        it("calculates cost when valid", async () => {
            const result = (await applyTavernRoomCostRule({
                ...baseTavern,
                size: "large",
                condition: "fine",
            })) as Partial<TavernSite>;

            expect(result.cost).toMatch(/cp$/);
        });

        it("returns unchanged for non-tavern", async () => {
            const result = await applyTavernRoomCostRule({ type: "shop" });
            expect(result).toEqual({ type: "shop" });
        });
    });

    describe("generateTavernData", () => {
        it("runs all tavern rules", async () => {
            const input: SiteGenerationInput = {
                size: "village",
                wealth: "modest",
                magic: "average",
            };

            const result = (await generateTavernData(
                input
            )) as Partial<TavernSite>;

            expect(result.type).toBe("tavern");
            expect(result.entertainment).toBeDefined();
            expect(result.clientele).toBeDefined();
        });
    });
});