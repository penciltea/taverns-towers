import { NormalizedSettlementInput, normalizeSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { normalizeEnvironmentInput } from "@/lib/modules/environment/environment.rules";
import { normalizeCommonInput } from "@/lib/actions/normalizeConnections.server";
import { Settlement } from "@/interfaces/settlement.interface";

jest.mock("@/lib/modules/environment/environment.rules");
jest.mock("@/lib/util/normalizeData");

describe("normalizeSettlementInput", () => {
    const mockEnv = {
        climate: "temperate",
        terrain: ["forest"],
        temperature: "mild",
        rainfall: "average",
    };

    const mockCommon = {
        name: "TestTown",
        description: "A test settlement",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (normalizeEnvironmentInput as jest.Mock).mockReturnValue(mockEnv);
        (normalizeCommonInput as jest.Mock).mockReturnValue(mockCommon);
    });

    it("applies defaults when fields are missing", () => {
        const input = {};
        const result = normalizeSettlementInput(input);

        expect(result).toEqual(expect.objectContaining({
            ...mockCommon,
            ...mockEnv,
            size: "random",
            magic: "random",
            rulingStyle: "random",
            wealth: "random",
            crime: ["random"],
            domains: ["random"],
            connections: [],
            map: undefined,
            races: undefined,
            tradeNotes: undefined,
            holidays: undefined,
            folklore: undefined,
        }));
    });

    it("keeps provided values for top-level fields", () => {
        const input = {
            size: "Town",
            magic: "High",
            rulingStyle: "Council",
            wealth: "Average",
            crime: ["Pickpocketing"],
            domains: ["arcana"],
            map: "Map1",
            races: "Elves, Humans",
            tradeNotes: "Forest timber",
            holidays: "Spring Festival",
            folklore: "Ancient stories",
            connections: [
                { type: "settlement", id: "settlement-1", role: "leader" },
                { type: "npc", id: "npc-2", role: "friend" },
            ] as NormalizedSettlementInput["connections"],
        };

        const result = normalizeSettlementInput(input);

        expect(result).toEqual(expect.objectContaining({
            ...mockCommon,
            ...mockEnv,
            size: "Town",
            magic: "High",
            rulingStyle: "Council",
            wealth: "Average",
            crime: ["Pickpocketing"],
            domains: ["arcana"],
            map: "Map1",
            races: "Elves, Humans",
            tradeNotes: "Forest timber",
            holidays: "Spring Festival",
            folklore: "Ancient stories",
            connections: [
                { type: "settlement", id: "settlement-1", role: "leader" },
                { type: "npc", id: "npc-2", role: "friend" },
            ],
        }));
    });

    it("trims string fields if provided with extra whitespace", () => {
        const input = {
            size: " Town ",
            magic: " High ",
            rulingStyle: " Council ",
            wealth: " Average ",
        };
        const result = normalizeSettlementInput(input);

        expect(result.size).toBe("Town");
        expect(result.magic).toBe("High");
        expect(result.rulingStyle).toBe("Council");
        expect(result.wealth).toBe("Average");
    });

    it("initializes arrays when empty or missing", () => {
        const input = {
            crime: [],
            domains: [],
            connections: [],
        };
        const result = normalizeSettlementInput(input);

        expect(result.crime).toEqual(["random"]);
        expect(result.domains).toEqual(["random"]);
        expect(result.connections).toEqual([]);
    });

    it("uses environment and common normalization outputs", () => {
        const input = { someField: "test" } as Partial<Settlement>;
        const result = normalizeSettlementInput(input);

        expect(normalizeEnvironmentInput).toHaveBeenCalledWith(input);
        expect(normalizeCommonInput).toHaveBeenCalledWith(input);
        expect(result).toEqual(expect.objectContaining({
            ...mockCommon,
            ...mockEnv,
        }));
    });
});
