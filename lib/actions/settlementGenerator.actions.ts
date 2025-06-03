'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generatorSettlementFragment.model";
import { generateSettlementNameFromFragments } from "@/lib/util/generator/settlementNameGenerator";
import { normalizeSettlementInput, NormalizedSettlementInput } from "../modules/settlements/rules/normalize";
import { Settlement } from "@/interfaces/settlement.interface";
import { generateEnvironment } from "./environmentGenerator.actions";
import { generateSettlementValues } from "../modules/settlements/rules/settlement.rules";


export async function generateSettlementName({
  terrain,
  tags,
}: {
  terrain: string[];
  tags: string[];
}): Promise<string> {
  await connectToDatabase();
  const rawFragments = await GeneratorSettlementFragment.find().lean();

  const fragments = (rawFragments as any[]).filter(
    (f): f is GeneratorSettlementFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );
  return generateSettlementNameFromFragments(fragments, { terrain, tags });
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
    terrain: data.terrain,
    tags: data.tags,
  });

  return {
    ...data,
    name,
  };
}