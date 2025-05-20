'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSettlementFragment, { GeneratorSettlementFragmentPlain } from "@/lib/models/generatorSettlementFragment.model";
import { generateSettlementNameFromFragments } from "@/lib/util/generator/settlementNameGenerator";

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
