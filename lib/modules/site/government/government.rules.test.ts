import { generateGovernmentData, applyGovernmentFunctionRule, applySecurityByConditions } from "./government.rules";
import { SiteGovernmentFunctionType } from "@/constants/site/government.options";
import { SECURITY_BASELINE_BY_FUNCTION } from "./mappings/government.mappings";
import { getRandom } from "@/lib/util/randomValues";
import { SiteFormData } from "@/schemas/site.schema";

jest.mock("@/lib/util/randomValues", () => ({
    getRandom: jest.fn(),
}));

type GovernmentFormData = Extract<SiteFormData, { type: "government" }>;
type GovernmentTestData = Partial<GovernmentFormData> & { type: "government" };

describe("government.rules", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("applyGovernmentFunctionRule", () => {
        it("returns early if not government type", async () => {
            const data: SiteFormData = { type: "temple" } as SiteFormData;
            const result = await applyGovernmentFunctionRule(data);
            expect(result).toBe(data);
        });

        it("assigns a random government function if missing", async () => {
            const mockFunction = "court" as SiteGovernmentFunctionType;
            (getRandom as jest.Mock).mockReturnValue(mockFunction);

            const data: GovernmentTestData = { type: "government" };
            const result = await applyGovernmentFunctionRule(data);

            expect((result as Partial<SiteFormData> & { function: string }).function).toBe(mockFunction);
        });

        it("does not overwrite existing function", async () => {
            const data: GovernmentTestData = {
                type: "government",
                function: "townHall",
            };
            const result = await applyGovernmentFunctionRule(data);

            expect((result as Partial<SiteFormData> & { function: string }).function).toBe("townHall");
            expect(getRandom).not.toHaveBeenCalled();
        });
    });

    describe("applySecurityByConditions", () => {
        it("returns early if not government type", async () => {
            const data: SiteFormData = { type: "temple" } as SiteFormData;
            const result = await applySecurityByConditions(data);
            expect(result).toBe(data);
        });

        it("sets security based on size/condition/function", async () => {
            const data: GovernmentTestData = {
                type: "government",
                function: "courthouse",
                size: "large",
                condition: "excellent",
            };

            const result = await applySecurityByConditions(data);
            const allowed = SECURITY_BASELINE_BY_FUNCTION["courthouse"];
            const govResult = result as GovernmentTestData & { security: string };

            expect(allowed).toContain(govResult.security);
        });

        it("falls back if function not in SECURITY_BASELINE_BY_FUNCTION", async () => {
            const data: GovernmentTestData = {
                type: "government",
                function: "unknown-function" as SiteGovernmentFunctionType,
                size: "small",
                condition: "poor",
            };

            const result = await applySecurityByConditions(data);
            expect((result as Partial<SiteFormData> & { security: string }).security).toBe("low");
        });
    });

    describe("generateGovernmentData", () => {
        it("generates a government site with required fields", async () => {
            const input = { size: "medium" };
            const result = await generateGovernmentData(input);

            expect(result.type).toBe("government");
            expect(result).toHaveProperty("function");
            expect(result).toHaveProperty("security");
        });
    });
});
