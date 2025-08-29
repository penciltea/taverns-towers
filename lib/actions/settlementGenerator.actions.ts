'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";
import { generateSettlementNameFromFragments } from "@/lib/util/generator/settlementNameGenerator";
import { normalizeSettlementInput, NormalizedSettlementInput } from "../modules/settlement/rules/normalize";
import { Settlement } from "@/interfaces/settlement.interface";
import { generateEnvironment } from "./environmentGenerator.actions";
import { generateSettlementValues } from "../modules/settlement/rules/settlement.rules";


export async function generateSettlementName({
  climate,
  terrain,
  tags,
}: {
  climate: string;
  terrain: string[];
  tags: string[];
}): Promise<string> {
  await connectToDatabase();
  const rawFragments = await GeneratorSettlementFragment.find().lean();

  const fragments = (rawFragments as unknown as GeneratorSettlementFragmentPlain[]).filter(
    (f): f is GeneratorSettlementFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );
  return generateSettlementNameFromFragments(fragments, { climate, terrain, tags });
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

  const data = await generateSettlementValues(normalized);

  const name = await generateSettlementName({
    climate: data.climate,
    terrain: data.terrain,
    tags: data.tags,
  });

  return {
    ...data,
    name,
  };
}