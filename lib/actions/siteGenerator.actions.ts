'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSiteFragment, { GeneratorSiteFragmentPlain } from "@/lib/models/generatorSiteFragment.model";
import { generateSiteNameFromFragments } from "@/lib/util/generator/siteNameGenerator";
import GeneratorSiteMenu from "@/lib/models/generatorSiteMenu.model";
import { SiteGenerationInput } from "../modules/sites/types";
import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerator } from "../modules/sites/site.rules";

interface GenerateMenuParams {
  siteType: string[];
  shopType?: string;
  settlementTerrain?: string[];
  settlementClimate?: string;
  settlementTags?: string[];
}


export async function generateSiteName({
  category,
  siteType,
  shopType,
  terrain,
  climate,
  tags,
}: {
  category?: string;
  shopType?: string;
  siteType?: string[];
  terrain?: string[];
  climate?: string;
  tags?: string[];
}): Promise<string> {
  await connectToDatabase();

  console.log("climate: ", climate);
  console.log("terrain: " , terrain);
  console.log("tags: ", tags);

  const rawFragments = await GeneratorSiteFragment.find().lean();

  const fragments = (rawFragments as any[]).filter(
    (f): f is GeneratorSiteFragmentPlain =>
      typeof f.type === "string" && typeof f.value === "string"
  );

  return generateSiteNameFromFragments(fragments, {
    category,
    siteType,
    shopType,
    terrain,
    climate,
    tags,
  });
}

export async function generateMenuItems({
  siteType,
  shopType,
  settlementTerrain = [],
  settlementClimate,
  settlementTags = []
}: GenerateMenuParams) {
  await connectToDatabase();

  // Base query filters
  const query: any = {
    siteType,
  };

  // Add shopType filter only if siteType is shop
  if (siteType.includes("shop") && shopType) {
    query.shopType = shopType;
  }

  // We'll fetch candidates matching siteType (+shopType) first
  // Then do filtering on climate/terrain/tags in code to handle empty arrays meaning universal

  const candidates = await GeneratorSiteMenu.find(query).lean();

  // Filter by settlement context
  const filtered = candidates.filter((item) => {
    // Helper to check if item's array is empty OR intersects with settlement array
    const matchesArrayField = (itemField?: string[], settlementField?: string[] | string) => {
      if (!itemField || itemField.length === 0) return true; // universal
      if (!settlementField) return false; // no settlement context, can't match
      if (Array.isArray(settlementField)) {
        return itemField.some(v => settlementField.includes(v));
      } else {
        // settlementField is string (like climate)
        return itemField.includes(settlementField);
      }
    };

    const matchesTerrain = matchesArrayField(item.terrain, settlementTerrain);
    const matchesClimate = matchesArrayField(item.climate, settlementClimate);
    const matchesTags = matchesArrayField(item.tags, settlementTags);

    return matchesTerrain && matchesClimate && matchesTags;
  });

  return filtered.map(({ _id, __v, ...rest }) => rest);
}

export async function generateSiteData(
  type: string,
  input: SiteGenerationInput,
  rerollAll = false
): Promise<SiteFormData> {
  await connectToDatabase();

  const generator = SiteGenerator[type];
  if (!generator) throw new Error(`No generation rules defined for site type: ${type}`);

  const baseInput: SiteGenerationInput = {
    climate: rerollAll ? input.climate ?? "random" : input.climate,
    terrain: rerollAll ? input.terrain ?? ["random"] : input.terrain,
    tags: rerollAll ? input.tags ?? ["random"] : input.tags,
    size: rerollAll ? input.size ?? "random" : input.size,
    condition: rerollAll ? input.condition ?? "random" : input.condition,
    ...input
  };

  const coreData = await generator(baseInput);

  const name = await generateSiteName({
    category: type,
    siteType: [type],
    terrain: baseInput.terrain,
    climate: baseInput.climate,
    tags: baseInput.tags,
  });

  return {
    ...coreData,
    name: coreData.name && coreData.name !== "" ? coreData.name : name,
  };
}