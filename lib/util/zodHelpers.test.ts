import { extractValues, optionalEnum, optionalEnumArray } from "@/lib/util/zodHelpers";

describe("zodHelpers", () => {
    describe("extractValues", () => {
        it("extracts values from array of objects", () => {
        const input = [{ value: "a" }, { value: "b" }, { value: "c" }] as const;
        const result = extractValues(input);
        expect(result).toEqual(["a", "b", "c"]);
        expect(result[0]).toBe("a"); // ensures tuple type [string, ...string[]]
        });

        it("throws an error if array is empty", () => {
        expect(() => extractValues([] as const)).toThrow("Cannot create enum from empty array");
        });
    });

    describe("optionalEnum", () => {
        const allowed: [string, ...string[]] = ["a", "b", "c"];
        const schema = optionalEnum(allowed);

        it("allows undefined", () => {
            expect(schema.parse(undefined)).toBeUndefined();
        });

        it("transforms empty string to undefined", () => {
            expect(schema.parse("")).toBeUndefined();
        });

        it("allows valid value", () => {
            expect(schema.parse("b")).toBe("b");
        });

        it("throws error for invalid value", () => {
            expect(() => schema.parse("d")).toThrow("Invalid value");
        });

        it("allows custom error message", () => {
            const custom = optionalEnum(allowed, "Custom error");
            expect(() => custom.parse("d")).toThrow("Custom error");
        });
    });

    describe("optionalEnumArray", () => {
        const allowed = ["a", "b", "c"] as const;
        const schema = optionalEnumArray(allowed);

        it("allows undefined", () => {
            expect(schema.parse(undefined)).toBeUndefined();
        });

        it("transforms empty array to undefined", () => {
            expect(schema.parse([])).toBeUndefined();
        });

        it("allows array of valid values", () => {
            expect(schema.parse(["a", "c"])).toEqual(["a", "c"]);
        });

        it("throws error if array contains invalid value", () => {
            expect(() => schema.parse(["a", "d"])).toThrow("Invalid value");
        });

        it("allows custom error message", () => {
            const custom = optionalEnumArray(allowed, "Custom array error");
            expect(() => custom.parse(["x"])).toThrow("Custom array error");
        });
    });
});
