import { SizeTypes, WealthLevel } from "@/constants/settlementOptions";
import { SiteCondition, SiteSize } from "@/constants/site/site.options";

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

export const SETTLEMENT_SIZE_MULTIPLIERS: Record<SizeTypes, number> = {
  Encampment: 0.5,
  Thorp: 0.6,
  Hamlet: 0.7,
  Village: 0.85,
  Town: 1,
  City: 1.3,
  Metropolis: 1.6,
};

export const SETTLEMENT_WEALTH_BONUSES: Record<WealthLevel, number> = {
  Impoverished: 0,
  Struggling: 1,
  Modest: 2,
  Wealthy: 3,
  Affluent: 4,
};

export const SITE_SIZE_BASE: Record<SiteSize, number> = {
  tiny: 1,
  small: 2,
  modest: 3,
  large: 4,
  grand: 5,
  sprawling: 6,
};

export const SITE_CONDITION_PENALTIES: Record<SiteCondition, number> = {
  squalid: -2,
  poor: -1,
  average: 0,
  wealthy: 1,
  aristocratic: 2,
};
