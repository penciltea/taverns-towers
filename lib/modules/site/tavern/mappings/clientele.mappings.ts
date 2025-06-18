import { TagTypes } from "@/constants/environmentOptions";
import { CriminalActivityTypes, MagicLevel, SizeTypes, WealthLevel } from "@/constants/settlementOptions";
import { SiteCondition, SiteSize } from "@/constants/siteOptions";

export const CLIENTELE_ALIASES: Record<string, string> = {
  // Travelers
  "foreign travelers": "travelers",
  "wandering travelers": "travelers",
  "travelers seeking cheap lodging": "travelers",
  "travelers with nothing to hide": "travelers",
  "families passing through": "travelers",
  "curious adventurers": "travelers",
  "pilgrims and wanderers alike": "travelers",

  // Merchants
  "traveling merchants": "merchants",
  "merchant elites": "merchants",
  "ore traders": "merchants",
  "bargain hunters": "merchants",
  "traders": "merchants",
  "quiet traders": "merchants",
  "well-dressed merchants": "merchants",
  "shady boatmen": "merchants",
  "smugglers": "merchants",
  "old-fashioned traders": "merchants",
  "wary merchants": "merchants",
  "dealers in 'rare goods'": "merchants",
  "unsavory traders": "merchants",

  // Mages / Magic folk
  "wandering mages": "mages",
  "hedge witches": "mages",
  "magical experimenters": "mages",
  "magical researchers": "mages",
  "mages": "mages",
  "folk healers": "mages",
  "alchemists": "mages",
  "wizards": "mages",
  "magical patrons": "mages",
  "enchanted item traders": "mages",
  "planar travelers": "mages",
  "arcane constructs": "mages",
  "reality-warped patrons": "mages",

  // Commoners / Locals
  "locals": "commoners",
  "superstitious locals": "commoners",
  "skeptical townsfolk": "commoners",
  "secretive locals": "commoners",
  "drunken locals": "commoners",
  "hardworking commoners": "commoners",
  "commoners from all walks": "commoners",
  "honest locals": "commoners",
  "locals with a past": "commoners",
  "locals and friendly faces": "commoners",
  "typical townsfolk": "commoners",

  // Guards / Military
  "soldiers": "guards",
  "military officers": "guards",
  "guards": "guards",
  "off-duty officers": "guards",
  "off-duty guards": "guards",
  "caravan guards": "guards",
  "off-duty officials": "guards",
  "guards-for-hire with cold eyes": "guards",
  "recruits": "guards",
  "commanders": "guards",

  // Nobles / Elites
  "high nobility": "nobles",
  "wealthy elites": "nobles",
  "nobles": "nobles",
  "nobles and dignitaries": "nobles",
  "minor nobles": "nobles",
  "nobles in disguise": "nobles",
  "elites conducting quiet business": "nobles",
  "high society patrons": "nobles",
  "ambassadors": "nobles",
  "wealthy dignitaries": "nobles",

  // Criminals / Outcasts
  "black market dealers": "criminals",
  "thieves": "criminals",
  "spies": "criminals",
  "fugitives": "criminals",
  "parolees": "criminals",
  "ex-convicts": "criminals",
  "slavers passing through": "criminals",
  "dealers with too many pockets": "criminals",
  "greasy officials": "criminals",
  "buyers seeking forbidden goods": "criminals",
  "watchful lookouts": "criminals",
  "off-duty pickpockets": "criminals",
  "locals with 'connections'": "criminals",
  "tavern regulars with muscle": "criminals",
  "well-dressed 'businessfolk'": "criminals",
  "hired blades": "criminals",
  "hooded loners": "criminals",
  "silent patrons in corners": "criminals",
  "locals carrying weapons at all times": "criminals",
  "drunk zealots": "criminals",
  "devotees with strange symbols": "criminals",
  "whispering patrons": "criminals",
  "shifty-eyed drunks": "criminals",

  // Laborers / Manual workers
  "farmhands": "laborers",
  "stonecutters": "laborers",
  "dockhands": "laborers",
  "camp followers": "laborers",
  "seasonal workers": "laborers",
  "laborers": "laborers",
  "tired travelers": "laborers",
  "day laborers": "laborers",
  "rowdy regulars": "laborers",
  "no-nonsense regulars": "laborers",
  "neighborhood artisans": "laborers",

  // Performers
  "entertainers": "performers",
  "street performers": "performers",
  "wandering entertainers": "performers",
  "entertainers and their fans": "performers",

  // Druids / Nature folk
  "forest folk": "druids",
  "herbalists": "druids",
  "rangers": "druids",
  "druids": "druids",
  "botanists": "druids",

  // Religious
  "temple acolytes": "clergy",
  "clerics": "clergy",
  "divine scholars": "clergy",
  "pilgrims": "clergy",

  // Scholars
  "historians": "scholars",
  "scholars": "scholars",
  "arcane scholars": "scholars",
  "scholars with coin to spend": "scholars",

  // Guild
  "guild members": "guild",
  "guild elites": "guild",
  "guild masters": "guild",
  "low-ranking guild members": "guild",
  "traveling guild members": "guild",

  // Adventurers
  "adventurers": "adventurers",
  "retired adventurers": "adventurers",
  "well-funded adventuring parties": "adventurers",
  "adventurers passing through": "adventurers",

  // Misc
  "scouts": "rangers",
  "loners": "hermits",
  "hermits": "hermits",
  "caravaners": "travelers",
  "bards": "performers",
  "messengers": "travelers",
  "survivors": "commoners",
  "explorers": "adventurers"
};


