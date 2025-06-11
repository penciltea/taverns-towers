import { SiteFormData } from "@/schemas/site.schema";
import { generateEntertainmentValues } from "./entertainment.rules";
import { generateHiddenValues } from "./hidden.rules";
import { generateTavernData } from "./tavern/rules";
import { SiteGenerationInput } from "./types";
import { generateGovernmentValues } from "./government.rules";
import { generateGuildValues } from "./guild.rules";
import { generateMiscellaneousValues } from "./miscellaneous.rules";
import { generateResidenceValues } from "./residence.rules";
import { generateShopValues } from "./shop.rules";
import { generateTempleValues } from "./temple.rules";
import { Settlement } from "@/interfaces/settlement.interface";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";

export const SiteGenerator: Record<string, (input: SiteGenerationInput) => Promise<SiteFormData> > = {
    entertainment: generateEntertainmentValues,
    government: generateGovernmentValues,
    guild: generateGuildValues,    
    hidden: generateHiddenValues,
    miscellaneous: generateMiscellaneousValues,
    residence: generateResidenceValues,
    shop: generateShopValues,
    tavern: generateTavernData,
    temple: generateTempleValues
};

export async function generateSiteValues(
  type: string,
  input: SiteGenerationInput
): Promise<SiteFormData> {
  const generator = SiteGenerator[type];
  if (!generator) throw new Error(`No generation rules defined for site type: ${type}`);

  const baseData = await generator(input);

  const name = await generateSiteName({
    category: type,
    siteType: [type],
    terrain: input.terrain,
    climate: input.climate,
    tags: input.tags,
  });

  return {
    ...baseData,
    name: baseData.name && baseData.name !== "" ? baseData.name : name,
  };
}

export async function generateSiteValuesFromSettlement(
  type: string,
  settlement: Pick<Settlement, "climate" | "terrain" | "tags">,
  overrides: Partial<SiteFormData> = {}
): Promise<SiteFormData> {
  return await generateSiteValues(type, {
    climate: settlement.climate,
    terrain: settlement.terrain,
    tags: settlement.tags,
    ...overrides,
  });
}
