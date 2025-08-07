import { generateNpcNameFromFragments } from "./generateNpcNameFromFragments";
import { GenerateNpcNameOptions } from "@/interfaces/npc.interface";
import { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { npcNameGeneratorConfigs } from "./nameGenerator.configs";

export function dispatchNpcName(
  fragments: GeneratorNpcFragmentPlain[],
  options: GenerateNpcNameOptions
): string {
  const npcTypeKey = (options.race?.[0] ?? "").toLowerCase();
  const config = npcNameGeneratorConfigs[npcTypeKey] ?? npcNameGeneratorConfigs.default;

  return generateNpcNameFromFragments({
    fragments,
    filters: options,
    ...config,
  });
}