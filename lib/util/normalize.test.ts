import { normalizeSettlementData } from "./normalize";
import { SettlementFormData } from "@/schemas/settlement.schema";

describe("normalizeSettlementData", () => {
    const baseSettlement: Partial<SettlementFormData> = {
        name: "Test Settlement",
        tags: ["tag1", "  ", "tag2"],
        terrain: ["forest", ""],
        crime: ["high", " "],
        domains: ["commerce", "  "],
    };

    it("should filter out empty strings and whitespace-only values", () => {
        const result = normalizeSettlementData(baseSettlement);

        expect(result.tags).toEqual(["tag1", "tag2"]);
        expect(result.terrain).toEqual(["forest"]);
        expect(result.crime).toEqual(["high"]);
        expect(result.domains).toEqual(["commerce"]);
    });

    it("should return empty arrays for missing fields", () => {
        const input: Partial<SettlementFormData> = {
            name: "Settlement Without Arrays",
        };

        const result = normalizeSettlementData(input);

        expect(result.tags).toEqual([]);
        expect(result.terrain).toEqual([]);
        expect(result.crime).toEqual([]);
        expect(result.domains).toEqual([]);
    });

    it("should keep other fields intact", () => {
        const input: Partial<SettlementFormData> = {
            name: "Settlement With Extras",
            description: "A bustling town.",
            tags: ["one"],
        };

        const result = normalizeSettlementData(input);

        expect(result.name).toBe("Settlement With Extras");
        expect(result.description).toBe("A bustling town.");
        expect(result.tags).toEqual(["one"]);
    });

    it("should handle all fields as empty arrays when explicitly set to []", () => {
        const input: Partial<SettlementFormData> = {
            tags: [],
            terrain: [],
            crime: [],
            domains: [],
        };

        const result = normalizeSettlementData(input);

        expect(result.tags).toEqual([]);
        expect(result.terrain).toEqual([]);
        expect(result.crime).toEqual([]);
        expect(result.domains).toEqual([]);
    });
});
