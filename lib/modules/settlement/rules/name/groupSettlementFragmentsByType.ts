import { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";
import { SettlementGroupKey } from "@/interfaces/settlement.interface";

export function groupSettlementFragmentsByType(fragments: GeneratorSettlementFragmentPlain[]): Record<SettlementGroupKey, GeneratorSettlementFragmentPlain[]> {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    noun: fragments.filter(f => f.type === "noun"),
    descriptor: fragments.filter(f => f.type === "descriptor"),
    connector: fragments.filter(f => f.type === "connector"),
    size: fragments.filter(f => f.type === "size"),
    theme: fragments.filter(f => f.type === "theme"),
    format: fragments.filter(f => f.type === "format")
  };
}