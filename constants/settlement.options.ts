export const SETTLEMENT_TABS = ["Basics", "Law & Economics", "Culture & Society", "NPC Connections", "Configuration"];

export const SIZE_TYPES = [
    "City",
    "Encampment",
    "Hamlet",
    "Metropolis",
    "Town",
    "Village"
];

export const WEALTH_LEVELS = [
    "Affluent",
    "Impoverished",
    "Modest",
    "Struggling",
    "Wealthy",
];
  
export const MAGIC_LEVELS = [
    "None",
    "High",
    "Low",
    "Moderate",
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
    "Assassins' Guild",
    "Corruption",
    "Cult Activity",
    "Black Market",
    "Illegal Gambling",
    "Organized Crime",
    "Petty Theft",
    "Pickpocketing Rings",
    "Slavery & Trafficking",
    "Smuggling",
    "Widespread Lawlessness"
];

export const MILITARY_PRESENCE_TYPES = [
    "None",
    "Border Patrol",
    "Garrisoned Soldiers",
    "Knightly Order",
    "Local Militia",
    "Magical Defenders",
    "Mercenary Company",
    "Military Outpost",
    "Mounted Forces",
    "Royal Troops",
    "Town Guard",
];

export const THEME = [
  {
    label: "Apprentice-tier Options",
    options: [
      { label: "Dark Elven-Inspired", value: "Dark Elven-Inspired"},
      { label: "Dwarven-Inspired", value: "Dwarven-Inspired" },
      { label: "Elven-Inspired", value: "Elven-Inspired" },
      { label: "Medieval Fantasy", value: "Medieval Fantasy"},
    ]
  }
];

export const ARTISAN_THEMES = [
  {
    label: "Premim-tier Exclusives",
    options: [
      { label: "Arabic-Inpired", value: "Arabic-Inspired" }
    ]
  }
];

export type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;

export type SizeTypes = (typeof SIZE_TYPES)[number]
export type WealthLevel = (typeof WEALTH_LEVELS)[number]
export type MagicLevel = (typeof MAGIC_LEVELS)[number]
export type RulingType = (typeof RULING_TYPES)[number]
export type CriminalActivityTypes = (typeof CRIMINAL_ACTIVITY_TYPES)[number]
export type MilitaryPresenceTypes = (typeof MILITARY_PRESENCE_TYPES)[number]
