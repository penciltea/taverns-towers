export const SITE_CATEGORIES = [
    { value: "tavern", label: "Taverns & Inns"},
    { value: "temple", label: "Temples & Shrines"},
    { value: "shop", label: "Shops & Services"},
    { value: "guild", label: "Guild Halls"},
    { value: "government", label: "Government & Infrastructure"},
    { value: "entertainment", label: "Entertainment"},
    { value: "hidden", label: "Hidden & Secret Sites"},
    { value: "residence", label: "Residence"},
    { value: "miscellaneous", label: "Miscellaneous"}
]

export const SITE_SIZE = [
    { value: "tiny", label: "Tiny (e.g., a single-room stall or shack)" },
    { value: "small", label: "Small (e.g., a modest cottage or kiosk)" },
    { value: "modest", label: "Modest (e.g., average-sized home or shop)" },
    { value: "spacious", label: "Spacious (e.g., multiple rooms or areas)" },
    { value: "large", label: "Large (e.g., a two-story inn or hall)" },
    { value: "grand", label: "Grand (e.g., large manor, cathedral, or guild hall)" },
    { value: "sprawling", label: "Sprawling (e.g., compound, campus, or market square)" },
];

export const SITE_CONDITION = [
    { value: "squalid", label: "Squalid (neglected but still functional)"},
    { value: "poor", label: "Poor (simple, without much comfort)"},
    { value: "average", label: "Average (clean but plain)"},
    { value: "comfortable", label: "Comfortable (maintained with care)"},
    { value: "wealthy", label: "Wealthy (Luxurious, maintained extremely well)"},
    { value: "aristocratic", label: "Aristocratic (Highest quality, lavish and luxurious standards)"}
];

/* For Government site type form */
export const SECURITY_LEVELS = [
  { value: "none", label: "None" },
  { value: "low", label: "Low (Basic patrols)" },
  { value: "moderate", label: "Moderate (Watch presence, restricted access)" },
  { value: "high", label: "High (Trained guards, checkpoints)" },
  { value: "very_high", label: "Very High (Wards, elite protection)" },
  { value: "top_secret", label: "Top Secret (Highest clearance only)" }
];

/* For Hidden site type form */
export const SECRECY_LEVELS = [
  { value: "unknown", label: "Unknown (Unnoticed, not hidden)" },
  { value: "concealed", label: "Concealed (Blends into surroundings)" },
  { value: "guarded", label: "Guarded (Few know of it)" },
  { value: "encrypted", label: "Encrypted (Codes or riddles required)" },
  { value: "magically_hidden", label: "Magically Hidden (Arcane concealment)" },
  { value: "mythical", label: "Mythical (Believed to be legend)" }
];

/* For Guild site type form */
export const GUILD_TYPES = [
  "Adventurers' Guild",
  "Alchemists' Guild",
  "Artisans' Guild",
  "Assassins' Guild",
  "Bards' Guild",
  "Beast Tamers' Lodge",
  "Blacksmiths' Guild",
  "Cartographers' Guild",
  "Couriers' Guild",
  "Dockworkers' Guild",
  "Engineers' Guild",
  "Explorers' Guild",
  "Glassblowers' Guild",
  "Healers' Guild",
  "Hunters' Guild",
  "Laborers' Union",
  "Mages' Guild",
  "Merchants' Syndicate",
  "Miners' Guild",
  "Scribes' Guild",
  "Seafarers' Brotherhood",
  "Spy Network (Front Guild)",
  "Tailors' Guild",
  "Thieves' Guild",
  "Other"
];

/* for Shop types */
export const SHOP_TYPES = [
  "General Store",
  "Blacksmith",
  "Apothecary",
  "Bakery",
  "Tailor",
  "Bookstore",
  "Jeweler",
  "Magic",
  "Armory",
  "Alchemist",
  "Carpenter",
  "Other",
];

/* for Entertainment types */
export const ENTERTAINMENT_VENUE_TYPES = [
  "Theater",
  "Music Hall",
  "Arena / Coliseum",
  "Gambling Den",
  "Bardic College",
  "Bathhouse",
  "Brothel",
  "Festival Grounds",
  "Street Performance Zone",
  "Duelling Ring",
  "Circus Tent",
  "Magical Spectacle Venue",
  "Racing Track",
  "Underground Fight Pit",
  "Other"
];

export type SiteCategory = typeof SITE_CATEGORIES[number]["value"];
export type SiteSize = typeof SITE_SIZE[number]["value"];
export type SiteCondition = typeof SITE_CONDITION[number]["value"];
export type SiteSecurityLevel = typeof SECURITY_LEVELS[number]["value"];
export type SiteSecrecyLevel = typeof SECRECY_LEVELS[number]["value"];
export type SiteShopType = typeof SHOP_TYPES[number];
export type SiteGuildType = typeof GUILD_TYPES[number];
export type SiteEntertainmentType = typeof ENTERTAINMENT_VENUE_TYPES[number];