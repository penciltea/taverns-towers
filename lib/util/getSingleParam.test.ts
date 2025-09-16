import { getSingleParam } from "@/lib/util/getSingleParam";

describe("getSingleParam", () => {
    it("returns the first element if param is an array", () => {
        expect(getSingleParam(["one", "two", "three"])).toBe("one");
        expect(getSingleParam(["single"])).toBe("single");
    });

    it("returns the string itself if param is a string", () => {
        expect(getSingleParam("hello")).toBe("hello");
    });

    it("returns undefined if param is undefined", () => {
        expect(getSingleParam(undefined)).toBeUndefined();
    });

    it("handles an empty array by returning undefined", () => {
        expect(getSingleParam([])).toBeUndefined();
    });
});
