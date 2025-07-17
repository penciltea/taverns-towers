'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorSiteFragment, { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { generatorMenuItem, GroupKey, SiteGenerationContext, SiteGenerationInput } from "@/interfaces/site.interface";
import { SiteFormData } from "@/schemas/site.schema";
import { generateSiteValues, generateSiteValuesFromSettlement, SiteGenerator } from "../modules/site/site.rules";
import { getSettlementById } from "./settlement.actions";
import { generateMenu } from "../modules/site/common/menu.dispatcher";
import { dispatchSiteName } from "../modules/site/name/name.dispatcher";
import { NAME_FRAGMENT_MAP_BY_TYPE } from "../modules/site/name/name.fragment.mappings";

export async function generateSiteName({
  siteType,
  shopType,
  guildType,
  venueType,
  functionType,
  domains,
  terrain,
  climate,
  tags,
  data
}: {
  shopType?: string;   // Form uses string value
  guildType?: string;  // Form uses string value
  venueType?: string;
  functionType?: string;
  domains?: string[];
  siteType?: string[];
  terrain?: string[];
  climate?: string;
  tags?: string[];
  data?: Partial<SiteFormData>;
}): Promise<string> {
  await connectToDatabase();

  let fragments: GeneratorSiteFragmentPlain[] = [];

  try {
    const rawFragments = await GeneratorSiteFragment.find().lean();
    fragments = (rawFragments as any[]).filter(
      (f): f is GeneratorSiteFragmentPlain =>
        typeof f.type === "string" && typeof f.value === "string"
    );
  } catch (error) {
    console.warn("Failed to load site name fragments from DB, using fallback data", error);
  }

  // Use fallback if DB fragments are empty
  if (!fragments.length) {
    const fallbackFragments = Object.values(NAME_FRAGMENT_MAP_BY_TYPE).flat().map(frag => ({
      ...frag,
      type: frag.type as GroupKey,
    }));

    fragments = fallbackFragments;
  }

  const toArray = <T>(val?: T | T[]): T[] | undefined =>
    val === undefined ? undefined : Array.isArray(val) ? val : [val];

  return dispatchSiteName(fragments, {
    siteType,
    shopType: toArray(shopType),
    guildType: toArray(guildType),
    venueType: toArray(venueType),
    functionType: toArray(functionType),
    domains: toArray(domains),
    terrain,
    climate,
    tags,
    data,
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

  return await generateSiteValues(type, baseInput);
}