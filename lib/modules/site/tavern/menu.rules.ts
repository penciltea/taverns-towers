import { MenuRuleFn } from "../common/menu.rules";

export const filterByClimate: MenuRuleFn = (items, context) => {
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