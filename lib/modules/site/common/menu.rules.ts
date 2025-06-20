import { SiteGenerationContext } from "@/interfaces/site.interface";
import { GeneratorSiteMenuPlain } from "@/lib/models/generator/site/menu.model";
import { tavernMenuRules } from "../tavern/menu.rules";

export type MenuRuleFn = (
  items: GeneratorSiteMenuPlain[],
  context: SiteGenerationContext
) => GeneratorSiteMenuPlain[];

export const filterByClimate: MenuRuleFn = (items, context) => {
    console.log("Context: ", context);
    console.log("Items: " , items);
  if (!context.climate) return items;
  return items.filter(
    item => !item.climate?.length || item.climate.includes(context.climate!)
  );
};

export const filterByTerrain: MenuRuleFn = (items, context) => {
  if (!context.terrain?.length) return items;
  return items.filter(
    item =>
      !item.terrain?.length ||
      item.terrain.some(t => context.terrain!.includes(t))
  );
};

export const filterByMagicLevel: MenuRuleFn = (items, context) => {
  if (!context.magic) return items;
  return items.filter(
    item => !item.magic || item.magic <= context.magic!
  );
};

const commonMenuRules: MenuRuleFn[] = [
  filterByClimate,
  filterByTerrain,
  filterByMagicLevel
  // Add more tavern-specific rules here
];

export function withCommonRules(rules: MenuRuleFn[]): MenuRuleFn[] {
  return [...commonMenuRules, ...rules];
}

export const menuRulesBySiteType: Record<string, MenuRuleFn[]> = {
  tavern: [...commonMenuRules, ...tavernMenuRules],
  //shop: [filterByClimate, filterByMagicLevel],
  //temple: [filterByTags],
};