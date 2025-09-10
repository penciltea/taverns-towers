import { SIZE_TYPES } from "@/constants/settlementOptions";
import { getRandom } from "@/lib/util/randomValues";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";
import { applySizeRule } from "./size.rules";

jest.mock("@/lib/util/randomValues");
jest.mock("@/lib/models/generator/settlement/magicByWealth.model");

describe("size.rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("applySizeRule", () => {
        it("applies size if set to 'random'", () => {
            (getRandom as jest.Mock).mockImplementation((arr) => arr[0]);
            
            const input = makeSettlementInput({ size: "random" });
            const result = applySizeRule(input);
            expect(result.size).not.toBe('random');
            expect(result.size).toBeDefined();
        });

        it("preserves size if not set to 'random'", () => {
            const input = makeSettlementInput({ size: "hamlet" });
            const result = applySizeRule(input);
            
            expect(result.size).toBe("hamlet");
            expect(getRandom).not.toHaveBeenCalled();
        });
    });
});