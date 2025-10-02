import { SIZE_TYPES } from "@/constants/settlement.options";
import { getRandom } from "@/lib/util/randomValues";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";

// Logic for setting Size if set to "random"
export function applySizeRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
  if (data.size === "random") {
    data.size = getRandom(SIZE_TYPES);
  }
  return data;
}