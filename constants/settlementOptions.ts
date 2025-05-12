export const LOCATION_CATEGORIES = [ 
    "Taverns & Inns", 
    "Temples & Shrines", 
    "Shopping", 
    "Crafts & Services", 
    "Government", 
    "Entertainment", 
    "Medical & Alchemical", 
    "Magical", 
    "Criminal", 
    "Miscellaneous" 
];

export const SETTLEMENT_TABS = ["Basics", "Leadership & Wealth", "Culture & Society"];

export const SIZE_TYPES = [
    "Encampment",
    "Thorp",
    "Hamlet",
    "Village",
    "Town",
    "City",
    "Metropolis"
];

export const TAG_TYPES = [
    "Arcane Nexus",
    "Border Post",
    "Capital",
    "Criminal Hideout",
    "Fortress",
    "Garrison",
    "Mining Camp",
    "Port",
    "Prison Settlement",
    "Sacred Site",
    "Trade Hub",
];

export const TERRAIN_TYPES = [
    "Coast",
    "Desert",
    "Forest",
    "Mountains",
    "Plains",
    "River",
    "Swamp",
]

export const WEALTH_LEVELS = [
    "Impoverished",
    "Struggling",
    "Modest",
    "Comfortable",
    "Wealthy",
    "Affluent",
    "Opulent",
    "Lavish",
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
    "Autocracy",
    "Clan-based",
    "Council Rule",
    "Democracy",
    "Feudal",
    "Merchant Guild",
    "Military Rule",
    "Monarchy",
    "Oligarchy",
    "Theocracy",
    "Tyranny"
];

export const CRIMINAL_ACTIVITY_TYPES = [
    "None",
    "Petty Theft",
    "Pickpocketing Rings",
    "Smuggling",
    "Illegal Gambling",
    "Black Market",
    "Corruption",
    "Organized Crime",
    "Assassins' Guild",
    "Slavery & Trafficking",
    "Cult Activity",
    "Necromantic Practices",
    "Widespread Lawlessness",
  ];

export type SizeTypes = (typeof SIZE_TYPES)[number]
export type TagTypes = (typeof TAG_TYPES)[number]
export type TerrainTypes = (typeof TERRAIN_TYPES)[number]
export type WealthLevel = (typeof WEALTH_LEVELS)[number]
export type MagicLevel = (typeof MAGIC_LEVELS)[number]
export type ClimateTypes = (typeof CLIMATE_TYPES)[number]
export type RulingType = (typeof RULING_TYPES)[number]
export type CriminalActivityTypes = (typeof CRIMINAL_ACTIVITY_TYPES)[number]