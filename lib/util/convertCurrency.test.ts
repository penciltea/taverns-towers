import { convertCpToCurrency, formatCurrencyFromCp } from "@/lib/util/convertCurrency";

describe("Currency Helpers", () => {

  describe("convertCpToCurrency", () => {
    it("converts cp to gp, sp, cp correctly", () => {
      expect(convertCpToCurrency(0)).toEqual({ gp: 0, sp: 0, cp: 0 });
      expect(convertCpToCurrency(5)).toEqual({ gp: 0, sp: 0, cp: 5 });
      expect(convertCpToCurrency(12)).toEqual({ gp: 0, sp: 1, cp: 2 });
      expect(convertCpToCurrency(123)).toEqual({ gp: 1, sp: 2, cp: 3 });
      expect(convertCpToCurrency(999)).toEqual({ gp: 9, sp: 9, cp: 9 });
      expect(convertCpToCurrency(1000)).toEqual({ gp: 10, sp: 0, cp: 0 });
    });
  });

  describe("formatCurrencyFromCp", () => {
    it("formats 0 correctly", () => {
      expect(formatCurrencyFromCp(0)).toBe("0 cp");
    });

    it("formats cp only", () => {
      expect(formatCurrencyFromCp(7)).toBe("7 cp");
    });

    it("formats sp and cp", () => {
      expect(formatCurrencyFromCp(42)).toBe("4 sp, 2 cp");
    });

    it("formats gp, sp, and cp", () => {
      expect(formatCurrencyFromCp(123)).toBe("1 gp, 2 sp, 3 cp");
      expect(formatCurrencyFromCp(999)).toBe("9 gp, 9 sp, 9 cp");
    });

    it("formats gp only", () => {
      expect(formatCurrencyFromCp(200)).toBe("2 gp");
    });

    it("formats gp and cp, skipping sp if zero", () => {
      expect(formatCurrencyFromCp(105)).toBe("1 gp, 5 cp");
    });

    it("formats gp and sp, skipping cp if zero", () => {
      expect(formatCurrencyFromCp(120)).toBe("1 gp, 2 sp");
    });

    it("handles large values correctly", () => {
      expect(formatCurrencyFromCp(12345)).toBe("123 gp, 4 sp, 5 cp");
    });
  });

});
