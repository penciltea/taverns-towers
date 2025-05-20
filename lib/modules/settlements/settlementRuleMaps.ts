import { 
    SizeTypes,
    TagTypes,
    TerrainTypes,
    WealthLevel,
    MagicLevel,
    ClimateTypes,
    RulingType,
    CriminalActivityTypes,
    MAGIC_LEVELS,
    WEALTH_LEVELS
 } from "@/constants/settlementOptions";

export const TerrainBlacklistByClimate: Record<ClimateTypes, TerrainTypes[]> = {
  Polar: ["Jungle", "Desert"],
  Temperate: [],
  Tropical: ["Tundra"],
  Dry: ["Swamp", "Tundra", "Jungle"],
  Continental: [],
};

export const TagsByTerrain: Record<TerrainTypes, TagTypes[]> = {
  Coast: ["Port", "Fishing"],
  Desert: ["Nomadic", "Ancient Ruins"],
  Forest: ["Druidic", "Overgrown", "Hidden"],
  Jungle: ["Overgrown", "Infested"],
  Mountains: ["Mining Camp", "Remote"],
  Plains: ["Agricultural", "Trade Hub"],
  Swamp: ["Overgrown"],
  Tundra: ["Isolated"]
};


export const CrimesByWealth: Record<WealthLevel, CriminalActivityTypes[]> = {
  Impoverished: ["Petty Theft", "Pickpocketing Rings", "Widespread Lawlessness"],
  Struggling: ["Pickpocketing Rings", "Smuggling", "Illegal Gambling", "Corruption", "Slavery & Trafficking"],
  Modest: ["Petty Theft", "Pickpocketing Rings", "Smuggling", "Black Market"],
  Wealthy: ["Black Market", "Corruption", "Organized Crime", "Assassins' Guild", "Slavery & Trafficking"],
  Affluent: ["Illegal Gambling", "Black Market", "Corruption", "Organized Crime", "Assassins' Guild"],
};

export const MagicBySize: Record<SizeTypes, MagicLevel[]> = {
  Encampment: MAGIC_LEVELS.slice(0, 2),     // "None", "Low"
  Thorp: MAGIC_LEVELS.slice(0, 2),          // "None", "Low"
  Hamlet: MAGIC_LEVELS.slice(0, 3),         // "None", "Low", "Moderate"
  Village: MAGIC_LEVELS.slice(1, 3),        // "Low", "Moderate"
  Town: MAGIC_LEVELS.slice(2, 4),           // "Moderate", "High"
  City: MAGIC_LEVELS.slice(2, 4),           // "Moderate", "High"
  Metropolis: MAGIC_LEVELS.slice(3, 5),     // "High", "Mythic"
};

export const WealthBySize: Record<SizeTypes, WealthLevel[]> = {
  Encampment: WEALTH_LEVELS.slice(0, 3),
  Thorp: WEALTH_LEVELS.slice(0, 3),
  Hamlet: WEALTH_LEVELS.slice(1, 5),
  Village: WEALTH_LEVELS.slice(1, 5),
  Town: WEALTH_LEVELS.slice(2, 6),
  City: WEALTH_LEVELS,
  Metropolis: WEALTH_LEVELS,
};

export const MagicByWealth: Record<string, string[]> = {
  Impoverished: ["None"],
  Struggling: ["None", "Low"],
  Modest: ["Low", "Moderate"],
  Wealthy: ["Moderate", "High", "Mythic"],
  Affluent: ["High", "Mythic"],
};

//setting mapping up for ruling style by settlement size
// weighting currently set by repeating options
export const RulingBySize: Record<SizeTypes, string[]> = {
  Encampment: ["Clan-based", "Clan-based", "Autocracy", "Military Rule", "Tyranny"],
  Thorp: ["Clan-based", "Autocracy", "Theocracy", "Council Rule"],
  Hamlet: ["Council Rule", "Clan-based", "Theocracy", "Autocracy"],
  Village: ["Council Rule", "Feudal", "Merchant Guild", "Theocracy", "Democracy"],
  Town: ["Feudal", "Merchant Guild", "Democracy", "Oligarchy", "Council Rule"],
  City: ["Oligarchy", "Monarchy", "Feudal", "Merchant Guild", "Democracy", "Military Rule"],
  Metropolis: ["Monarchy", "Oligarchy", "Theocracy", "Democracy", "Merchant Guild", "Military Rule"],
};