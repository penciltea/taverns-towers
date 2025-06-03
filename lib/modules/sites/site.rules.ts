import { SiteFormData } from "@/schemas/site.schema";
import { generateEntertainmentValues } from "./entertainment.rules";
import { generateHiddenValues } from "./hidden.rules";
import { generateTavernValues } from "./tavern.rules";
import { SiteGenerationInput } from "./types";
import { generateGovernmentValues } from "./government.rules";
import { generateGuildValues } from "./guild.rules";
import { generateMiscellaneousValues } from "./miscellaneous.rules";
import { generateResidenceValues } from "./residence.rules";
import { generateShopValues } from "./shop.rules";
import { generateTempleValues } from "./temple.rules";

export const SiteGenerator: Record<string, (input: SiteGenerationInput) => Promise<SiteFormData> > = {
    entertainment: generateEntertainmentValues,
    government: generateGovernmentValues,
    guild: generateGuildValues,    
    hidden: generateHiddenValues,
    miscellaneous: generateMiscellaneousValues,
    residence: generateResidenceValues,
    shop: generateShopValues,
    tavern: generateTavernValues,
    temple: generateTempleValues
};