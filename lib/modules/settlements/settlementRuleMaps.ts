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

export const CommonRacesByTerrain: Record<TerrainTypes, string[]> = {
  Coast: ["Humans", "Half-Elves", "Halflings", "Sea Elves", "Tritons"],
  Desert: ["Humans", "Genasi", "Dragonborn"],
  Forest: ["Elves", "Firbolgs", "Gnomes"],
  Jungle: ["Tabaxi", "Yuan-ti", "Lizardfolk"],
  Hills: ["Halflings", "Dwarves", "Humans"],
  Mountains: ["Dwarves", "Goliaths", "Dragonborn"],
  Plains: ["Humans", "Halflings", "Half-Orcs"],
  River: ["Humans", "Half-Elves", "Elves", "Tritons"],
  Swamp: ["Humans", "Lizardfolk", "Half-Orcs", "Goblins"],
  Tundra: ["Goliaths", "Snow Elves", "Humans", "Half-Elves"],
  Underground: ["Drow", "Duergar", "Deep Gnomes"],
  Urban: ["Humans", "Half-Elves", "Tieflings", "All Races"],
};

export const TradeNotesByTag: Partial<Record<TagTypes, string[]>> = {
  "Ancient Ruins": [
    "Relics scavenged and sold to collectors",
    "Tourism brings in treasure hunters and scholars",
    "Ruined structures provide valuable stone and artifacts",
  ],
  "Arcane Nexus": [
    "Sells magical components and artifacts",
    "Arcane services are exported",
    "Rare spell scrolls and potions find high demand",
    "Trade in enchanted items is tightly regulated",
    "Imports rare herbs, gems, and ancient relics",
    "Planes-touched traders occasionally appear with strange wares"
  ],
  "Border Post": [
    "Customs tariffs generate income",
    "Trade regulated strictly to prevent contraband",
    "Caravans rest and restock before crossing",
  ],
  "Capital": [
    "Imports luxury goods",
    "Export taxes enrich the treasury",
    "Centralized control over regional trade laws",
    "Dignitaries manage trade negotiations with other realms",
    "Foreign embassies exchange cultural and trade secrets",
    "Goldsmiths and moneychangers flourish under strict oversight"
  ],
  "Criminal Hideout": [
    "Black market goods are moved quietly",
    "Illegal trade in stolen items and poisons",
    "Hidden routes used by smugglers and fences",
  ],
  "Druidic": [
    "Trades in herbs, potions, and natural remedies",
    "Exports woodcraft and enchanted flora",
    "Barters more than using coin",
  ],
  "Fishing": [
    "Exports dried fish and oil",
    "Seafood delicacies are a luxury export",
    "Smoked eels and salt cod are staple goods",
    "Trade in pearls and coral supplements the economy",
    "Boats come and go at all hours, bringing fresh catch",
    "Shipments of fishmeal are exported inland for livestock"
  ],
  "Fortress": [
    "Supplies arms and armor",
    "Imports most food and luxury goods",
    "Weapon crafting is a major export industry",
    "Trade caravans often include smithing supplies",
    "Receives funding in exchange for defense pacts",
    "Militant trade unions handle arms logistics and taxes"
  ],
  "Garrison": [
    "Military contracts boost smithing and fletching trades",
    "Bulk imports of food and drink for troops",
    "Excess weapons sold to traveling merchants",
  ],
  "Hidden": [
    "Trade limited to trusted contacts",
    "Secret markets offer exotic or forbidden goods",
    "Self-reliant but occasionally trades rare wares",
  ],
  "Infested": [
    "Trade nearly halted due to danger",
    "Only desperate merchants brave the risks",
    "Illicit trade thrives despite official bans",
  ],
  "Isolated": [
    "Self-sufficient, but occasionally imports tools",
    "Rare exports valued for their uniqueness",
    "Traders come seeking novelty goods",
  ],
  "Mining Camp": [
    "Exports raw ore and refined metals",
    "Rare gems sold in secretive auctions",
    "Black powder and blasting tools are common imports",
    "Trade caravans are often guarded against bandits",
    "Raw stone is shipped to nearby masons and cities",
    "Smelting byproducts occasionally spark alchemical interest"
  ],
  "Nomadic": [
    "Trade with passing caravans",
    "Relies on bartering over coin",
    "Goods are transported on beasts of burden",
    "Highly prized for rare herbs and handmade crafts",
    "Trade depends on seasonal migration routes",
    "Portable trade stalls appear when the camp settles"
  ],
  "Overgrown": [
    "Rare herbs and fungi are traded with outsiders",
    "Few exports, mostly self-sustaining",
    "Unusual fauna and flora attract specialist traders",
  ],
  "Port": [
    "Shipbuilding and trade dominate economy",
    "Smuggling is a hidden industry",
    "Trade tariffs fund an influential dockmaster's guild",
    "Imports of spices, textiles, and luxury goods are common",
    "Warehouses bustle with sailors and foreign traders",
    "Known for black-market trading under the pier district"
  ],
  "Prison Settlement": [
    "Trades with nearby posts for supplies",
    "Exports prisoner labor products",
    "Imports are strictly monitored and limited",
  ],
  "Remote": [
    "Rarely trades, but exports unique natural resources",
    "Traders are rare and carefully vetted",
    "Bartering is more common than formal trade",
  ],
  "Sacred Site": [
    "Pilgrims bring offerings and income",
    "Sells religious trinkets and blessings",
    "Imports rare incense and ceremonial materials",
  ],
  "Trade Hub": [
    "A center of regional trade routes",
    "Market festivals draw in caravans weekly",
    "Trade guilds regulate most commercial activity",
    "Merchants from distant lands maintain permanent stalls",
    "Warehouses and counting houses line the streets",
    "Known for competitive pricing and exotic goods"
  ],
  "Military Outpost": [
    "Imports arms, armor, and rations",
    "Excess gear sold when troops rotate out",
    "Traders sell to soldiers and mercenaries",
  ],
};
