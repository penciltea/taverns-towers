import { SiteFormData } from "@/schemas/site.schema";
import { isTavernSite, applyTavernClienteleByConditions, applyEntertainmentByConditions, applyTavernRoomCostRule } from "@/lib/modules/site/tavern/tavern.rules";
import { TavernSite, SiteGenerationContext } from "@/interfaces/site.interface";
import { getRandomSubset } from "@/lib/util/randomValues";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";


jest.mock("@/lib/models/generator/site/tavern/clienteleBySettlementSize.model", () => ({
    ClienteleBySettlementSize: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleByWealth.model", () => ({
    ClienteleByWealth: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleByTag.model", () => ({
    ClienteleByTag: { find: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleByCrime.model", () => ({
      ClienteleByCrime: { find: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleByMagic.model", () => ({
    ClienteleByMagic: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleBySize.model", () => ({
    ClienteleBySize: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/clienteleByCondition.model", () => ({
    ClienteleByCondition: { findOne: jest.fn() },
}));

jest.mock("@/lib/models/generator/site/tavern/entertainmentBySize.model", () => ({
    EntertainmentBySize: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/entertainmentByCondition.model", () => ({
    EntertainmentByCondition: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/entertainmentByMagic.model", () => ({
    EntertainmentByMagic: { findOne: jest.fn() },
}));
jest.mock("@/lib/models/generator/site/tavern/entertainmentByTag.model", () => ({
    EntertainmentByTag: { find: jest.fn() },
}));

jest.mock("@/lib/util/randomValues", () => ({
    getRandomSubset: jest.fn(),
}));

jest.mock("@/lib/util/convertCurrency", () => ({
    formatCurrencyFromCp: jest.fn(),
}));

describe("Tavern Site Generation Rules", () => {
    const mockedGetRandomSubset = getRandomSubset as jest.MockedFunction<typeof getRandomSubset>;
    const mockedFormatCurrency = formatCurrencyFromCp as jest.MockedFunction<typeof formatCurrencyFromCp>;

    let baseTavern: Partial<SiteFormData>;
    let context: SiteGenerationContext;

    beforeEach(() => {
        baseTavern = { type: "tavern", size: "modest", condition: "average" };
        context = { size: "modest", wealth: "average", tags: [], crime: [], magic: "low" };

        jest.clearAllMocks();

        // Helper to mock .lean()
        const mockLean = (val: any) => ({ lean: jest.fn().mockResolvedValue(val) });

        // Clientele DB mocks
        const clienteleArray = ["Adventurers", "Merchants"];
        (require("@/lib/models/generator/site/tavern/clienteleBySettlementSize.model").ClienteleBySettlementSize.findOne as jest.Mock)
            .mockReturnValue(mockLean({ clientele: clienteleArray }));

        (require("@/lib/models/generator/site/tavern/clienteleByWealth.model").ClienteleByWealth.findOne as jest.Mock)
            .mockReturnValue(mockLean({ clientele: clienteleArray }));

        (require("@/lib/models/generator/site/tavern/clienteleByTag.model").ClienteleByTag.find as jest.Mock)
            .mockReturnValue(mockLean([{ clientele: clienteleArray }]));

        (require("@/lib/models/generator/site/tavern/clienteleByCrime.model").ClienteleByCrime.find as jest.Mock)
            .mockReturnValue(mockLean([{ clientele: clienteleArray }]));

        (require("@/lib/models/generator/site/tavern/clienteleByMagic.model").ClienteleByMagic.findOne as jest.Mock)
            .mockReturnValue(mockLean({ clientele: clienteleArray }));

        (require("@/lib/models/generator/site/tavern/clienteleBySize.model").ClienteleBySize.findOne as jest.Mock)
            .mockReturnValue(mockLean({ clientele: clienteleArray }));

        (require("@/lib/models/generator/site/tavern/clienteleByCondition.model").ClienteleByCondition.findOne as jest.Mock)
            .mockReturnValue(mockLean({ clientele: clienteleArray }));

        // Entertainment DB mocks
        (require("@/lib/models/generator/site/tavern/entertainmentBySize.model").EntertainmentBySize.findOne as jest.Mock)
            .mockReturnValue(mockLean({ entertainment: ["Bardic Performance"] }));

        (require("@/lib/models/generator/site/tavern/entertainmentByCondition.model").EntertainmentByCondition.findOne as jest.Mock)
            .mockReturnValue(mockLean({ entertainment: ["Card Games"] }));

        (require("@/lib/models/generator/site/tavern/entertainmentByMagic.model").EntertainmentByMagic.findOne as jest.Mock)
            .mockReturnValue(mockLean({ entertainment: ["Fire Shows"] }));

        (require("@/lib/models/generator/site/tavern/entertainmentByTag.model").EntertainmentByTag.find as jest.Mock)
            .mockReturnValue(mockLean([{ entertainment: ["Dance Performances"] }]));
        });

    describe("isTavernSite", () => {
        it("returns true for type 'tavern'", () => {
            expect(isTavernSite({ type: "tavern" })).toBe(true);
        });

        it("returns false for non-tavern types", () => {
            expect(isTavernSite({ type: "shop" })).toBe(false);
            expect(isTavernSite({ type: undefined })).toBe(false);
        });
    });

    describe("applyTavernClienteleByConditions", () => {
        it("returns data with a normalized clientele string", async () => {
            mockedGetRandomSubset.mockReturnValue(["Adventurers", "Merchants"]);
            const result = await applyTavernClienteleByConditions(baseTavern, context) as Partial<TavernSite>;
            expect(result.clientele).toBe("Adventurers, Merchants");
            expect(mockedGetRandomSubset).toHaveBeenCalled();
        });

        it("does nothing for non-tavern sites", async () => {
            const nonTavern = { type: "shop" } as Partial<SiteFormData>;
            const result = await applyTavernClienteleByConditions(nonTavern, context);
            expect(result).toEqual(nonTavern);
        });
    });

    describe("applyEntertainmentByConditions", () => {
        it("returns data with entertainment array", async () => {
            mockedGetRandomSubset.mockReturnValue(["Bardic Performance", "Card Games"]);
            const result = await applyEntertainmentByConditions(baseTavern, context) as Partial<TavernSite>;
            expect(result.entertainment).toEqual(["Bardic Performance", "Card Games"]);
            expect(mockedGetRandomSubset).toHaveBeenCalled();
        });

        it("does nothing for non-tavern sites", async () => {
            const nonTavern = { type: "shop" } as Partial<SiteFormData>;
            const result = await applyEntertainmentByConditions(nonTavern, context);
            expect(result).toEqual(nonTavern);
        });
    });

    describe("applyTavernRoomCostRule", () => {
        it("calculates cost for valid size and condition", async () => {
            mockedFormatCurrency.mockReturnValue("10 gp");
            const result = await applyTavernRoomCostRule(baseTavern) as Partial<TavernSite>;
            expect(result.cost).toBe("10 gp");
            expect(mockedFormatCurrency).toHaveBeenCalled();
        });

        it("returns data unchanged if not tavern or missing fields", async () => {
            const nonTavern = { type: "shop" } as Partial<SiteFormData>;
            expect(await applyTavernRoomCostRule(nonTavern)).toEqual(nonTavern);

            const missingFields = { type: "tavern" } as Partial<SiteFormData>;
            expect(await applyTavernRoomCostRule(missingFields)).toEqual(missingFields);
        });
    });
});
