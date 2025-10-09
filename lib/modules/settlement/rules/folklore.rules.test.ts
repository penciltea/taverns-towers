import { applyFolkloreByConditions } from "@/lib/modules/settlement/rules/folklore.rules";
import * as randomValues from "@/lib/util/randomValues";
import * as extractUtils from "@/lib/util/extractArrayFromResult";
import { FolkloreByClimate } from "@/lib/models/generator/settlement/folkloreByClimate.model";
import { FolkloreByMagic } from "@/lib/models/generator/settlement/folkloreByMagic.model";
import { FolkloreByTag } from "@/lib/models/generator/settlement/folkloreByTags.model";
import { FolkloreByTerrain } from "@/lib/models/generator/settlement/folkloreByTerrain.model";
import { FolkloreByDomain } from "@/lib/models/generator/settlement/folkloreByDomain.model";
import { FolkloreByClimateMapping, FolkloreByMagicLevelMapping, FolkloreByTagMapping, FolkloreByTerrainMapping, FolkloreByDomainMapping } from "@/lib/modules/settlement/mappings/folklore.mappings";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

jest.mock("@/lib/models/generator/settlement/folkloreByClimate.model");
jest.mock("@/lib/models/generator/settlement/folkloreByMagic.model");
jest.mock("@/lib/models/generator/settlement/folkloreByTags.model");
jest.mock("@/lib/models/generator/settlement/folkloreByTerrain.model");
jest.mock("@/lib/models/generator/settlement/folkloreByDomain.model");

describe("applyFolkloreByConditions", () => {
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

    const climateData = { folklore: ["rain dances"] };
    const magicData = { folklore: ["mana rituals", "wizard tales"] };
    const tagData = [{ folklore: ["arcane secrets"] }];
    const terrainData = [{ folklore: ["forest spirits"] }];
    const domainData = [{ folklore: ["enchanted relics"] }];

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
        (FolkloreByClimate.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(climateData),
        });
        (FolkloreByMagic.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(magicData),
        });
        (FolkloreByTag.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(tagData),
        });
        (FolkloreByTerrain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(terrainData),
        });
        (FolkloreByDomain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(domainData),
        });

        // Default getRandomSubset returns all items (deterministic)
        jest.spyOn(randomValues, "getRandomSubset").mockImplementation((arr) => arr);
    });

    it("generates folklore combining multiple sources", async () => {
        const result = await applyFolkloreByConditions(baseInput);
        const lines = result.folklore?.split("\n") ?? [];

        expect(lines).toEqual(
        expect.arrayContaining([
            "rain dances",
            "mana rituals",
            "wizard tales",
            "forest spirits",
            "arcane secrets",
            "enchanted relics",
        ])
        );
    });

    it("returns unchanged input if folklore already exists", async () => {
        const input = makeSettlementInput({
            ...baseInput,
            folklore: "existing folklore",
        });
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBe("existing folklore");
    });

    it("uses fallback mappings if DB returns nothing", async () => {
        // Override DB to return nothing
        (FolkloreByClimate.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        (FolkloreByMagic.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        (FolkloreByTag.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
        });
        (FolkloreByTerrain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
        });
        (FolkloreByDomain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
        });

        const result = await applyFolkloreByConditions(baseInput);
        const lines = result.folklore?.split("\n") ?? [];

        const expectedFallback = [
        ...(FolkloreByClimateMapping[baseInput.climate] ?? []),
        ...(FolkloreByMagicLevelMapping[baseInput.magic] ?? []),
        ...(baseInput.tags.flatMap((tag) => FolkloreByTagMapping[tag] ?? [])),
        ...(baseInput.terrain.flatMap((t) => FolkloreByTerrainMapping[t] ?? [])),
        ...(baseInput.domains.flatMap((d) => FolkloreByDomainMapping[d] ?? [])),
        ];

        expect(lines).toEqual(expect.arrayContaining(expectedFallback));
    });

    it("treats empty string folklore as needing generation", async () => {
        const input = { ...baseInput, folklore: "" };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBeDefined();
        expect(result.folklore).not.toBe("");
    });

    it("does not query climate if none provided", async () => {
        const input = { ...baseInput, climate: "" };
        await applyFolkloreByConditions(input);

        expect(FolkloreByClimate.findOne).not.toHaveBeenCalled();
    });

    it("does not query magic if none provided", async () => {
        const input = { ...baseInput, magic: "" };
        await applyFolkloreByConditions(input);

        expect(FolkloreByMagic.findOne).not.toHaveBeenCalled();
    });

    it("handles no tags gracefully", async () => {
        const input = { ...baseInput, tags: [] };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBeDefined();
        expect(result.folklore).not.toBe("");
    });

    it("handles no terrain gracefully", async () => {
        const input = { ...baseInput, terrain: [] };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBeDefined();
        expect(result.folklore).not.toBe("");
    });

    it("handles no domains gracefully", async () => {
        const input = { ...baseInput, domains: [] };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBeDefined();
        expect(result.folklore).not.toBe("");
    });

    it("does not assign folklore if getRandomSubset returns empty", async () => {
        (randomValues.getRandomSubset as jest.Mock).mockReturnValue([]);

        const input = { ...baseInput, folklore: "" };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBe("");
    });
});
