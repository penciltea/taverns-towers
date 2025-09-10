import { applyHolidaysByConditions } from "@/lib/modules/settlement/rules/holiday.rules";
import * as randomValues from "@/lib/util/randomValues";
import * as extractUtils from "@/lib/util/extractArrayFromResult";
import { HolidaysByClimate } from "@/lib/models/generator/settlement/holidayByClimate.model";
import { HolidaysByMagic } from "@/lib/models/generator/settlement/holidayByMagic.model";
import { HolidaysByTag } from "@/lib/models/generator/settlement/holidayByTags.model";
import { HolidaysByTerrain } from "@/lib/models/generator/settlement/holidayByTerrain.model";
import { HolidaysByDomain } from "@/lib/models/generator/settlement/holidayByDomain.model";
import {
  HolidaysByClimateMapping,
  HolidaysByMagicLevelMapping,
  HolidaysByTagMapping,
  HolidaysByTerrainMapping,
  HolidaysByDomainMapping,
} from "@/lib/modules/settlement/mappings/holiday.mappings";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

jest.mock("@/lib/models/generator/settlement/holidayByClimate.model");
jest.mock("@/lib/models/generator/settlement/holidayByMagic.model");
jest.mock("@/lib/models/generator/settlement/holidayByTags.model");
jest.mock("@/lib/models/generator/settlement/holidayByTerrain.model");
jest.mock("@/lib/models/generator/settlement/holidayByDomain.model");

describe("applyHolidaysByConditions", () => {
    const baseInput = makeSettlementInput({
        name: "TestTown",
        climate: "temperate",
        magic: "high",
        tags: ["magic"],
        terrain: ["forest"],
        rulingStyle: "Council",
        wealth: "Average",
        crime: ["Pickpocketing"],
        domains: ["arcana"],
    });

    const climateData = { holidays: ["climate holiday"] };
    const magicData = { holidays: ["magic holiday 1", "magic holiday 2"] };
    const tagData = [{ holidays: ["tag holiday"] }];
    const terrainData = [{ holidays: ["terrain holiday"] }];
    const domainData = [{ holidays: ["domain holiday"] }];

    beforeEach(() => {
        jest.clearAllMocks();

        // Properly handle arrays of DB objects in extractor
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

        // Default DB mocks
        (HolidaysByClimate.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(climateData),
        });
        (HolidaysByMagic.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(magicData),
        });
        (HolidaysByTag.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(tagData),
        });
        (HolidaysByTerrain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(terrainData),
        });
        (HolidaysByDomain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(domainData),
        });

        // Default getRandomSubset returns all items (deterministic)
        jest.spyOn(randomValues, "getRandomSubset").mockImplementation((arr) => arr);
    });

    it("generates holidays combining multiple sources", async () => {
        const result = await applyHolidaysByConditions(baseInput);
        const lines = result.holidays?.split("\n") ?? [];

        expect(lines).toEqual(
            expect.arrayContaining([
                "climate holiday",
                "magic holiday 1",
                "magic holiday 2",
                "tag holiday",
                "terrain holiday",
                "domain holiday",
            ])
        );
    });

    it("returns unchanged input if holidays already exists", async () => {
        const input = { ...baseInput, holidays: "existing holidays" };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBe("existing holidays");
    });

    it("uses fallback mappings if DB returns nothing", async () => {
        // Override DB to return nothing
        (HolidaysByClimate.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
        });
        (HolidaysByMagic.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
        });
        (HolidaysByTag.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue([]),
        });
        (HolidaysByTerrain.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue([]),
        });
        (HolidaysByDomain.find as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue([]),
        });

        const result = await applyHolidaysByConditions(baseInput);
        const lines = result.holidays?.split("\n") ?? [];

        const expectedFallback = [
        ...(HolidaysByClimateMapping[baseInput.climate] ?? []),
        ...(HolidaysByMagicLevelMapping[baseInput.magic] ?? []),
        ...(baseInput.tags.flatMap((tag) => HolidaysByTagMapping[tag] ?? [])),
        ...(baseInput.terrain.flatMap((t) => HolidaysByTerrainMapping[t] ?? [])),
        ...(baseInput.domains.flatMap((d) => HolidaysByDomainMapping[d] ?? [])),
        ];

        expect(lines).toEqual(expect.arrayContaining(expectedFallback));
    });

    it("treats empty string holidays as needing generation", async () => {
        const input = { ...baseInput, holidays: "" };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBeDefined();
        expect(result.holidays).not.toBe("");
    });

    it("does not query climate if none provided", async () => {
        const input = { ...baseInput, climate: "" };
        await applyHolidaysByConditions(input);

        expect(HolidaysByClimate.findOne).not.toHaveBeenCalled();
    });

    it("does not query magic if none provided", async () => {
        const input = { ...baseInput, magic: "" };
        await applyHolidaysByConditions(input);

        expect(HolidaysByMagic.findOne).not.toHaveBeenCalled();
    });

    it("handles no tags gracefully", async () => {
        const input = { ...baseInput, tags: [] };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBeDefined();
        expect(result.holidays).not.toBe("");
    });

    it("handles no terrain gracefully", async () => {
        const input = { ...baseInput, terrain: [] };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBeDefined();
        expect(result.holidays).not.toBe("");
    });

    it("handles no domains gracefully", async () => {
        const input = { ...baseInput, domains: [] };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBeDefined();
        expect(result.holidays).not.toBe("");
    });

    it("does not assign holidays if getRandomSubset returns empty", async () => {
        (randomValues.getRandomSubset as jest.Mock).mockReturnValue([]);

        const input = { ...baseInput, holidays: "" };
        const result = await applyHolidaysByConditions(input);

        expect(result.holidays).toBe("");
    });
});
