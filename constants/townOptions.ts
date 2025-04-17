export const LOCATION_CATEGORIES = [ "Taverns & Inns", "Temples & Shrines", "Shopping", "Crafts & Services", "Government", "Entertainment", "Medical & Alchemical", "Magical", "Criminal", "Miscellaneous" ];

export const TOWN_TABS = ["Basics", "Leadership & Wealth", "Culture & Society"];

export const SIZE_TYPES = [
    { value: "Hamlet", label: "Hamlet"},
    { value: "Village", label: "Village"},
    { value: "Town", label: "Town"},
    { value: "City", label: "City"}
];

export const TAG_TYPES = [
    { value: "Arcane Nexus", label: "Arcane Nexus" },
    { value: "Border Post", label: "Border Post" },
    { value: "Capital", label: "Capital" },
    { value: "Criminal Hideout", label: "Criminal Hideout" },
    { value: "Fortress", label: "Fortress" },
    { value: "Garrison", label: "Garrison" },
    { value: "Mining Camp", label: "Mining Camp" },
    { value: "Port", label: "Port" },
    { value: "Prison Settlement", label: "Prison Settlement" },
    { value: "Sacred Site", label: "Sacred Site" },
    { value: "Trade Hub", label: "Trade Hub" },
];

export const TERRAIN_TYPES = [
    { value: "Forest", label: "Forest" },
    { value: "Desert", label: "Desert" },
    { value: "Mountains", label: "Mountains" },
    { value: "Coast", label: "Coast" },
    { value: "Plains", label: "Plains" },
    { value: "River", label: "River" },
    { value: "Swamp", label: "Swamp" },
]

export const WEALTH_LEVELS = [
    { value: "Impoverished", label: "Impoverished" },
    { value: "Struggling", label: "Struggling" },
    { value: "Modest", label: "Modest" },
    { value: "Comfortable", label: "Comfortable" },
    { value: "Wealthy", label: "Wealthy" },
    { value: "Affluent", label: "Affluent" },
    { value: "Opulent", label: "Opulent" },
    { value: "Lavish", label: "Lavish" },
];
  
export const MAGIC_LEVELS = [
    { value: "None", label: "None" },
    { value: "Low", label: "Low" },
    { value: "Moderate", label: "Moderate" },
    { value: "High", label: "High" },
    { value: "Mythic", label: "Mythic" },
];
  
export const CLIMATE_TYPES = [
    { value: "Arctic", label: "Arctic" },
    { value: "Temperate", label: "Temperate" },
    { value: "Tropical", label: "Tropical" },
    { value: "Arid", label: "Arid" },
    { value: "Mediterranean", label: "Mediterranean" },
    { value: "Continental", label: "Continental" },
];
  
export const RULING_TYPES = [
    { value: "Monarchy", label: "Monarchy" },
    { value: "Oligarchy", label: "Oligarchy" },
    { value: "Council Rule", label: "Council Rule" },
    { value: "Democracy", label: "Democracy" },
    { value: "Theocracy", label: "Theocracy" },
    { value: "Military Rule", label: "Military Rule" },
    { value: "Merchant Guild", label: "Merchant Guild" },
    { value: "Autocracy", label: "Autocracy" },
    { value: "Feudal", label: "Feudal" },
    { value: "Clan-based", label: "Clan-based" },
    { value: "Tyranny", label: "Tyranny" },
];

export const CRIMINAL_ACTIVITY_TYPES = [
    { value: "None", label: "None" },
    { value: "Petty Theft", label: "Petty Theft" },
    { value: "Pickpocketing Rings", label: "Pickpocketing Rings" },
    { value: "Smuggling", label: "Smuggling" },
    { value: "Illegal Gambling", label: "Illegal Gambling" },
    { value: "Black Market", label: "Black Market" },
    { value: "Corruption", label: "Corruption" },
    { value: "Organized Crime", label: "Organized Crime" },
    { value: "Assassins' Guild", label: "Assassins' Guild" },
    { value: "Slavery & Trafficking", label: "Slavery & Trafficking" },
    { value: "Cult Activity", label: "Cult Activity" },
    { value: "Necromantic Practices", label: "Necromantic Practices" },
    { value: "Widespread Lawlessness", label: "Widespread Lawlessness" },
  ];

export type SizeTypes = (typeof SIZE_TYPES)[number]["value"];
export type TagTypes = (typeof TAG_TYPES)[number]["value"];
export type TerrainTypes = (typeof TERRAIN_TYPES)[number]["value"];
export type WealthLevel = (typeof WEALTH_LEVELS)[number]["value"];
export type MagicLevel = (typeof MAGIC_LEVELS)[number]["value"];
export type ClimateTypes = (typeof CLIMATE_TYPES)[number]["value"];
export type RulingType = (typeof RULING_TYPES)[number]["value"];
export type CriminalActivityTypes = (typeof CRIMINAL_ACTIVITY_TYPES)[number]["value"];