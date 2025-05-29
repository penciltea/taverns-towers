import { SizeTypes, MagicLevel, MAGIC_LEVELS } from "@/constants/settlementOptions";

export const MagicBySize: Record<SizeTypes, MagicLevel[]> = {
  Encampment: MAGIC_LEVELS.slice(0, 2),     // "None", "Low"
  Thorp: MAGIC_LEVELS.slice(0, 2),          // "None", "Low"
  Hamlet: MAGIC_LEVELS.slice(0, 3),         // "None", "Low", "Moderate"
  Village: MAGIC_LEVELS.slice(1, 3),        // "Low", "Moderate"
  Town: MAGIC_LEVELS.slice(2, 4),           // "Moderate", "High"
  City: MAGIC_LEVELS.slice(2, 4),           // "Moderate", "High"
  Metropolis: MAGIC_LEVELS.slice(3, 5),     // "High", "Mythic"
};

export const MagicByWealthMapping: Record<string, string[]> = {
  Impoverished: ["None"],
  Struggling: ["None", "Low"],
  Modest: ["Low", "Moderate"],
  Wealthy: ["Moderate", "High", "Mythic"],
  Affluent: ["High", "Mythic"],
};