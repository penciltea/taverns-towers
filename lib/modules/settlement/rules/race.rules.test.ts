import { applyRacesByConditions } from "./race.rules";
import { RacesByTerrain } from "@/lib/models/generator/settlement/racesByTerrain.model";
import { RacesByTag } from "@/lib/models/generator/settlement/racesByTag.model";
import { RacesByMagic } from "@/lib/models/generator/settlement/racesByMagic.model";
import { RacesByWealth } from "@/lib/models/generator/settlement/racesByWealth.model";
import { RacesByClimate } from "@/lib/models/generator/settlement/racesByClimate.model";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";
import { CommonRacesByTerrainMapping, RacesByMagicMapping, RacesByTagMapping, RacesByWealthMapping, RacesByClimateMapping, raceCountBySize } from "../mappings/race.mappings";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";
import { getRandomSubset } from "@/lib/util/randomValues";

jest.mock("@/lib/models/generator/settlement/racesByTerrain.model");
jest.mock("@/lib/models/generator/settlement/racesByTag.model");
jest.mock("@/lib/models/generator/settlement/racesByMagic.model");
jest.mock("@/lib/models/generator/settlement/racesByWealth.model");
jest.mock("@/lib/models/generator/settlement/racesByClimate.model");
jest.mock("@/lib/util/randomValues");
jest.mock("@/lib/util/extractArrayFromResult");

describe("applyRacesByConditions", () => {
    const baseInput = makeSettlementInput({
        name: "TestTown",
        size: "Town",
        climate: "Temperate",
        magic: "High",
        terrain: ["Forest"],
        tags: ["Druidic"],
        wealth: "Modest",
        races: "random",
    });

    beforeEach(() => {
        jest.clearAllMocks();

        (extractArrayFromResult as jest.Mock).mockImplementation((result, extractor, fallback) => fallback);

        // Mock DB calls to return nothing by default
        (RacesByTerrain.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
        });
        (RacesByTag.find as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue([]),
        });
        (RacesByMagic.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        (RacesByWealth.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });
        (RacesByClimate.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        });

        // Override getRandomSubset for deterministic fallback tests
        (getRandomSubset as jest.Mock).mockImplementation((arr) => arr);
    });

    it("returns input unchanged if races field is filled in", async () => {
        const input = makeSettlementInput({ races: "Elves, Dwarves" });
        const result = await applyRacesByConditions(input);
        expect(result.races).toBe("Elves, Dwarves");
    });

    it("uses fallback mappings if DB returns nothing", async () => {
        const result = await applyRacesByConditions(baseInput);
        const resultRaces = result.races?.split(", ") ?? [];

        const expectedFallback = [
            ...baseInput.terrain.flatMap(t => CommonRacesByTerrainMapping[t] ?? []),
            ...baseInput.tags.flatMap(t => RacesByTagMapping[t] ?? []),
            ...(RacesByMagicMapping[baseInput.magic] ?? []),
            ...(RacesByWealthMapping[baseInput.wealth] ?? []),
            ...(RacesByClimateMapping[baseInput.climate] ?? []),
        ];

        // Ensure all fallback races are included
        expect(resultRaces.sort()).toEqual(Array.from(new Set(expectedFallback)).sort());
    });

    it("returns 'All Races' if included in combined list", async () => {
        // Include 'All Races' in tags mapping
        const input = makeSettlementInput({ tags: ["Capital"] }); // Capital has 'All Races'
        const result = await applyRacesByConditions(input);
        expect(result.races).toBe("All Races");
    });

    it("returns subset of races based on settlement size", async () => {
        // Reset getRandomSubset to behave normally for this test
        (getRandomSubset as jest.Mock).mockImplementation((arr, { min, max }) => arr.slice(min, max));

        const input = makeSettlementInput({ races: "random" });
        const result = await applyRacesByConditions(input);
        const resultRaces = result.races?.split(", ") ?? [];
        const [min, max] = raceCountBySize[input.size ?? "Town"] ?? [2, 4];

        expect(resultRaces.length).toBeLessThanOrEqual(max);
        expect(resultRaces.length).toBeGreaterThanOrEqual(min);
    });
});