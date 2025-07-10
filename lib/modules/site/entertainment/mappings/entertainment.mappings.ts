import { SiteCondition, SiteEntertainmentType, SiteSize } from "@/constants/siteOptions";

export const entryBaseCost: Record<SiteEntertainmentType, number> = {
  "Arena / Coliseum": 50,            // 5 sp - large public events, moderate pricing
  "Bardic College": 100,             // 1 gp - prestigious, educational performances
  "Bathhouse": 30,                   // 3 sp - accessible but with privacy/luxury
  "Brothel": 50,                     // 5 sp - varies widely, average base
  "Circus Tent": 20,                 // 2 sp - traveling or informal, family-friendly
  "Duelling Ring": 15,              // 1.5 sp - rougher crowd, lower cost
  "Festival Grounds": 10,           // 1 sp - often free, but for special events
  "Gambling Den": 25,               // 2.5 sp - low entry, high loss potential
  "Magical Spectacle Venue": 150,   // 1.5 gp - arcane luxuries, high maintenance
  "Music Hall": 80,                 // 8 sp - more upscale than a tavern band
  "Racing Track": 40,               // 4 sp - decent crowd draw, betting incentives
  "Street Performance Zone": 0,     // Free - tipping encouraged
  "Theater": 100,                   // 1 gp - professional productions
  "Underground Fight Pit": 10,      // 1 sp - cheap entry, secretive
  "Other": 30                       // 3 sp - general fallback
};

// Modifier based on SITE_SIZE (larger = cheaper per room)
export const entrySizeModifier: Record<SiteSize, number> = {
  tiny: 0.25,        // +25%
  small: 0.10,       // +10%
  modest: 0,         // No change
  spacious: -0.10,   // -10%
  large: -0.20,      // -20%
  grand: -0.25,      // -25%
  sprawling: -0.30   // -30%
};

// Modifier based on SITE_CONDITION
export const entryConditionModifier: Record<SiteCondition, number> = {
  squalid: -0.25,
  poor: -0.10,
  average: 0,
  wealthy: 0.25,
  aristocratic: 0.50,
};