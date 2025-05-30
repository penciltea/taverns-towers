import { governmentSchema, type SiteFormData } from "@/schemas/site.schema";
import type { Settlement } from "@/interfaces/settlement.interface";
import type { SiteGenerationInput } from "./types";
import { generateSiteName } from "@/lib/actions/siteGenerator.actions";
import { generateTavernValues } from "./tavernRules";
import { generateEntertainmentValues } from "./entertainmentRules";
import { generateHiddenValues } from "./hiddenRules";
import { generateGovernmentValues } from "./governmentRules";
import { generateMiscellaneousValues } from "./miscellaneousRules";
import { generateResidenceValues } from "./residenceRules";
import { generateGuildValues } from "./guildRules";
import { generateTempleValues } from "./temple";
import { generateShopValues } from "./shopRules";

// ─── Rules for Tavern ──────────────────────────────────────

type NormalizedTavernInput = SiteFormData & {
  size: string;
  condition: string;
  terrain: string[];
  tags: string[];
  climate: string;
};


// ─── Dispatcher & Generator ─────────────────────────────────

export const SITE_GENERATION_RULES: Record<string, (input: SiteGenerationInput) => SiteFormData> = {
  tavern: generateTavernValues,
  entertainment: generateEntertainmentValues,
  hidden: generateHiddenValues,
  government: generateGovernmentValues,
  miscellaneous: generateMiscellaneousValues,
  residence: generateResidenceValues,
  guild: generateGuildValues,
  temple: generateTempleValues,
  shop: generateShopValues
};

export async function generateSiteValues(
  type: string,
  input: SiteGenerationInput
): Promise<SiteFormData> {
  const generator = SITE_GENERATION_RULES[type];
  if (!generator) throw new Error(`No generation rules defined for site type: ${type}`);

  const baseData = generator(input);

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
