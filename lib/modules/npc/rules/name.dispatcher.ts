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

  const filteredFragments = config.allowedKeys
    ? fragments.filter((frag) => config.allowedKeys!.includes(frag.type))
    : fragments;

    //console.log("Final fragment pool:", filteredFragments.map(f => `${f.type}: ${f.value}`));

  return generateNpcNameFromFragments({
    fragments: filteredFragments,
    filters: options,
    ...config,
  });
}