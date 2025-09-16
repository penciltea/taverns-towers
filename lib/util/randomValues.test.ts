import { getRandomFromArray, getRandomSubset, getRandom, weightedRandom, shouldReplace } from "./randomValues";

describe("getRandomFromArray", () => {
    beforeEach(() => {
        jest.spyOn(Math, "random").mockReturnValue(0.5); // always middle
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns an element from the array", () => {
        const arr = ["a", "b", "c"];
        const result = getRandomFromArray(arr);
        expect(arr).toContain(result);
    });

    it("is deterministic with mocked Math.random", () => {
        const arr = ["a", "b", "c"];
        const result = getRandomFromArray(arr);
        expect(result).toBe("b"); // index 1 when Math.random = 0.5
    });
});

describe("getRandomSubset", () => {
    beforeEach(() => {
        jest.spyOn(Math, "random").mockReturnValue(0.5);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns empty array if input is empty", () => {
        expect(getRandomSubset([], { count: 2 })).toEqual([]);
    });

    it("respects count option", () => {
        const arr = ["a", "b", "c"];
        const result = getRandomSubset(arr, { count: 2 });
        expect(result).toHaveLength(2);
        result.forEach(item => expect(arr).toContain(item));
    });

    it("respects min/max option", () => {
        const arr = ["a", "b", "c", "d"];
        const result = getRandomSubset(arr, { min: 1, max: 3 });
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(3);
    });

    it("handles min larger than array length", () => {
        const arr = ["a", "b"];
        const result = getRandomSubset(arr, { min: 5, max: 10 });
        // bounded min/max ensures no error
        expect(result.length).toBeLessThanOrEqual(arr.length);
    });

    it("removes duplicates before slicing", () => {
        const arr = ["a", "a", "b", "b"];
        const result = getRandomSubset(arr, { count: 2 });
        expect(new Set(result).size).toBe(result.length);
    });
});

describe("getRandom", () => {
    beforeEach(() => {
        jest.spyOn(Math, "random").mockReturnValue(0.9);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns an element from the list", () => {
        const list = [1, 2, 3];
        const result = getRandom(list);
        expect(list).toContain(result);
    });

    it("is deterministic with mocked Math.random", () => {
        const list = ["x", "y", "z"];
        const result = getRandom(list);
        expect(result).toBe("z"); // index 2 when Math.random = 0.9
    });
});

describe("weightedRandom", () => {
    beforeEach(() => {
        jest.spyOn(Math, "random").mockReturnValue(0.2);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("returns undefined for empty list", () => {
        expect(weightedRandom([])).toBeUndefined();
    });

    it("respects weights when picking items", () => {
        const items = [
            { value: "a", weight: 3 },
            { value: "b", weight: 1 },
        ];
        const result = weightedRandom(items);
        expect(result).toBeDefined();
        expect(["a", "b"]).toContain(result?.value);
    });

    it("defaults weight to 1 if not provided", () => {
        const items = [
            { value: "a" },
            { value: "b" },
        ];
        const result = weightedRandom(items);
        expect(result).toBeDefined();
        expect(["a", "b"]).toContain(result?.value);
    });
});

describe("shouldReplace", () => {
    it("returns true for undefined, null, or empty string", () => {
        expect(shouldReplace(undefined)).toBe(true);
        expect(shouldReplace(null)).toBe(true);
        expect(shouldReplace("")).toBe(true);
    });

    it("returns true for empty arrays", () => {
        expect(shouldReplace([])).toBe(true);
    });

    it("returns true for arrays containing 'random' (case-insensitive)", () => {
        expect(shouldReplace(["random"])).toBe(true);
        expect(shouldReplace(["RaNdOm"])).toBe(true);
    });

    it("returns false for non-random arrays", () => {
        expect(shouldReplace(["a", "b"])).toBe(false);
    });

    it("returns true for string 'random' (case-insensitive)", () => {
        expect(shouldReplace("random")).toBe(true);
        expect(shouldReplace("RaNdOm")).toBe(true);
    });

    it("returns false for non-random string", () => {
        expect(shouldReplace("hello")).toBe(false);
    });

    it("returns false for non-string, non-array values", () => {
        expect(shouldReplace(42)).toBe(false);
        expect(shouldReplace({ key: "value" })).toBe(false);
    });
});
