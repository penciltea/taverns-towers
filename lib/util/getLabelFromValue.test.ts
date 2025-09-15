import { getLabelFromValue } from "@/lib/util/getLabelFromValue";

describe("getLabelFromValue", () => {
    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
    ] as { value: string, label: string }[];

    it("returns the correct label when value exists", () => {
        expect(getLabelFromValue(options, "apple")).toBe("Apple");
        expect(getLabelFromValue(options, "banana")).toBe("Banana");
    });

    it("returns the fallback when value is undefined", () => {
        expect(getLabelFromValue(options, undefined)).toBe("N/A");
        expect(getLabelFromValue(options, undefined, "Unknown")).toBe("Unknown");
    });

    it("returns the value itself when no match and no fallback", () => {
        expect(getLabelFromValue(options, "grape")).toBe("grape");
    });

    it("returns the fallback when no match and fallback is provided", () => {
        expect(getLabelFromValue(options, "grape", "Unknown")).toBe("Unknown");
    });

    it("handles an empty options array", () => {
        expect(getLabelFromValue([] as { value: string; label: string }[], "apple")).toBe("apple");
        expect(getLabelFromValue([] as { value: string; label: string }[], "apple", "Unknown")).toBe("Unknown");
    });
});
