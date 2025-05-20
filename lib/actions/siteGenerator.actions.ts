'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSiteFragment, { GeneratorSiteFragmentPlain } from "@/lib/models/generatorSiteFragment.model";
import { generateSiteNameFromFragments } from "@/lib/util/siteNameGenerator";

export async function generateSiteName({
  category,
  siteType,
  terrain,
  climate,
  tags,
}: {
  category?: string;
  siteType?: string;
  terrain?: string[];
  climate?: string;
  tags?: string[];
}): Promise<string> {
  await connectToDatabase();

  const rawFragments = await GeneratorSiteFragment.find().lean();

  const fragments = (rawFragments as any[]).filter(
    (f): f is GeneratorSiteFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );

  return generateSiteNameFromFragments(fragments, {
    category,
    siteType,
    terrain,
    climate,
    tags,
  });
}