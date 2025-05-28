import { MAGIC_LEVELS } from "@/constants/settlementOptions";
import { getRandom } from "@/lib/util/randomValues";
import { MagicByWealth } from "../mappings/magic.mappings";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";

// Logic for setting Magic use/levels based off settlement wealth
export function applyMagicByWealthRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
  if (data.wealth && data.wealth !== "random" && data.magic === "random") {
    const options = MagicByWealth[data.wealth] || MAGIC_LEVELS;
    data.magic = getRandom(options);
  }
  return data;
}
