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
    "Training & Education",
    "Contracts & Commissions",
    "Research & Documentation",
    "Licensing & Administration",
    "Consultation & Evaluation",
    "Maintenance & Repair",
    "Specialty Service"
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
      "Leather Care & Supplies",
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
      "Cheese Platters",
      "Accoutrements",
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
      "Spell Components"
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

export type QualityType = typeof QUALITY_OPTIONS[number];
export type RarityType = typeof RARITY_OPTIONS[number];
