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
    { value: "large", label: "Large (e.g., a two-story inn or hall)" },
    { value: "grand", label: "Grand (e.g., large manor, cathedral, or guild hall)" },
    { value: "sprawling", label: "Sprawling (e.g., compound, campus, or market square)" },
];

export const SITE_CONDITION = [
    { value: "squalid", label: "Squalid (neglected but still functional)"},
    { value: "poor", label: "Poor (simple, without much comfort)"},
    { value: "average", label: "Average (clean but plain)"},
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
export const SHOP_TYPE_CATEGORIES = [
  {
    label: "Craftsmen",
    options: [
      { label: "Blacksmith", value: "blacksmith" },
      { label: "Armory", value: "armory" },
      { label: "Carpenter", value: "carpenter" },
      { label: "Glassblower", value: "glassblower" },
      { label: "Fletcher", value: "fletcher" },
      { label: "Tanner / Leatherworker", value: "tanner" },
      { label: "Weaponsmith", value: "weaponsmith" }
    ],
  },
  {
    label: "Fashion & Accessories",
    options: [
      { label: "Accessories", value: "accessories" },
      { label: "Cobbler", value: "cobbler" },
      { label: "Haberdasher", value: "haberdasher" },
      { label: "Milliner" , value: "milliner" },
      { label: "Tailor", value: "tailor" },
      { label: "Jeweler", value: "jeweler" },
      { label: "Perfumer", value: "perfumer" },
    ],
  },
  {
    label: "Food & Drink",
    options: [
      { label: "Bakery", value: "bakery" },
      { label: "Brewery", value: "brewery" },
      { label: "Butcher", value: "butcher" },
      { label: "Cheesemonger", value: "cheesemonger" },
      { label: "Confectionery", value: "confectionery" },
      { label: "Fishmonger", value: "fishmonger" },
      { label: "Meadery", value: "meadery" },
      { label: "Produce", value: "Produce" },
      { label: "Spice Merchant", value: "spiceMerchant" },
      { label: "Tea House & Coffee Shop", value: "teaHouse" },
      { label: "Winery", value: "winery" }
    ],
  },
  {
    label: "Magic, Alchemy, & Knowledge",
    options: [
      { label: "Alchemist", value: "alchemist" },
      { label: "Apothecary", value: "apothecary" },
      { label: "Bookstore", value: "bookstore" },
      { label: "Diviner's Tent", value: "divination" },
      { label: "Enchanter", value: "enchanter" },
      { label: "Herbalist", value: "herbalist" },
      { label: "Magic Shop", value: "magic" },
      { label: "Mapmaker", value: "mapmaker" },
      { label: "Scroll Shop", value: "scrollShop" }
    ],
  },
  {
    label: "Miscellaneous",
    options: [
      { label: "Curiosity Shop", value: "curiosityShop" },
      { label: "Clockmaker", value: "clockmaker" },
      { label: "General Store", value: "generalStore" },
      { label: "Pawn Shop", value: "pawnShop" },
      { label: "Pet Shop", value: "petShop" },
      { label: "Provisioner", value: "provisioner" },
      { label: "Salvager", value: "salvager" },
      { label: "Stable", value: "stable" },
      { label: "Sundries", value: "sundries" },
      { label: "Tinker", value: "tinker" },
      { label: "Toolsmith", value: "toolsmith" },
      { label: "Toy Maker", value: "toyMaker" },
      { label: "Trinket Shop", value: "trinketShop" },
      { label: "Other", value: "other" }
    ],
  }
] as const;


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

/* For Tavern types */
export const TAVERN_ENTERTAINMENT_OFFERINGS = [
  "Animal Acts / Trained Pet Shows",
  "Arcane Light Shows",
  "Arcane Puppet Theater",
  "Arm Wrestling Contests",
  "Bardic Performances",
  "Card Games",
  "Charmed Object Shows (Talking Skulls, Singing Spoons)",
  "Comedic Acts / Stand-up",
  "Cultural Dance Exhibitions",
  "Dancing (Patron Participation)",
  "Dice Games",
  "Drinking Contests",
  "Drunken Darts / Knife Throwing",
  "Enchanted Instrument Performances",
  "Fire Breathers / Jugglers",
  "Fortune Telling",
  "Gambling Tables (House-Run)",
  "Interactive Mysteries / Riddles",
  "Live Theater Skits",
  "Local Talent Nights",
  "Magicians / Illusionists",
  "Pit Fighting / Brawling Matches",
  "Poetry Readings",
  "Professional Dance Shows",
  "Puppet Shows",
  "Rune-Casting / Divination Games",
  "Seance / Ghost Story Night",
  "Singing Contests",
  "Storytelling Circles",
  "Tavern Quizzes / Trivia Nights",
  "Underground Betting Rings",
];

/* For Menu building */
export const QUALITY_OPTIONS = ["Poor", "Standard", "Fine", "Masterwork", "Exquisite"];
export const RARITY_OPTIONS = ["Common", "Uncommon", "Rare", "Very Rare", "Legendary"];

export const MENU_FIELDS_BY_SITE_TYPE: Record<string, string[]> = {
  tavern: ["name", "price", "category", "quality", "rarity", "description",],
  shop: ["name", "price", "quantity", "category", "quality", "rarity", "description"],
  temple: ["name", "price", "category", "rarity", "description"],
  guild: ["name", "price", "category", "rarity", "description"],
};

export const MENU_FIELD_LABELS: Record<string, string> = {
  name: "Name",
  price: "Price",
  quantity: "Quantity",
  category: "Category",
  quality: "Quality",
  rarity: "Rarity",
  description: "Description",
};

export const MENU_CATEGORY_OPTIONS_BY_SITE: Record<string, string[] | Record<string, string[]>> = {
  tavern: [
    "Food",
    "Specialty Dishes",
    "Non-Alcoholic Drinks",
    "Spirits & Brews",
  ],

  temple: [
    "Blessings",
    "Services",
    "Holy Water",
    "Divinations",
  ],

  guild: [
    "Training",
    "Contracts",
    "Guild Equipment",
    "Insignia & Uniforms",
    "Crafting Services",
  ],

  government: [
    "Permits & Licenses",
    "Taxation",
    "Public Records",
    "Guards & Patrols",
    "City Services",
    "Bounties",
    "Legal Services",
  ],

  entertainment: [
    "Performances",
    "Tickets / Entry",
    "Concessions",
    "Merchandise",
    "Private Events",
    "Drinks & Snacks",
  ],

  hidden: [
    "Black Market",
    "Secrets for Sale",
    "Forged Documents",
    "Assassinations",
    "Stolen Goods",
    "Smuggled Items",
    "Spy Equipment",
  ],
  shop: {
    blacksmith: [
      "Weapons",
      "Armor",
      "Tools",
      "Repairs",
      "Custom Orders"
    ],

    armory: [
      "Armor",
      "Shields",
      "Helmets",
      "Gauntlets",
      "Battle Gear"
    ],

    carpenter: [
      "Furniture",
      "Woodcraft Tools",
      "Home Fixtures",
      "Decorative Woodwork",
      "Repairs"
    ],

    glassblower: [
      "Glassware",
      "Vials & Bottles",
      "Decorative Items",
      "Windowpanes",
      "Custom Orders"
    ],

    fletcher: [
      "Arrows",
      "Bows",
      "Crossbows",
      "Bowstrings",
      "Repairs"
    ],

    tanner: [
      "Leather Armor",
      "Belts & Straps",
      "Bags & Pouches",
      "Footwear",
      "Leatherworking Supplies"
    ],

    weaponsmith: [
      "Blades",
      "Polearms",
      "Blunt Weapons",
      "Maintenance Kits",
      "Custom Weapons"
    ],

    accessories: [
      "Jewelry",
      "Hats & Headwear",
      "Belts",
      "Gloves",
      "Fashion Accessories"
    ],

    cobbler: [
      "Shoes",
      "Boots",
      "Shoe Repair",
      "Leather Care",
      "Custom Footwear"
    ],

    haberdasher: [
      "Clothing",
      "Hats",
      "Buttons & Fasteners",
      "Fabrics",
      "Tailoring Supplies"
    ],

    milliner: [
      "Fancy Hats",
      "Decorations & Accessories",
      "Veils",
      "Hat Repair",
      "Custom Millinery"
    ],

    tailor: [
      "Clothing",
      "Alterations",
      "Fabrics",
      "Sewing Supplies",
      "Custom Garments"
    ],

    jeweler: [
      "Rings",
      "Necklaces",
      "Gemstones",
      "Custom Jewelry",
      "Repair Services"
    ],

    perfumer: [
      "Fragrances",
      "Essential Oils",
      "Custom Scents",
      "Cosmetics",
      "Aromatherapy"
    ],

    bakery: [
      "Pastry",
      "Bread",
      "Cakes",
      "Pies",
      "Specialty Baked Goods"
    ],

    brewery: [
      "Ales",
      "Lagers",
      "Specialty Brews",
      "Brewing Supplies",
      "Tastings"
    ],

    butcher: [
      "Fresh Meat",
      "Cured Meats",
      "Sausages",
      "Custom Cuts",
      "Offal & Byproducts"
    ],

    cheesemonger: [
      "Cheeses",
      "Dairy Products",
      "Cheese Platters",
      "Specialty Cheeses"
    ],

    confectionery: [
      "Candies",
      "Chocolates",
      "Gift Boxes",
      "Seasonal Sweets"
    ],

    fishmonger: [
      "Fresh Fish",
      "Shellfish",
      "Preserved Fish",
      "Fishing Supplies",
      "Specialty Seafood"
    ],

    meadery: [
      "Meads",
      "Tastings",
      "Brewing Supplies"
    ],

    produce: [
      "Vegetables",
      "Fruits",
      "Herbs"
    ],

    spiceMerchant: [
      "Herbs & Spices",
      "Spice Blends",
      "Exotic Ingredients",
    ],

    teaHouse: [
      "Teas",
      "Coffees",
      "Teapots & Accessories",
      "Samplers"
    ],

    winery: [
      "Wines",
      "Samplers",
      "Wine Accessories"
    ],

    alchemist: [
      "Potions",
      "Volatile Mixtures",
      "Herbal Remedies",
      "Alchemy Supplies",
      "Magical Components"
    ],

    apothecary: [
      "Powders & Pastes",
      "Salves & Ointments",
      "Tonics & Tinctures",
      "Poisons & Antitoxins",
      "Household Remedies"
    ],

    bookstore: [
      "Books",
      "Scrolls",
      "Maps",
      "Stationery & Accessories",
    ],

    divination: [
      "Fortunes",
      "Divining Tools",
      "Scrying Supplies",
      "Divining Services",
    ],

    enchanter: [
      "Enchanted Equipment",
      "Enchanted Wares",
      "Trinkets & Talismans",
      "Enchanting Supplies"
    ],

    herbalist: [
      "Herbs",
      "Tinctures",
      "Teas",
      "Natural Remedies",
      "Gardening Supplies"
    ],

    magic: [
      "Wands, Rods, & Staves",
      "Clothing & Accessories",
      "Scrolls & Books",
      "Spell Components",
      "Other"
    ],

    mapmaker: [
      "Maps",
      "Cartography Supplies",
      "Navigation Tools",
      "Atlases"
    ],

    scrollShop: [
      "Scrolls",
      "Magical Texts",
      "Spellbooks",
      "Calligraphy Supplies",
      "Scrollcrafting Supplies"
    ],

    curiosityShop: [
      "Oddities",
      "Collectibles",
      "Trinkets",
      "Mystical Items"
    ],

    clockmaker: [
      "Clocks",
      "Watches",
      "Repairs",
      "Custom Timepieces",
      "Clock Parts",
      "Constructs"
    ],

    generalStore: [
      "Household Goods",
      "Tools",
      "Food Staples",
      "Everyday Items"
    ],

    trinketShop: [
      "Small Gifts",
      "Souvenirs",
      "Jewelry",
      "Toys",
      "Collectibles"
    ],

    pawnShop: [
      "Used Goods",
      "Jewelry",
      "Weapons",
      "Artifacts",
      "Rare Finds"
    ],

    petShop: [
      "Pets",
      "Pet Supplies",
      "Food",
      "Toys",
      "Training Services"
    ],

    provisioner: [
      "Food Supplies",
      "Camping Gear",
      "Clothing",
      "Tools",
      "General Supplies"
    ],

    salvager: [
      "Scrap Materials",
      "Repurposed Items",
      "Tools",
      "Parts",
      "Collectibles"
    ],

    stable: [
      "Horses",
      "Feed",
      "Tack & Saddlery",
      "Training",
      "Horse Care Products"
    ],

    sundries: [
      "Miscellaneous Goods",
      "Household Items",
      "Personal Care",
      "Cleaning Supplies",
      "Basic Tools"
    ],

    tinker: [
      "Small Repairs",
      "Gadgets",
      "Tools",
      "Mechanical Parts",
      "Custom Devices"
    ],

    toolsmith: [
      "Hand Tools",
      "Blacksmith Tools",
      "Repair Services",
      "Custom Tools",
      "Sharpening Services"
    ],

    toyMaker: [
      "Toys",
      "Games",
      "Puzzles",
      "Wooden Toys",
      "Custom Creations"
    ],

    other: [
      "Miscellaneous",
      "Unique Items",
      "Special Orders"
    ],
  }
};


export type SiteCategory = typeof SITE_CATEGORIES[number]["value"];
export type SiteSize = typeof SITE_SIZE[number]["value"];
export type SiteCondition = typeof SITE_CONDITION[number]["value"];
export type SiteSecurityLevel = typeof SECURITY_LEVELS[number]["value"];
export type SiteSecrecyLevel = typeof SECRECY_LEVELS[number]["value"];
export type SiteGuildType = typeof GUILD_TYPES[number];
export type SiteEntertainmentType = typeof ENTERTAINMENT_VENUE_TYPES[number];
export type QualityType = typeof QUALITY_OPTIONS[number];
export type RarityType = typeof RARITY_OPTIONS[number];

type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;
export type SiteShopType = Flatten<typeof SHOP_TYPE_CATEGORIES>["value"];