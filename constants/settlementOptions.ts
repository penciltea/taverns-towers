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
    "Ancient Ruins",
    "Arcane Nexus",
    "Border Post",
    "Capital",
    "Criminal Hideout",
    "Druidic",
    "Fishing",
    "Fortress",
    "Garrison",
    "Hidden",
    "Infested",
    "Isolated",
    "Mining Camp",
    "Nomadic",
    "Overgrown",
    "Port",
    "Prison Settlement",
    "Remote",
    "Sacred Site",
    "Trade Hub",
    "Military Outpost",
];

export const TERRAIN_TYPES = [
    "Coast",
    "Desert",
    "Forest",
    "Jungle",
    "Hills",
    "Mountains",
    "Plains",
    "River",
    "Swamp",
    "Tundra",
    "Underground",
    "Urban"
];

export const WEALTH_LEVELS = [
    "Impoverished",
    "Struggling",
    "Modest",
    "Wealthy",
    "Affluent",
];
  
export const MAGIC_LEVELS = [
    "None",
    "Low",
    "Moderate",
    "High",
    "Mythic",
];
  
export const CLIMATE_TYPES = [
    "Polar",
    "Temperate",
    "Tropical",
    "Dry",
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
    "Tyranny", 
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
    "Widespread Lawlessness",
  ];

export const DOMAINS = [
  "Arcana",
  "Arts",
  "Beauty",
  "Chaos",
  "Commerce",
  "Community",
  "Death",
  "Decay",
  "Dreams",
  "Fate",
  "Forge",
  "Freedom",
  "Grave",
  "Harvest",
  "Hunt",
  "Invention",
  "Judgment",
  "Knowledge",
  "Life",
  "Light",
  "Magic",
  "Moon",
  "Nature",
  "Order",
  "Peace",
  "Protection",
  "Sea",
  "Secrets",
  "Shadow",
  "Storms",
  "Sun",
  "Tempest",
  "Time",
  "Travel",
  "Trickery",
  "Twilight",
  "War",
  "Other"
];

export type SizeTypes = (typeof SIZE_TYPES)[number]
export type TagTypes = (typeof TAG_TYPES)[number]
export type TerrainTypes = (typeof TERRAIN_TYPES)[number]
export type WealthLevel = (typeof WEALTH_LEVELS)[number]
export type MagicLevel = (typeof MAGIC_LEVELS)[number]
export type ClimateTypes = (typeof CLIMATE_TYPES)[number]
export type RulingType = (typeof RULING_TYPES)[number]
export type CriminalActivityTypes = (typeof CRIMINAL_ACTIVITY_TYPES)[number]
export type DomainTypes = (typeof DOMAINS)[number]