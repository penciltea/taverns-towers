import { GenerateSettlementNameOptions } from "@/interfaces/settlement.interface";
import { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";
import { generateSettlementNameFromFragments } from "./generateSettlementNameFromFragments";

export function dispatchSettlementName(
  fragments: GeneratorSettlementFragmentPlain[],
  options: GenerateSettlementNameOptions
): string {
  return generateSettlementNameFromFragments({
    fragments,
    filters: options,
    ...({
      fallbackFormats: ["{{prefix}}{{suffix}}"],
      allowedKeys: ["prefix", "suffix", "noun", "descriptor", "connector", "size", "theme", "format"],
    }),
  });
}