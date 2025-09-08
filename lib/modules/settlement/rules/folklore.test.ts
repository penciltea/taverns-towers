import { applyFolkloreByConditions } from "@/lib/modules/settlement/rules/folklore.rules";
import * as randomValues from "@/lib/util/randomValues";
import * as extractUtils from "@/lib/util/extractArrayFromResult";
import { FolkloreByClimate } from "@/lib/models/generator/settlement/folkloreByClimate.model";
import { FolkloreByMagic } from "@/lib/models/generator/settlement/folkloreByMagic.model";
import { FolkloreByTag } from "@/lib/models/generator/settlement/folkloreByTags.model";
import { FolkloreByTerrain } from "@/lib/models/generator/settlement/folkloreByTerrain.model";
import { FolkloreByDomain } from "@/lib/models/generator/settlement/folkloreByDomain.model";
import { FolkloreByClimateMapping, FolkloreByMagicLevelMapping, FolkloreByTagMapping, FolkloreByTerrainMapping, FolkloreByDomainMapping } from "@/lib/modules/settlement/mappings/folklore.mappings";

jest.mock("@/lib/models/generator/settlement/folkloreByClimate.model");
jest.mock("@/lib/models/generator/settlement/folkloreByMagic.model");
jest.mock("@/lib/models/generator/settlement/folkloreByTags.model");
jest.mock("@/lib/models/generator/settlement/folkloreByTerrain.model");
jest.mock("@/lib/models/generator/settlement/folkloreByDomain.model");

describe("applyFolkloreByConditions", () => {
    const baseInput = {
        name: "TestTown",
        size: "Town",
        climate: "temperate",
        magic: "high",
        tags: ["magic"],
        terrain: ["forest"],
        rulingStyle: "Council",
        wealth: "Average",
        crime: ["Pickpocketing"],
        domains: ["arcana"],
        folklore: "",
        connections: [],
        userId: "user1",
        editors: [],
        isPublic: true
    };

    const climateData = { folklore: ["rain dances"] };
    const magicData = { folklore: ["mana rituals", "wizard tales"] };
    const tagData = [{ folklore: ["arcane secrets"] }];
    const terrainData = [{ folklore: ["forest spirits"] }];
    const domainData = [{ folklore: ["enchanted relics"] }];

    beforeEach(() => {
        jest.clearAllMocks();

        // Properly handle arrays of DB objects in extractor
        jest.spyOn(extractUtils, "extractArrayFromResult").mockImplementation(
        (result, extractor, fallback) => {
            if (result.status === "fulfilled" && result.value) {
            return Array.isArray(result.value)
                ? result.value.flatMap((v) => extractor(v) ?? [])
                : extractor(result.value) ?? [];
            }
            return fallback;
        }
        );

        // Default DB mocks
        (FolkloreByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(climateData) });
        (FolkloreByMagic.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(magicData) });
        (FolkloreByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(tagData) });
        (FolkloreByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(terrainData) });
        (FolkloreByDomain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(domainData) });

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
        const input = { ...baseInput, folklore: "existing folklore" };
        const result = await applyFolkloreByConditions(input);

        expect(result.folklore).toBe("existing folklore");
    });

    it("uses fallback mappings if DB returns nothing", async () => {
        // Override DB to return nothing
        (FolkloreByClimate.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });
        (FolkloreByMagic.findOne as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue(null) });
        (FolkloreByTag.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
        (FolkloreByTerrain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });
        (FolkloreByDomain.find as jest.Mock).mockReturnValue({ lean: jest.fn().mockResolvedValue([]) });

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
});
