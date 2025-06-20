import { SiteCondition, SiteSize } from "@/constants/siteOptions";

export const ITEM_COUNT_BY_SIZE_AND_CONDITION: Record<SiteSize, Record<SiteCondition, number>> = {
  tiny: { squalid: 2, poor: 2, average: 3, wealthy: 3, aristocratic: 3 },
  small: { squalid: 2, poor: 3, average: 4, wealthy: 4, aristocratic: 4 },
  modest: { squalid: 3, poor: 4, average: 5, wealthy: 5, aristocratic: 6 },
  large: { squalid: 4, poor: 5, average: 6, wealthy: 7, aristocratic: 8 },
  grand: { squalid: 5, poor: 6, average: 7, wealthy: 8, aristocratic: 10 },
  sprawling: { squalid: 6, poor: 7, average: 8, wealthy: 10, aristocratic: 12 },
};

export const RARITY_BOOST_BY_CONDITION: Record<SiteCondition, number> = {
  squalid: -2,
  poor: -1,
  average: 0,
  wealthy: 1,
  aristocratic: 2,
};

export const QUALITY_BOOST_BY_CONDITION: Record<SiteCondition, number> = {
  squalid: -2,
  poor: -1,
  average: 0,
  wealthy: 1,
  aristocratic: 2,
};