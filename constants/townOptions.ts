export const TOWN_TABS = ["Basics", "Leadership & Wealth", "Culture"];

export const SIZE_TYPES = [
    "Hamlet", 
    "Village", 
    "Town", 
    "City", 
    "Metropolis"
];

export const TERRAIN_TYPES = [
    "Forest", 
    "Desert", 
    "Mountains", 
    "Coast", 
    "Plains", 
    "Swamp"
]

export const WEALTH_LEVELS = [
    "Impoverished",
    "Struggling",
    "Modest",
    "Comfortable",
    "Wealthy",
    "Opulent",
];
  
export const MAGIC_LEVELS = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Mythic",
];
  
export const CLIMATE_TYPES = [
    "Arctic",
    "Temperate",
    "Tropical",
    "Arid",
    "Mediterranean",
    "Continental",
];
  
export const RULING_TYPES = [
    "Democracy",
    "Monarchy",
    "Theocracy",
    "Oligarchy",
    "Anarchy",
    "Council Rule",
    "Military Rule",
    "Merchant Guild",
];

export type SizeTypes = (typeof SIZE_TYPES)[number];
export type TerrainTypes = (typeof TERRAIN_TYPES)[number];
export type WealthLevel = (typeof WEALTH_LEVELS)[number];
export type MagicLevel = (typeof MAGIC_LEVELS)[number];
export type ClimateTypes = (typeof CLIMATE_TYPES)[number];
export type RulingType = (typeof RULING_TYPES)[number];