import { SiteCondition, SiteSize } from "@/constants/siteOptions";

// Base nightly cost in copper pieces
export const roomBaseCost: Record<SiteCondition, number> = {
  squalid: 7,         // 7 cp
  poor: 10,           // 1 sp
  average: 50,         // 5 sp
  wealthy: 200,       // 2 gp
  aristocratic: 400,  // 4 gp
};

// Modifier based on SITE_SIZE (larger = cheaper per room)
export const roomSizeModifier: Record<SiteSize, number> = {
  tiny: 0.25,        // +25%
  small: 0.10,       // +10%
  modest: 0,         // No change
  spacious: -0.10,   // -10%
  large: -0.20,      // -20%
  grand: -0.25,      // -25%
  sprawling: -0.30   // -30%
};

// Modifier based on SITE_CONDITION
export const roomConditionModifier: Record<SiteCondition, number> = {
  squalid: -0.25,
  poor: -0.10,
  average: 0,
  wealthy: 0.25,
  aristocratic: 0.50,
};