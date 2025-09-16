import { applyTradeNotesRule } from "@/lib/modules/settlement/rules/trade.rules";
import { getRandomSubset } from "@/lib/util/randomValues";
import * as extractUtils from "@/lib/util/extractArrayFromResult";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

import { TradeByTags } from "@/lib/models/generator/settlement/tradeByTags.model";
import { TradeByTerrain } from "@/lib/models/generator/settlement/tradeByTerrain.model";
import { TradeByClimate } from "@/lib/models/generator/settlement/tradeByClimate.model";

jest.mock("@/lib/models/generator/settlement/tradeByTags.model");
jest.mock("@/lib/models/generator/settlement/tradeByTerrain.model");
jest.mock("@/lib/models/generator/settlement/tradeByClimate.model");
jest.mock("@/lib/util/randomValues");

describe("applyTradeNotesRule", () => {
    const terrainData = [{ trade: ["forest timber"] }];
    const tagData = [{ trade: ["magic ingredients"] }];
    const climateData = { trade: ["rainy season trade"] };

    beforeEach(() => {
        jest.clearAllMocks();

        jest
        .spyOn(extractUtils, "extractArrayFromResult")
        .mockImplementation((result, extractor, fallback) => {
            if (result.status === "fulfilled" && result.value) {
            return Array.isArray(result.value)
                ? result.value.flatMap((v) => extractor(v) ?? [])
                : extractor(result.value) ?? [];
            }
            return fallback;
        });

        // Mocks for Mongoose queries
        (TradeByTerrain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(terrainData),
        });
        (TradeByTags.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(tagData),
        });
        (TradeByClimate.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(climateData),
        });

        // Mock getRandomSubset to deterministic return
        (getRandomSubset as jest.Mock).mockImplementation((arr) => arr);
    });

    it("generates tradeNotes combining terrain, tag, and climate sources", async () => {
        const input = makeSettlementInput({ tradeNotes: "" });
        const result = await applyTradeNotesRule(input);

        expect(result.tradeNotes).toBeDefined();
        const notes = (result.tradeNotes ?? "")
            .split(". ")
            .map((n) => n.replace(/\.$/, "").toLowerCase()); // lowercase for comparison

        expect(notes).toEqual(
            expect.arrayContaining(["forest timber", "magic ingredients", "rainy season trade"])
        );
    });

    it("returns unchanged input if tradeNotes already exists", async () => {
        const input = makeSettlementInput({ tradeNotes: "existing trade notes" });
        const result = await applyTradeNotesRule(input);

        expect(result.tradeNotes).toBe("existing trade notes");
    });

    it("uses fallback mappings if DB returns nothing", async () => {
        (TradeByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
        (TradeByTags.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
        (TradeByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });

        const input = makeSettlementInput({ tradeNotes: "" });
        const result = await applyTradeNotesRule(input);

        expect(result.tradeNotes).toBeDefined();
        expect(result.tradeNotes).not.toBe("");
    });

    it("formats tradeNotes with proper capitalization and punctuation", async () => {
        const input = makeSettlementInput({ tradeNotes: "" });
        const result = await applyTradeNotesRule(input);

        const sentences = (result.tradeNotes ?? "").split(". ");
        sentences.forEach((s, i) => {
            // Check capitalization
            expect(s[0]).toMatch(/[A-Z]/);
            // Check last sentence has a period
            if (i === sentences.length - 1) expect(s.endsWith(".")).toBe(true);
        });
    });
});
