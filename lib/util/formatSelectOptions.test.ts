import { toSelectOptions } from "@/lib/util/formatSelectOptions";

describe("toSelectOptions", () => {
    it("converts an array of strings to objects with value and label", () => {
        const input = ["apple", "banana", "cherry"];
        const result = toSelectOptions(input);

        expect(result).toEqual([
            { value: "apple", label: "apple" },
            { value: "banana", label: "banana" },
            { value: "cherry", label: "cherry" },
        ]);
    });

    it("returns an empty array when given an empty array", () => {
        const input: string[] = [];
        const result = toSelectOptions(input);

        expect(result).toEqual([]);
    });

    it("handles strings with spaces and special characters", () => {
        const input = ["New York", "Café", "Rock & Roll"];
        const result = toSelectOptions(input);

        expect(result).toEqual([
            { value: "New York", label: "New York" },
            { value: "Café", label: "Café" },
            { value: "Rock & Roll", label: "Rock & Roll" },
        ]);
    });

    it("handles duplicate strings correctly", () => {
        const input = ["apple", "apple"];
        const result = toSelectOptions(input);

        expect(result).toEqual([
            { value: "apple", label: "apple" },
            { value: "apple", label: "apple" },
        ]);
    });

    it("does not mutate the original array", () => {
        const input = ["apple", "banana"];
        const copy = [...input];
        toSelectOptions(input);
        expect(input).toEqual(copy);
    });
});
