import { ClimateTypes, TagTypes, TerrainTypes } from "@/constants/environment.options";

export const TradeNotesByTagMapping: Partial<Record<TagTypes, string[]>> = {
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

export const TradeNotesByTerrainMapping: Partial<Record<TerrainTypes, string[]>> = {
  "Coast": [
    "Imports lumber and stone for shipbuilding",
    "Exports seafood, salt, and shells",
    "Harbors serve as trade gateways to inland markets",
    "Docks bustle with merchants from distant lands",
    "Stormy seas occasionally delay shipments"
  ],
  "Desert": [
    "Exports glass, salt, and rare minerals",
    "Imports water, food, and wood",
    "Caravans must brave long, dry routes",
    "Spices and dyes are rare and highly valued",
    "Trade limited to early morning and dusk due to heat"
  ],
  "Forest": [
    "Exports lumber, herbs, and mushrooms",
    "Traded game meat and pelts are in high demand",
    "Imports tools, metal goods, and grain",
    "Seasonal harvests affect trade volumes",
    "Winding paths delay large caravans"
  ],
  "Jungle": [
    "Exports exotic fruits, rare herbs, and poisons",
    "Imports metal tools and refined goods",
    "Dense vegetation restricts caravan movement",
    "Trade often done via river or aerial drop",
    "Insects and humidity damage stored goods"
  ],
  "Hills": [
    "Exports wool, cheese, and livestock",
    "Imports grains, textiles, and luxury goods",
    "Local herders use trade fairs for seasonal exchange",
    "Roads are passable but slow due to incline",
    "Windmills and hillside forges produce unique goods"
  ],
  "Mountains": [
    "Exports stone, iron, and precious gems",
    "Imports food, alcohol, and tools",
    "Dwarven craftsmanship fetches high prices",
    "Mountain passes can close in winter",
    "Trade protected by heavily armed convoys"
  ],
  "Plains": [
    "Exports grain, livestock, and leather",
    "Imports weapons, tools, and salt",
    "Trade is fast and efficient across open terrain",
    "Seasonal festivals double as trade fairs",
    "Highway robbers are a constant threat to caravans"
  ],
  "River": [
    "Exports fish, pottery, and freshwater pearls",
    "River barges are vital to trade operations",
    "Imports iron, oil, and spices from upstream",
    "Floods occasionally disrupt trade",
    "Bridges and ferries collect tolls from traders"
  ],
  "Swamp": [
    "Exports rare herbs, peat, and alchemical reagents",
    "Imports durable goods and nonperishable foods",
    "Trade routes are difficult and treacherous",
    "Bog smugglers run covert goods through hidden paths",
    "Only flat-bottomed boats can navigate the region"
  ],
  "Tundra": [
    "Exports furs, ice, and whale oil",
    "Imports grains, textiles, and metalwork",
    "Seasonal trade windows due to extreme cold",
    "Sled teams and reindeer caravans are common",
    "Ice roads enable temporary shipping lanes"
  ],
  "Underground": [
    "Exports gems, ores, fungi, and crafted wares",
    "Imports light sources, food, and cloth",
    "Trade conducted through secure tunnels or surface outposts",
    "Trade guilds closely control mining output",
    "Rare metals are bartered with surface dwellers"
  ],
   "Urban": [
    "A central trade hub for nearby regions",
    "Imports raw goods, exports refined products",
    "Markets draw merchants from all over the realm",
    "Taxes and tolls regulate heavy commerce",
    "Trade unions and merchant guilds wield great influence"
  ]
}


export const TradeNotesByClimateMapping: Partial<Record<ClimateTypes, string[]>> = {
  "Polar": [
    "Exports furs, ice blocks, and preserved fish",
    "Imports crops, lumber, and textiles",
    "Trade limited to short summer months",
    "Frozen ports delay incoming shipments",
    "High demand for firewood and heating oils"
  ],
  "Temperate": [
    "Stable trade year-round due to mild weather",
    "Exports grains, livestock, and crafted goods",
    "Imports luxury items and exotic wares",
    "Trade fairs and seasonal markets flourish",
    "Favorable conditions attract caravans from afar"
  ],
  "Tropical": [
    "Exports rare fruits, spices, and exotic woods",
    "Imports stone, metals, and cold-climate goods",
    "Humidity spoils perishable imports quickly",
    "Stormy seasons disrupt port and river trade",
    "Jungle routes are slow but profitable"
  ],
  "Dry": [
    "Exports salt, dyes, and minerals",
    "Imports food, water, and wood",
    "Caravans rely on oases and well-placed waystations",
    "Sandstorms occasionally halt trade routes",
    "Barter systems sometimes preferred over coin"
  ],
  "Continental": [
    "Seasonal extremes affect trade flow",
    "Exports timber, iron, and livestock",
    "Imports fruits, spices, and sea goods",
    "Spring thaws open trade routes after long winters",
    "Autumn markets stockpile for harsh seasons ahead"
  ]
}