import { SIZE_TYPES, THEME } from "@/constants/settlement.options";
import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeSettlementInput, NormalizedSettlementInput } from "./normalize";

// Logic for setting Size if set to "random"
export function applySizeRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
  if (data.size === "random") {
    data.size = getRandom(SIZE_TYPES);
  }
  return data;
}

export function applySettlementThemeRule(data: ReturnType<typeof normalizeSettlementInput>): NormalizedSettlementInput {
  if(shouldReplace(data.theme)){
    const allThemeOptions = THEME.flatMap(group => group.options);
    data.theme = [getRandom(allThemeOptions).value];
  }
  return data;
}