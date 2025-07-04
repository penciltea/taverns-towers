'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSiteFragment, { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { generateSiteNameFromFragments } from "@/lib/util/generator/siteNameGenerator";
import { generatorMenuItem, SiteGenerationContext, SiteGenerationInput } from "@/interfaces/site.interface";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteValues, generateSiteValuesFromSettlement, SiteGenerator } from "../modules/site/site.rules";
import { getSettlementById } from "./settlement.actions";
import { generateMenu } from "../modules/site/common/menu.dispatcher";

export async function generateSiteName({
  category,
  siteType,
  shopType,
  guildType,
  terrain,
  climate,
  tags,
}: {
  category?: string;
  shopType?: string;
  guildType?: string;
  siteType?: string[];
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
    shopType,
    guildType,
    terrain,
    climate,
    tags,
  });
}


export async function generateMenuData(
  context: SiteGenerationContext & { singleItem?: boolean }
): Promise<generatorMenuItem[]> {
  await connectToDatabase();

  if (!context.siteType) {
    throw new Error("Missing site type in menu generation context");
  }

  const items = await generateMenu(context);
  return items;
}


export async function generateSiteData(
  type: string,
  input: SiteGenerationInput,
  rerollAll = false
): Promise<SiteFormData> {
  await connectToDatabase();

  // console.log("generator input (fallback path):", {
  //  climate: input.climate,
  //  terrain: input.terrain,
  //  tags: input.tags,
  //  ...input.overrides,
  // });

  if (input.settlementId) {
    // Fetch the full settlement first
    const settlement = await getSettlementById(input.settlementId);

    // Use your helper to generate site data from settlement + overrides
    return generateSiteValuesFromSettlement(type, settlement, input.overrides ?? {});
  }

  // Fallback if no settlement context: just call the generator directly
  const generator = SiteGenerator[type];
  if (!generator) throw new Error(`No generation rules defined for site type: ${type}`);

  const baseInput: SiteGenerationInput = {
    ...input.overrides,
    climate: rerollAll ? input.climate ?? "random" : input.climate,
    terrain: rerollAll ? input.terrain ?? ["random"] : input.terrain,
    tags: rerollAll ? input.tags ?? ["random"] : input.tags
  };

  return await generateSiteValues(type, {
    overrides: input.overrides ?? {},
    climate: rerollAll ? input.climate ?? "random" : input.climate,
    terrain: rerollAll ? input.terrain ?? ["random"] : input.terrain,
    tags: rerollAll ? input.tags ?? ["random"] : input.tags
    // include any other context fields you want to pass along
  });
}