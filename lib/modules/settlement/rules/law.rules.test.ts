import { applyWealthBySizeRule, applyCrimeByWealthRule, applyRulingStyleBySizeRule } from "./law.rules";
import { getRandom } from "@/lib/util/randomValues";
import { WealthBySize } from "@/lib/models/generator/settlement/wealthByRule.model";
import { CrimeByWealth } from "@/lib/models/generator/settlement/crimeByWealth.model";
import { RulingStyleBySize } from "@/lib/models/generator/settlement/rulingStyleBySize.model";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";
import { WealthBySizeMapping, CrimeByWealthMapping, RulingBySizeMapping } from "../mappings/law.mappings";

jest.mock("@/lib/util/randomValues");
jest.mock("@/lib/models/generator/settlement/wealthByRule.model");
jest.mock("@/lib/models/generator/settlement/crimeByWealth.model");
jest.mock("@/lib/models/generator/settlement/rulingStyleBySize.model");

describe("law.rules", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("applyWealthBySizeRule", () => {
    it("sets wealth based on DB entry if present", async () => {
      const input = makeSettlementInput({ size: "Town", wealth: "random" });
      (WealthBySize.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ wealth: ["Low", "Average"] }),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

      const result = await applyWealthBySizeRule(input);
      expect(result.wealth).toBe("Low");
    });

    it("uses fallback mapping if DB returns nothing", async () => {
      const input = makeSettlementInput({ size: "Village", wealth: "random" });
      (WealthBySize.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

      const result = await applyWealthBySizeRule(input);
      expect(result.wealth).toBe(WealthBySizeMapping["Village"][0]);
    });

    it("does nothing if wealth is not 'random'", async () => {
      const input = makeSettlementInput({ size: "Town", wealth: "High" });
      const result = await applyWealthBySizeRule(input);

      expect(result.wealth).toBe("High");
      expect(WealthBySize.findOne).not.toHaveBeenCalled();
    });

    it("does nothing if size is 'random'", async () => {
      const input = makeSettlementInput({ size: "random", wealth: "random" });
      const result = await applyWealthBySizeRule(input);
      
      expect(result.wealth).toBe("random");
      expect(WealthBySize.findOne).not.toHaveBeenCalled();
    });
  });

  describe("applyCrimeByWealthRule", () => {
    it("replaces 'random' crime based on DB entry", async () => {
      const input = makeSettlementInput({ crime: ["random"], wealth: "Average" });
      (CrimeByWealth.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ crime: ["Theft", "Burglary"] }),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[1]);

      const result = await applyCrimeByWealthRule(input);
      expect(result.crime).toEqual(["Burglary"]);
    });

    it("uses fallback mapping if DB returns nothing", async () => {
      const input = makeSettlementInput({ crime: ["random"], wealth: "Struggling" });
      (CrimeByWealth.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

      const result = await applyCrimeByWealthRule(input);
      expect(result.crime).toEqual([CrimeByWealthMapping["Struggling"][0]]);
    });

    it("does not change crime if no 'random' present", async () => {
      const input = makeSettlementInput({ crime: ["Theft"], wealth: "Average" });
      const result = await applyCrimeByWealthRule(input);
      expect(result.crime).toEqual(["Theft"]);
      expect(CrimeByWealth.findOne).not.toHaveBeenCalled();
    });
  });

  describe("applyRulingStyleBySizeRule", () => {
    it("sets rulingStyle based on DB entry if present", async () => {
      const input = makeSettlementInput({ size: "Town", rulingStyle: "random" });
      (RulingStyleBySize.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue({ rulingStyle: ["Council", "Monarchy"] }),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[1]);

      const result = await applyRulingStyleBySizeRule(input);
      expect(result.rulingStyle).toBe("Monarchy");
    });

    it("uses fallback mapping if DB returns nothing", async () => {
      const input = makeSettlementInput({ size: "City", rulingStyle: "random" });
      (RulingStyleBySize.findOne as jest.Mock).mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      });
      (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

      const result = await applyRulingStyleBySizeRule(input);
      expect(result.rulingStyle).toBe(RulingBySizeMapping["City"][0]);
    });

    it("does nothing if rulingStyle is not 'random'", async () => {
      const input = makeSettlementInput({ size: "Town", rulingStyle: "Monarchy" });
      const result = await applyRulingStyleBySizeRule(input);
      expect(result.rulingStyle).toBe("Monarchy");
      expect(RulingStyleBySize.findOne).not.toHaveBeenCalled();
    });
  });
});
