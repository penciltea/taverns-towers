import { normalizeCommonInput, defaultCommonFields, NormalizedCommonInput } from "./normalizeData";
import { CommonInterface } from "@/interfaces/common.interface";

describe("normalizeCommonInput", () => {
    const baseInput: CommonInterface = {
        _id: "abc123",
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        name: "My Test Name",
        userId: "user123",
        editors: ["editor1"],
        isPublic: true,
        publicNotes: "Public note",
        gmNotes: "GM note",
    };

    it("should trim whitespace from name, publicNotes, and gmNotes", () => {
        const input: Partial<CommonInterface> = {
            ...baseInput,
            name: "  Test Name  ",
            publicNotes: "  Some note  ",
            gmNotes: "  Hidden note  ",
        };

        const result = normalizeCommonInput(input);

        expect(result).toEqual<NormalizedCommonInput>({
            name: "Test Name",
            userId: "user123",
            editors: ["editor1"],
            isPublic: true,
            publicNotes: "Some note",
            gmNotes: "Hidden note",
        });
    });

    it("should fall back to default values when fields are missing", () => {
        const input: Partial<CommonInterface> = {};

        const result = normalizeCommonInput(input);

        expect(result).toEqual<NormalizedCommonInput>({
            name: "Untitled",
            userId: "",
            editors: [],
            isPublic: false,
            publicNotes: "",
            gmNotes: "",
        });
    });

    it("should correctly use provided values without modification", () => {
        const input: Partial<CommonInterface> = {
            name: "My World",
            userId: "user456",
            editors: ["a", "b"],
            isPublic: true,
            publicNotes: "Notes",
            gmNotes: "Private",
        };

        const result = normalizeCommonInput(input);

        expect(result).toEqual<NormalizedCommonInput>({
            name: "My World",
            userId: "user456",
            editors: ["a", "b"],
            isPublic: true,
            publicNotes: "Notes",
            gmNotes: "Private",
        });
    });

    it("should default to empty string when name is blank or only whitespace", () => {
        const input: Partial<CommonInterface> = { name: "   " };

        const result = normalizeCommonInput(input);

        expect(result.name).toBe("Untitled");
    });
    });

    describe("defaultCommonFields", () => {
    it("should match the expected default values", () => {
        expect(defaultCommonFields).toEqual<NormalizedCommonInput>({
            name: "",
            userId: "",
            editors: [],
            isPublic: false,
            publicNotes: "",
            gmNotes: "",
        });
    });
});
