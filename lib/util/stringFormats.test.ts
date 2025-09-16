import { capitalizeFirstLetter, toTitleCase } from "@/lib/util/stringFormats";

describe("String Utilities", () => {
    describe("capitalizeFirstLetter", () => {
        it("capitalizes the first letter of a lowercase word", () => {
            expect(capitalizeFirstLetter("hello")).toBe("Hello");
        });

        it("leaves the first letter uppercase if already capitalized", () => {
            expect(capitalizeFirstLetter("Hello")).toBe("Hello");
        });

        it("does not affect the rest of the string", () => {
            expect(capitalizeFirstLetter("hello world")).toBe("Hello world");
        });

        it("returns empty string if input is empty", () => {
            expect(capitalizeFirstLetter("")).toBe("");
        });

        it("handles single-character strings", () => {
            expect(capitalizeFirstLetter("a")).toBe("A");
        });
  });

    describe("toTitleCase", () => {
        it("capitalizes the first letter of every word", () => {
            expect(toTitleCase("hello world")).toBe("Hello World");
        });

        it("handles mixed case input", () => {
            expect(toTitleCase("hElLo WoRLd")).toBe("HElLo WoRLd");
        });

        it("keeps single letters capitalized", () => {
            expect(toTitleCase("a b c")).toBe("A B C");
        });

        it("handles empty string", () => {
            expect(toTitleCase("")).toBe("");
        });

        it("capitalizes words with punctuation correctly", () => {
            expect(toTitleCase("hello-world test")).toBe("Hello-World Test");
        });
    });
});
