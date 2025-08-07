import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import type { NpcGroupKey } from "@/interfaces/npc.interface";

export function groupNpcFragmentsByType(fragments: GeneratorNpcFragmentPlain[]): Record<NpcGroupKey, GeneratorNpcFragmentPlain[]> {
  return {
    prefix: fragments.filter(f => f.type === "prefix"),
    suffix: fragments.filter(f => f.type === "suffix"),
    first: fragments.filter(f => f.type === "first"),
    last: fragments.filter(f => f.type === "last"),
    fullName: fragments.filter(f => f.type === "fullName"),
    format: fragments.filter(f => f.type === "format"),
  };
}