export const CLIENTELE_COUNT_BY_SETTLEMENT_SIZE: Record<SizeTypes, number> = {
  Encampment: 2,
  Thorp: 2,
  Hamlet: 3,
  Village: 4,
  Town: 5,
  City: 6,
  Metropolitan: 8
};


export const BaseClienteleBySettlementSizeMapping: Record<SizeTypes, string[]> = {
  Encampment: [
    "nomads",
    "hunters",
    "traveling merchants",
    "scouts",
    "camp followers"
  ],
  Thorp: [
    "villagers",
    "farmers",
    "laborers",
    "seasonal workers"
  ],
  Hamlet: [
    "locals",
    "farmhands",
    "caravan guards",
    "wandering travelers"
  ],
  Village: [
    "locals",
    "travelers",
    "farmers",
    "craftspeople",
    "traders"
  ],
  Town: [
    "locals",
    "adventurers",
    "merchants",
    "guild members",
    "caravaners"
  ],
  City: [
    "locals",
    "sailors",
    "mercenaries",
    "scholars",
    "clergy",
    "entertainers",
    "nobles",
    "criminals"
  ],
  Metropolitan: [
    "nobles",
    "mages",
    "criminals",
    "foreign dignitaries",
    "guild elites",
    "street performers",
    "mercenaries",
    "commoners from all walks"
  ]
};

export const ClienteleByTagMapping: Record<TagTypes, string[]> = 
{
  "Ancient Ruins": ["treasure hunters", "historians", "archaeologists"],
  "Arcane Nexus": ["mages", "arcane scholars", "magical experimenters"],
  "Border Post": ["border patrols", "messengers", "foreign travelers"],
  "Capital": ["politicians", "wealthy elites", "ambassadors"],
  "Criminal Hideout": ["thieves", "spies", "black market dealers"],
  "Druidic": ["druids", "herbalists", "forest folk"],
  "Fishing": ["fisherfolk", "dockhands", "fishmongers"],
  "Fortress": ["soldiers", "military officers", "weapon merchants"],
  "Garrison": ["guards", "soldiers", "off-duty officers"],
  "Hidden": ["outcasts", "fugitives", "secretive locals"],
  "Infested": ["monster hunters", "survivors", "paranoid travelers"],
  "Isolated": ["loners", "hermits", "self-reliant settlers"],
  "Mining Camp": ["miners", "stonecutters", "ore traders"],
  "Nomadic": ["travelers", "bards", "wandering craftspeople"],
  "Overgrown": ["scavengers", "rangers", "botanists"],
  "Port": ["sailors", "merchants", "smugglers"],
  "Prison Settlement": ["guards", "parolees", "ex-convicts"],
  "Remote": ["curious adventurers", "explorers", "lone traders"],
  "Sacred Site": ["pilgrims", "clerics", "divine scholars"],
  "Trade Hub": ["merchants", "caravan leaders", "bargain hunters"],
  "Military Outpost": ["recruits", "veterans", "commanders"]
};

