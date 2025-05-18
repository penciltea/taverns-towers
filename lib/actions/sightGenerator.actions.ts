'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSightFragment, { GeneratorSightFragmentPlain } from "@/lib/models/generatorSightFragment.model";
import { generateSightNameFromFragments } from "@/lib/util/sightNameGenerator";

export async function generateSightName({
  category,
  sightType,
  terrain,
  climate,
  tags,
}: {
  category?: string;
  sightType?: string;
  terrain?: string[];
  climate?: string;
  tags?: string[];
}): Promise<string> {
  await connectToDatabase();

  const rawFragments = await GeneratorSightFragment.find().lean();

  const fragments = (rawFragments as any[]).filter(
    (f): f is GeneratorSightFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );

  return generateSightNameFromFragments(fragments, {
    category,
    sightType,
    terrain,
    climate,
    tags,
  });
}