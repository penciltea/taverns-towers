import { getRandom } from "@/lib/util/randomValues";
import { MagicByWealthMapping } from "../mappings/magic.mappings";
import { NormalizedSettlementInput } from "./normalize";

// Logic for setting Magic use/levels based off settlement wealth
export function applyMagicByWealthRule(data: NormalizedSettlementInput){
  if (
    data.wealth &&
    data.wealth !== "random" &&
    data.magic === "random"
  ) {
    const results = MagicByWealthMapping[data.wealth] ?? [];

    data.magic = getRandom(results);
  }

  return data;
}