export const ClienteleByMagicMapping: Record<MagicLevel, string[]> = 
{
  "None": ["superstitious locals", "magic-averse folk", "old-fashioned traders"],
  "Low": ["hedge witches", "folk healers", "skeptical townsfolk"],
  "Moderate": ["wandering mages", "apprentices", "alchemists"],
  "High": ["wizards", "magical researchers", "enchanted item traders"],
  "Mythic": ["planar travelers", "arcane constructs", "reality-warped patrons"]
}

export const ClienteleByWealthMapping: Record<WealthLevel, string[]> = {
  Impoverished: [
    "beggars",
    "day laborers",
    "thieves looking for easy marks",
    "drunken locals",
    "out-of-work artisans"
  ],
  Struggling: [
    "frugal tradespeople",
    "down-on-their-luck adventurers",
    "skeptical locals",
    "off-duty guards",
    "wary merchants"
  ],
  Modest: [
    "hardworking commoners",
    "traveling merchants",
    "village elders",
    "wandering entertainers",
    "temple acolytes"
  ],
  Wealthy: [
    "minor nobles",
    "well-dressed merchants",
    "off-duty officials",
    "scholars with coin to spend",
    "retired adventurers"
  ],
  Affluent: [
    "nobles and dignitaries",
    "magical patrons",
    "guild masters",
    "wealthy thrill-seekers",
    "exotic travelers"
  ]
};

export const ClienteleByCrimeMapping: Record<CriminalActivityTypes, string[]> = {
  "None": [
    "honest locals",
    "travelers with nothing to hide",
    "families passing through"
  ],
  "Petty Theft": [
    "light-fingered teens",
    "shifty-eyed drunks",
    "locals with a past"
  ],
  "Pickpocketing Rings": [
    "quick-handed rogues",
    "watchful lookouts",
    "off-duty pickpockets"
  ],
  "Smuggling": [
    "quiet traders",
    "shady boatmen",
    "dealers in 'rare goods'"
  ],
  "Illegal Gambling": [
    "professional gamblers",
    "dice sharks",
    "card cheats"
  ],
  "Black Market": [
    "buyers seeking forbidden goods",
    "fencers and middlemen",
    "dealers with too many pockets"
  ],
  "Corruption": [
    "off-duty guards with too much gold",
    "greasy officials",
    "locals with 'connections'"
  ],
  "Organized Crime": [
    "enforcers keeping watch",
    "tavern regulars with muscle",
    "well-dressed 'businessfolk'"
  ],
  "Assassins' Guild": [
    "hooded loners",
    "silent patrons in corners",
    "travelers who don’t give names"
  ],
  "Slavery & Trafficking": [
    "slavers passing through",
    "guards-for-hire with cold eyes",
    "unsavory traders"
  ],
  "Cult Activity": [
    "devotees with strange symbols",
    "whispering patrons",
    "drunk zealots"
  ],
  "Widespread Lawlessness": [
    "fugitives",
    "hired blades",
    "locals carrying weapons at all times"
  ]
};

export const ClienteleBySiteSizeMapping: Record<SiteSize, string[]> = {
  tiny: [
    "a handful of regulars",
    "solitary drinkers",
    "nearby workers on break"
  ],
  small: [
    "locals and friendly faces",
    "occasional travelers",
    "neighborhood artisans"
  ],
  modest: [
    "townsfolk and merchants",
    "off-duty guards",
    "adventurers passing through"
  ],
  spacious: [
    "diverse groups of patrons",
    "entertainers and their fans",
    "traveling guild members"
  ],
  large: [
    "boisterous crowds",
    "mercenaries and explorers",
    "visitors from surrounding settlements"
  ],
  grand: [
    "dignified guests",
    "well-funded adventuring parties",
    "local elite and respected figures"
  ],
  sprawling: [
    "pilgrims and wanderers alike",
    "throngs of visitors from far and wide",
    "bustling crowds from all walks of life"
  ]
};

export const ClienteleByConditionMapping: Record<SiteCondition, string[]> = {
  squalid: [
    "rowdy regulars",
    "down-on-their-luck drifters",
    "locals with nowhere else to go"
  ],
  poor: [
    "laborers and dockhands",
    "tired travelers",
    "no-nonsense regulars"
  ],
  average: [
    "typical townsfolk",
    "travelers seeking decent fare",
    "low-ranking guild members"
  ],
  wealthy: [
    "nobles in disguise",
    "important visitors",
    "influential community members"
  ],
  aristocratic: [
    "high society patrons",
    "wealthy dignitaries",
    "elites conducting quiet business"
  ]
};