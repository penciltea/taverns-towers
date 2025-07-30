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
  "Arts",
  "Beauty",
  "Chaos",
  "Cold",
  "Commerce",
  "Community",
  "Death",
  "Decay",
  "Dreams",
  "Fate",
  "Fertility",
  "Forge",
  "Freedom",
  "Glory",
  "Grave",
  "Harvest",
  "Hunt",
  "Invention",
  "Judgment",
  "Knowledge",
  "Law",
  "Life",
  "Light",
  "Luck",
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
  "Time",
  "Travel",
  "Trickery",
  "Twilight",
  "Water",
  "War",
  "Other"
];

export type SizeTypes = (typeof SIZE_TYPES)[number]
export type WealthLevel = (typeof WEALTH_LEVELS)[number]
export type MagicLevel = (typeof MAGIC_LEVELS)[number]
export type RulingType = (typeof RULING_TYPES)[number]
export type CriminalActivityTypes = (typeof CRIMINAL_ACTIVITY_TYPES)[number]
export type DomainTypes = (typeof DOMAINS)[number]