'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";
import { normalizeSettlementInput, NormalizedSettlementInput } from "@/lib/modules/settlement/rules/normalize";
import { Settlement, SettlementGroupKey } from "@/interfaces/settlement.interface";
import { generateEnvironment } from "./environmentGenerator.actions";
import { generateSettlementValues } from "@/lib/modules/settlement/rules/settlement.dispatcher";
import { SETTLEMENT_NAME_FRAGMENT_MAP_BY_TYPE } from "@/lib/modules/settlement/mappings/name.fragment.mappings";
import { dispatchSettlementName } from "@/lib/modules/settlement/rules/name/settlementName.dispatcher";


export async function generateSettlementName({
  climate,
  terrain,
  tags,
  magic,
  wealth,
  size,
  theme
}: {
  climate?: string;
  terrain?: string[];
  tags?: string[];
  magic?: string;
  wealth?: string;
  size?: string;
  theme?: string[];
}): Promise<string> {
  await connectToDatabase();

  let fragments: GeneratorSettlementFragmentPlain[] = [];

  try{
    const rawFragments = await GeneratorSettlementFragment.find().lean<GeneratorSettlementFragmentPlain[]>();

    fragments = rawFragments.filter(
      (f): f is GeneratorSettlementFragmentPlain => 
        typeof f.type === "string" && typeof f.value === "string"
    );
  } catch (error) {
    console.warn("Failed to load settlement name fragments from DB, using fallback data", error);
  }

  // Use fallback if DB fragments are empty
  if (!fragments.length) {
    const fallbackFragments = Object.values(SETTLEMENT_NAME_FRAGMENT_MAP_BY_TYPE).flat().map(frag => ({
      ...frag,
      type: frag.type as SettlementGroupKey,
    }));

    fragments = fallbackFragments;
  }

  return dispatchSettlementName(fragments, {
    climate, terrain, tags, magic, wealth, size, theme
  });
}

export async function generateSettlementData(
  input: Partial<Settlement>,
  rerollAll = false
): Promise<NormalizedSettlementInput & { name: string }> {
  await connectToDatabase();

  const baseInput = rerollAll
    ? {
        climate: "random",
        terrain: ["random"],
        tags: ["random"]
      }
    : input;

  const environment = await generateEnvironment(baseInput);

  const normalized = normalizeSettlementInput({
    ...baseInput,
    ...environment,
  });

  const data = generateSettlementValues(normalized);

  const name = await generateSettlementName({
    climate: data.climate,
    terrain: data.terrain,
    tags: data.tags,
    magic: data.magic,
    wealth: data.wealth,
    size: data.size,
    theme: data.theme
  });

  return {
    ...data,
    name,
  };
}