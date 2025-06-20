import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { filterByClimate, filterByTerrain } from "../tavern/menu.rules";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => GeneratorSiteMenuPlain[];

export const menuRulesBySiteType: Record<string, MenuRuleFn[]> = {
  tavern: [filterByClimate, filterByTerrain],
  //shop: [filterByClimate, filterByMagicLevel],
  //temple: [filterByTags], // You can add more
};