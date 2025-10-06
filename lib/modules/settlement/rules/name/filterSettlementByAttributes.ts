import { GenerateSettlementNameOptions } from "@/interfaces/settlement.interface";
import { GeneratorSettlementFragmentPlain } from "@/lib/models/generator/settlement/settlementNameFragment.model";

export function filterSettlementByAttributes(
  fragments: GeneratorSettlementFragmentPlain[],
  filters: GenerateSettlementNameOptions
): GeneratorSettlementFragmentPlain[] {
  const { tags = [], terrain = [], climate, magic, size, wealth } = filters;

  return fragments.filter(f => {
    // Tag filter
    if (f.tags?.length && tags.length > 0) {
      const normalizedTags = tags.map(t => t.toLowerCase());
      const normalizedFragmentTags = f.tags.map(tag => tag.toLowerCase());
      if (!normalizedFragmentTags.some(tag => normalizedTags.includes(tag))) return false;
    }

    // Terrain filter
    if (f.terrain?.length && terrain.length > 0) {
      const normalizedTerrain = terrain.map(t => t.toLowerCase());
      const normalizedFragmentTerrain = f.terrain.map(t => t.toLowerCase());
      if (!normalizedFragmentTerrain.some(t => normalizedTerrain.includes(t))) return false;
    }

    // Climate filter
    if (f.climate?.length && climate) {
      const normalizedClimate = climate.toLowerCase();
      const normalizedFragmentClimate = f.climate.map(c => c.toLowerCase());
      if (!normalizedFragmentClimate.includes(normalizedClimate)) return false;
    }

    // Magic filter
    if (f.magic?.length && magic) {
      const normalizedMagic = magic.toLowerCase();
      const normalizedFragmentMagic = f.magic.map(m => m.toLowerCase());
      if (!normalizedFragmentMagic.includes(normalizedMagic)) return false;
    }

    // Size filter
    if (f.size?.length && size) {
      const normalizedSize = size.toLowerCase();
      const normalizedFragmentSizes = f.size.map(s => s.toLowerCase());
      if (!normalizedFragmentSizes.includes(normalizedSize)) return false;
    }

    // Wealth filter
    if (f.wealth?.length && wealth) {
      const normalizedWealth = wealth.toLowerCase();
      const normalizedFragmentWealth = f.wealth.map(w => w.toLowerCase());
      if (!normalizedFragmentWealth.includes(normalizedWealth)) return false;
    }

    return true;
  });
}