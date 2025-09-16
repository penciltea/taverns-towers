import { applyMagicByWealthRule } from "./magic.rules";
import { getRandom } from "@/lib/util/randomValues";
import { MagicByWealthMapping } from "../mappings/magic.mappings";
import { MagicByWealth } from "@/lib/models/generator/settlement/magicByWealth.model";
import { makeSettlementInput } from "@/lib/util/fixtures/settlementInputBuilder";

jest.mock("@/lib/util/randomValues");
jest.mock("@/lib/models/generator/settlement/magicByWealth.model");

describe("magic.rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("applyMagicByWealthRule", () => {
        it("sets magic based on DB entry if present", async () => {
            const input = makeSettlementInput({ magic: "random", wealth: "Modest" });
            (MagicByWealth.findOne as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue({ magic: ["Low", "Moderate"] }),
            });
            (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

            const result = await applyMagicByWealthRule(input);
            expect(result.magic).toBe("Low");
        });

        it("uses fallback mapping if DB returns nothing", async () => {
            const input = makeSettlementInput({ magic: "random", wealth: "Modest" });
            (MagicByWealth.findOne as jest.Mock).mockReturnValue({
                lean: jest.fn().mockResolvedValue(null),
            });
            (getRandom as jest.Mock).mockImplementation(arr => arr[0]);

            const result = await applyMagicByWealthRule(input);
            expect(result.magic).toBe(MagicByWealthMapping["Modest"][0]);
        });

        it("does nothing if magic is not 'random'", async () => {
            const input = makeSettlementInput({ magic: "Low", wealth: "Affluent" });
            const result = await applyMagicByWealthRule(input);

            expect(result.magic).toBe("Low");
            expect(MagicByWealth.findOne).not.toHaveBeenCalled();
        });

        it("does nothing if wealth is 'random'", async () => {
            const input = makeSettlementInput({ magic: "Low", wealth: "random" });
            const result = await applyMagicByWealthRule(input);

            expect(result.wealth).toBe("random");
            expect(MagicByWealth.findOne).not.toHaveBeenCalled();
        });
    });
});

