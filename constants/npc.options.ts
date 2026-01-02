import { Flatten } from "./common.options";

export const NPC_TABS = ["Basics", "Physical Traits", "Personality", "NPC Connections", "Configuration"];

export const NPC_AGE = [
  "Child",
  "Teenager",
  "Young adult",
  "Adult",
  "Middle-aged",
  "Elderly",
  "Ageless",
];

export const NPC_PRONOUNS = [
  "He/Him",
  "She/Her",
  "They/Them",
  "He/They",
  "She/They",
  "It/Its",
  "Xe/Xem",
  "Xe/Xim",
  "Ze/Hir",
  "Ze/Zir",
  "Zey/Zem",
  "Other",
];

export const NPC_ALIGNMENT = [
  "Lawful good",
  "Neutral good",
  "Chaotic good",
  "Lawful neutral",
  "True neutral",
  "Chaotic neutral",
  "Lawful evil",
  "Neutral evil",
  "Chaotic evil",
  "Unaligned"
];

export const NPC_STATUS = [
  "Alive",
  "Dead",
  "Missing",
  "Unknown",
];

export const NPC_RACES = [
  { label: "Aasimar", value: "aasimar" },
  { label: "Celestial", value: "celestial" },
  { label: "Construct", value: "construct" },
  { label: "Dragonborn", value: "dragonborn" },
  { label: "Dwarf", value: "dwarf" },
  { label: "Elf", value: "elf" },
  { label: "Fiend", value: "fiend" },
  { label: "Genasi", value: "genasi" },
  { label: "Gnome", value: "gnome" },
  { label: "Goblin", value: "goblin" },
  { label: "Goliath", value: "goliath" }, 
  { label: "Half-Elf", value: "half-elf" },
  { label: "Half-Orc", value: "half-orc" },
  { label: "Halfling", value: "halfling" },
  { label: "Human", value: "human" },
  { label: "Kenku", value: "kenku" },
  { label: "Orc", value: "orc" },
  { label: "Tabaxi", value: "tabaxi" },
  { label: "Tiefling", value: "tiefling" },
];

export const NPC_TRAITS = [
  {
    label: "Personality",
    options: [
      { label: "Calm", value: "calm" },
      { label: "Charming", value: "charming" },
      { label: "Curious", value: "curious" },
      { label: "Eccentric", value: "eccentric" },
      { label: "Friendly", value: "friendly" },
      { label: "Grumpy", value: "grumpy" },
      { label: "Kind", value: "kind" },
      { label: "Naïve", value: "naive" },
      { label: "Polite", value: "polite" },
      { label: "Quiet", value: "quiet" },
      { label: "Stoic", value: "stoic" },
      { label: "Witty", value: "witty" },
      { label: "Wise", value: "wise" },
    ]
  },
  {
    label: "Virtue",
    options: [
      { label: "Brave", value: "brave" },
      { label: "Compassionate", value: "compassionate" },
      { label: "Disciplined", value: "disciplined" },
      { label: "Forgiving", value: "forgiving" },
      { label: "Generous", value: "generous" },
      { label: "Honest", value: "honest" },
      { label: "Loyal", value: "loyal" },
      { label: "Protective", value: "protective" },
      { label: "Reliable", value: "reliable" },
      { label: "Selfless", value: "selfless" },
    ]
  },
  {
    label: "Flaw",
    options: [
      { label: "Arrogant", value: "arrogant" },
      { label: "Cowardly", value: "cowardly" },
      { label: "Deceitful", value: "deceitful" },
      { label: "Greedy", value: "greedy" },
      { label: "Impulsive", value: "impulsive" },
      { label: "Jealous", value: "jealous" },
      { label: "Lazy", value: "lazy" },
      { label: "Manipulative", value: "manipulative" },
      { label: "Reckless", value: "reckless" },
      { label: "Ruthless", value: "ruthless" },
      { label: "Vindictive", value: "vindictive" },
      { label: "Oblivious", value: "oblivious" },
    ]
  },
  {
    label: "Ambition & Drive",
    options: [
      { label: "Ambitious", value: "ambitious" },
      { label: "Cunning", value: "cunning" },
      { label: "Driven", value: "driven" },
      { label: "Idealistic", value: "idealistic" },
      { label: "Obsessive", value: "obsessive" },
      { label: "Power-hungry", value: "powerHungry" },
      { label: "Rebellious", value: "rebellious" },
      { label: "Scheming", value: "scheming" },
      { label: "Secretive", value: "secretive" },
    ]
  }
];

export const NPC_REPUTATION = [
  { label: "Annoying / Troublemaker", value: "annoying" },
  { label: "Beloved", value: "beloved" },
  { label: "Disliked / Irritable", value: "disliked" },
  { label: "Feared", value: "feared" },
  { label: "Infamous", value: "infamous" },
  { label: "Mysterious", value: "mysterious" },
  { label: "Notorious", value: "notorious" },
  { label: "Respected", value: "respected" },
  { label: "Trusted", value: "trusted" }
];

export const NPC_ARCHETYPE = [
  {
    label: "Magical",
    options: [
      { label: "Apprentice wizard", value: "apprentice wizard" },
      { label: "Elder wizard", value: "elder wizard" },
      { label: "Occult caster", value: "occult caster" },
      { label: "Priest / Cleric", value: "cleric" },
      { label: "Druid / Shaman", value: "druid" }
    ]
  },
  {
    label: "Martial",
    options: [
      { label: "Veteran soldier", value: "veteran soldier" },
      { label: "Squire", value: "squire" },
      { label: "Ruffian / Thug", value: "ruffian" },
      { label: "Mercenary", value: "mercenary" }
    ]
  },
  {
    label: "Social / Political",
    options: [
      { label: "Aristocrat / Noble", value: "aristocrat" },
      { label: "Courtier / Diplomat", value: "courtier" },
      { label: "Official / Bureaucrat", value: "official" },
      { label: "Revolutionary / Agitator", value: "revolutionary" }
    ]
  },
  {
    label: "Underworld / Intrigue",
    options: [
      { label: "Thief / Pickpocket", value: "thief" },
      { label: "Spy / Informant", value: "spy" },
      { label: "Assassin", value: "assassin" },
      { label: "Crime Boss / Gang Leader", value: "crime boss" }
    ]
  },
  {
    label: "Crafts & Trades",
    options: [
      { label: "Artisan", value: "artisan" },
      { label: "Entertainer / Performer", value: "entertainer" },
      { label: "Farmer / Peasant", value: "peasant" },
      { label: "Fisher / Seafarer", value: "fisher" },
      { label: "Laborer", value: "laborer" }
    ]
  },
  {
    label: "Miscellaneous",
    options: [
      { label: "Child / Youth", value: "child" },
      { label: "Hermit / Outcast", value: "hermit" },
      { label: "Researcher / Inventor", value: "inventor" },
      { label: "Scholar / Sage", value: "scholar" },
      { label: "Urchin", value: "urchin" },
      { label: "Other", value: "other" }
    ]
  }
];

export const NPC_OCCUPATION = [
  {
    label: "Agricultural",
    options: [
      { label: "Animal husbandry", value: "animal husbandry" },
      { label: "Farmer", value: "farmer" },
      { label: "Fisher", value: "fisher" },
      { label: "Hunter / Trapper", value: "hunter" },
      { label: "Lumberjack / Woodsman", value: "lumberjack" },
      { label: "Miller", value: "miller" },
    ]
  },
  {
    label: "Crafts & Services",
    options: [
      { label: "Apprentice artisan", value: "apprentice artisan" },
      { label: "Artisan", value: "artisan" },
      { label: "Auctioneer", value: "auctioneer" },
      { label: "Banker", value: "banker" },
      { label: "Guildmaster", value: "guildmaster" },
      { label: "Healer / Herbalist", value: "healer" },
      { label: "Innkeeper / Tavernkeeper", value: "innkeeper" },
      { label: "Inventor", value: "inventor" },
      { label: "Laborer", value: "laborer" },
      { label: "Merchant", value: "merchant" },
      { label: "Scribe / Clerk", value: "scribe" },
      { label: "Shopkeeper", value: "shopkeeper" },
      { label: "Teacher / Tutor", value: "teacher" },
    ]
  },
  {
    label: "Exploration & Travel", 
    options: [
      { label: "Boatman / Ferryman", value: "boatman" },
      { label: "Caravaneer", value: "caravaneer" },
      { label: "Cartographer / Explorer", value: "cartographer" },
      { label: "Courier / Messenger", value: "courier" },
      { label: "Sailor", value: "sailor" },
    ]
  },
  {
    label: "Magical & Religious",
    options: [
      { label: "Apprentice wizard", value: "apprentice wizard" },
      { label: "Druid / Shaman", value: "druid" },
      { label: "Priest / Cleric", value: "priest" },
      { label: "Wizard / Mage", value: "wizard" },
    ]
  },
  {
    label: "Martial",
    options: [
      { label: "Archer", value: "archer" },
      { label: "Guard", value: "guard" },
      { label: "Knight", value: "knight" },
      { label: "Mercenary", value: "mercenary" },
      { label: "Soldier", value: "soldier" },
      { label: "Military leader", value: "military leader" },
      { label: "Militia member", value: "militia" },
      { label: "Squire", value: "squire" },
    ]
  },
  {
    label: "Underworld / Criminal",
    options: [
      { label: "Assassin", value: "assassin" },
      { label: "Fence / Black market dealer", value: "fence" },
      { label: "Ruffian / Thug", value: "ruffian" },
      { label: "Smuggler", value: "smuggler" },
      { label: "Spy / Informant", value: "spy" },
      { label: "Thief / Pickpocket", value: "thief" },
    ]
  }, 
  {
    label: "Miscellaneous",
    options: [
      { label: "Aristocrat / Noble", value: "aristocrat" },
      { label: "Beggar / Drifter", value: "beggar" },
      { label: "Councilor / Advisor", value: "advisor" },
      { label: "Entertainer", value: "entertainer" },
      { label: "Government official", value: "official" },
      { label: "Servant / Retainer", value: "servant" },
      { label: "Steward / Chamberlain", value: "steward" },
      { label: "Student", value: "student" },
      { label: "Other", value: "other" },
    ]
  }
];

export const NPC_PERSUASION = [
  { label: "Appeal to authority / tradition", value: "authority" },
  { label: "Appeal to emotion / empathy", value: "empathy" },
  { label: "Appeal to reason / logic", value: "reason" },
  { label: "Bribery", value: "bribery" },
  { label: "Charm / Seduction", value: "charm" },
  { label: "Deception", value: "deception" },
  { label: "Emotional manipulation", value: "manipulation" },
  { label: "Flattery", value: "flattery" },
  { label: "Force / Threats", value: "threats" },
  { label: "Goading", value: "goading" },
  { label: "Negotiation / Compromise", value: "negotiation" },
  { label: "None (stubborn)", value: "none" },
];

export const NPC_HEIGHT = [
  { label: "Average", value: "average" },
  { label: "Short", value: "short" },
  { label: "Tall", value: "tall" },
  { label: "Very short", value: "veryShort" },
  { label: "Very tall", value: "veryTall" },
];

export const NPC_BUILD = [
  { label: "Athletic", value: "athletic" },
  { label: "Average", value: "average" },
  { label: "Heavyset", value: "heavyset" },
  { label: "Obese", value: "obese" },
  { label: "Thin", value: "thin" },
  { label: "Very thin", value: "veryThin" },
];

export const NPC_HUMAN_SKINTONES = [
  { label: "Human skintones", 
    options: [
      { label: "Brown", value: "brown" },
      { label: "Dark brown", value: "darkBrown" },
      { label: "Deep tan", value: "deepTan" },
      { label: "Ebony", value: "ebony" },
      { label: "Fair", value: "fair" },
      { label: "Light olive", value: "lightOlive" },
      { label: "Medium", value: "medium" },
      { label: "Olive", value: "olive" },
      { label: "Pale", value: "pale" },
      { label: "Tan", value: "tan" },
      { label: "Very pale", value: "veryPale" },
      
    ]
  }
];

export const NPC_FANTASY_SKINTONES = [
  {
    label: "Fantasy skintones",
    options: [
      { label: "Amethyst", value: "amethyst" },
      { label: "Ashen gray", value: "ashenGray" },
      { label: "Azure", value: "azure" },
      { label: "Bronze", value: "bronze" },
      { label: "Brass", value: "brass" },
      { label: "Charcoal black", value: "charcoalBlack" },
      { label: "Cobalt", value: "cobalt" },
      { label: "Crimson", value: "crimson" },
      { label: "Clay red", value: "clayRed" },
      { label: "Emerald", value: "emerald" },
      { label: "Gold", value: "gold" },
      { label: "Indigo", value: "indigo" },
      { label: "Ice blue", value: "iceBlue" },
      { label: "Jet black", value: "jetBlack" },
      { label: "Lavender", value: "lavender" },
      { label: "Magenta", value: "magenta" },
      { label: "Midnight blue", value: "midnightBlue" },
      { label: "Moss green", value: "mossGreen" },
      { label: "Olive green", value: "oliveGreen" },
      { label: "Pearl white", value: "pearlWhite" },
      { label: "Rose", value: "rose" },
      { label: "Ruby red", value: "rubyRed" },
      { label: "Sandy tan", value: "sandyTan" },
      { label: "Silver", value: "silver" },
      { label: "Slate", value: "slate" },
      { label: "Stone gray", value: "stoneGray" },
      { label: "Terracotta", value: "terracotta" },
      { label: "Teal", value: "teal" },
      { label: "Violet", value: "violet" },
      { label: "Verdigris", value: "verdigris" }
    ]
  }
];

// Broken apart for NPC Generator logic
export const NPC_SKINTONE = [
  ...NPC_HUMAN_SKINTONES,
  ...NPC_FANTASY_SKINTONES
];

export const NPC_HUMAN_HAIR_COLORS = [
  { label: "Realistic colors", 
    options: [
      { label: "Auburn", value: "auburn" },
      { label: "Black", value: "black" },
      { label: "Blonde", value: "blonde" },
      { label: "Brown", value: "brown" },
      { label: "Chestnut", value: "chestnut" },
      { label: "Dirty blonde", value: "dirtyBlonde" },
      { label: "Gray", value: "gray" },
      { label: "Platinum blonde", value: "platinumBlonde" },
      { label: "Red", value: "red" },
      { label: "Strawberry blonde", value: "strawberryBlonde" },
      { label: "White", value: "white" }
    ]
  },
];

export const NPC_FANTASY_HAIR_COLORS = [
  { label: "Fantasy colors", 
    options: [
      { label: "Amethyst", value: "amethyst" },
      { label: "Aqua", value: "aqua" },
      { label: "Blue", value: "blue" },
      { label: "Bronze", value: "bronze" },
      { label: "Copper", value: "copper" },
      { label: "Crimson", value: "crimson" },
      { label: "Emerald", value: "emerald" },
      { label: "Gold", value: "gold" },
      { label: "Indigo", value: "indigo" },
      { label: "Lavender", value: "lavender" },
      { label: "Magenta", value: "magenta" },
      { label: "Pink", value: "pink" },
      { label: "Purple", value: "purple" },
      { label: "Silver", value: "silver" },
      { label: "Snow white", value: "snowWhite" },
      { label: "Teal", value: "teal" },
      { label: "Vibrant red", value: "vibrantRed" },
      { label: "Yellow", value: "yellow" }
    ]
  }
];

export const NPC_HAIR_COLOR = [
  ...NPC_HUMAN_HAIR_COLORS,
  ...NPC_FANTASY_HAIR_COLORS
];

export const NPC_HAIR_TEXTURES = [
  { label: "Hair textures", 
    options: [
      { label: "Coily", value: "coily" },
      { label: "Curly", value: "curly" },
      { label: "Fine", value: "fine" },
      { label: "Kinky", value: "kinky" },
      { label: "Straight", value: "straight" },
      { label: "Thick", value: "thick" },
      { label: "Voluminous", value: "voluminous" },
      { label: "Wavy", value: "wavy" },
    ]
  }
];

export const NPC_HAIR_LENGTHS = [
  { label: "Hair lengths", 
    options: [
      { label: "Bald", value: "bald" },
      { label: "Buzz cut", value: "buzzCut" },
      { label: "Long", value: "long" },
      { label: "Medium", value: "medium" },
      { label: "Short", value: "short" },
      { label: "Shoulder-length", value: "shoulderLength" },
      { label: "Very long", value: "veryLong" },
      { label: "Waist-length", value: "waistLength" },
    ]
  }
];

export const NPC_HAIR_STYLES = [
  { label: "Hair styles",
    options: [
      { label: "Braided", value: "braided" },
      { label: "Bun(s)", value: "buns" },
      { label: "Cornrows", value: "cornrows" },
      { label: "Dreadlocks", value: "dreadlocks" },
      { label: "Half-up half-down", value: "halfUpHalfDown" },
      { label: "Loose", value: "loose" },
      { label: "Messy bun(s)", value: "messyBuns" },
      { label: "Mohawk", value: "mohawk" },
      { label: "Pigtails", value: "pigtails" },
      { label: "Ponytail", value: "ponytail" },
      { label: "Ringlets", value: "ringlets" },
      { label: "Shaggy", value: "shaggy" },
      { label: "Side-shave", value: "side-shave" },
      { label: "Wavy mane", value: "wavyMane" },
      { label: "Windswept", value: "windswept" },
      { label: "Wolf cut", value: "wolfCut" },
      { label: "Undercut", value: "undercut" },
      { label: "Unkempt", value: "unkempt" },
      { label: "Updo", value: "updo" },
    ]
  }
]

// Broken apart for NPC Generator logic
export const NPC_HAIR_STYLE = [
  ...NPC_HAIR_TEXTURES,
  ...NPC_HAIR_LENGTHS,
  ...NPC_HAIR_STYLES
];



export const NPC_HUMAN_EYE_COLORS = [
  { label: "Human eye colors", 
    options: [
      { label: "Black", value: "black" },
      { label: "Blue", value: "blue" },
      { label: "Dark brown", value: "darkBrown" },
      { label: "Gray", value: "gray" },
      { label: "Green", value: "green" },
      { label: "Hazel", value: "hazel" },
      { label: "Honey", value: "honey" },
      { label: "Light brown", value: "lightBrown" },
    ]
  }
];

export const NPC_FANTASY_EYE_COLORS = [
  { label: "Fantasy eye colors", 
    options: [
      { label: "Amethyst", value: "amethyst" },
      { label: "Aqua", value: "aqua" },
      { label: "Blood Red", value: "bloodRed" },
      { label: "Bronze", value: "bronze" },
      { label: "Cobalt", value: "cobalt" },
      { label: "Copper", value: "copper" },
      { label: "Crimson", value: "crimson" },
      { label: "Emerald", value: "emerald" },
      { label: "Gold", value: "gold" },
      { label: "Indigo", value: "indigo" },
      { label: "Lavender", value: "lavender" },
      { label: "Magenta", value: "magenta" },
      { label: "Opal", value: "opal" },
      { label: "Peridot", value: "peridot" },
      { label: "Rose", value: "rose" },
      { label: "Ruby", value: "ruby" },
      { label: "Sapphire", value: "sapphire" },
      { label: "Silver", value: "silver" },
      { label: "Teal", value: "teal" },
      { label: "Topaz", value: "topaz" },
      { label: "Violet", value: "violet" },
      { label: "Vibrant Blue", value: "vibrantBlue" },
      { label: "Vibrant Green", value: "vibrantGreen" },
      { label: "Vibrant Pink", value: "vibrantPink" },
      { label: "Vibrant Purple", value: "vibrantPurple" },
      { label: "Vibrant Red", value: "vibrantRed" },
      { label: "Vibrant Yellow", value: "vibrantYellow" },
    ]
  }
];

// Broken apart for NPC Generator logic
export const NPC_EYE_COLOR = [
  ...NPC_HUMAN_EYE_COLORS,
  ...NPC_FANTASY_EYE_COLORS
];

export const NPC_DISTINGUISHING_EYES = [
  { label: "Cataract(s)", value: "cataracts" },
  { label: "Cross-eyed", value: "crossEyed" },
  { label: "Heterochromia", value: "heterochromia" },
  { label: "Glowing eyes", value: "glowingEyes" },
  { label: "Missing eye(s)", value: "missingEyes" },
  { label: "Scarred eye(s)", value: "scarredEyes" },
  { label: "Unusual pupil(s)", value: "unusualPupils" }
];

export const NPC_DISTINGUISHING_FACE_COMMON = [
  { label: "Beard / Facial hair", value: "facialHair" },
  { label: "Birthmark(s) on face", value: "birthmarks" },
  { label: "Dimples", value: "dimples" },
  { label: "Freckles", value: "freckles" },
  { label: "Mole(s) on face", value: "moles" }
];

export const NPC_DISTINGUISHING_FACE_UNCOMMON = [
  { label: "Burn scar(s) on face", value: "burnScars" },
  { label: "Cleft chin", value: "cleftChin" },
  { label: "Crooked nose", value: "crookedNose" },
  { label: "Face / War paint", value: "warPaint" },
  { label: "Piercing(s) on face", value: "piercings" },
  { label: "Scar(s) on face", value: "scars" },
  { label: "Tattoo(s) on face", value: "faceTattoos" }
];

export const NPC_DISTINGUISHING_BODY_COMMON = [
  { label: "Birthmark(s) on body", value: "bodyBirthmarks" },
  { label: "Mole(s) on body", value: "bodyMoles" },
  { label: "Piercing(s) on body", value: "bodyPiercings" },
];

export const NPC_DISTINGUISHING_BODY_UNCOMMON = [
  { label: "Body / War paint", value: "bodyWarPaint" },
  { label: "Scar(s) on body", value: "bodyScars" },
  { label: "Tattoo(s) on body", value: "bodyTattoos" },
  { label: "Uses assistive device(s) (crutches, hearing aids, glasses, etc.)", value: "assistiveDevices" },
];

export const NPC_DISTINGUISHING_BODY_RARE = [
  { label: "Albanism", value: "albinism" },
  { label: "Burn scar(s) on body", value: "burnScars" },
  { label: "Missing limb(s)", value: "missingLimbs" },
  { label: "Missing finger(s) / toe(s)", value: "missingDigits" },
  { label: "Unusual skin texture", value: "unusualSkinTexture" },
  { label: "Vitiligo", value: "vitiligo" },   
];

export const NPC_DISTINGUISHING_BODY_VERY_RARE = [
  { label: "Exotic feature(s) (horns, tails, etc.)", value: "exoticFeatures" },
  { label: "Glowing skin", value: "glowingSkin" },
  { label: "Webbed fingers/toes", value: "webbedDigits" },
  { label: "Wings (feathered)", value: "featheredWings" },
  { label: "Wings (insectoid)", value: "insectoidWings" },
  { label: "Wings (leathery)", value: "leatheryWings" },
];

export const NPC_DISTINGUISHING_OTHER_COMMON = [
  { label: "Distinctive clothing / jewelry", value: "distinctiveClothing" },
  { label: "Distinctive gait / movement", value: "distinctiveGait" },
  { label: "Distinctive mannerisms", value: "distinctiveMannerisms" }, 
];

export const NPC_DISTINGUISHING_OTHER_UNCOMMON = [
  { label: "Unique scent", value: "uniqueScent" },
  { label: "Unusual voice", value: "unusualVoice" },
];

export const NPC_DISTINGUISHING_OTHER_RARE = [
  { label: "Blind / Visually impaired", value: "blind" },
  { label: "Deaf / Hard of hearing", value: "deaf" },
  { label: "Mute / Non-verbal", value: "mute" },
];

export const NPC_DISTINGUISHING_FEATURES = [
  { label: "Eyes", 
    options: [
      ...NPC_DISTINGUISHING_EYES
    ]
  },
  { label: "Face", 
    options: [
      ...NPC_DISTINGUISHING_FACE_COMMON,
      ...NPC_DISTINGUISHING_FACE_UNCOMMON
    ].sort((a, b) =>
      a.label.localeCompare(b.label)
    )
  },
  { label: "Body", 
    options: [
      ...NPC_DISTINGUISHING_BODY_COMMON,
      ...NPC_DISTINGUISHING_BODY_UNCOMMON,
      ...NPC_DISTINGUISHING_BODY_RARE,
      ...NPC_DISTINGUISHING_BODY_VERY_RARE
    ].sort((a, b) =>
      a.label.localeCompare(b.label)
    )
  }, 
  { label: "Other",
    options: [
      ...NPC_DISTINGUISHING_OTHER_COMMON,
      ...NPC_DISTINGUISHING_OTHER_UNCOMMON,
      ...NPC_DISTINGUISHING_OTHER_RARE
    ].sort((a, b) =>
      a.label.localeCompare(b.label)
    )
  }
]


export const NPC_CONNECTION_TYPE = [
    "settlement",
    "site",
    "npc",
    //"guild"
] as const;

export const NPC_CONNECTION_SETTLEMENT_ROLE = [
  { label: "Leader", value: "leader" },
  { label: "Advisor", value: "advisor" },
  { label: "Emissary", value: "emissary" },
  { label: "Diplomat", value: "diplomat" },
  { label: "Citizen", value: "citizen" },
];

export const NPC_CONNECTION_SITE_ROLE = [
  { label: "Owner", value: "owner" },
  { label: "Leader", value: "Leader" },
  { label: "Manager", value: "manager" },
  { label: "Employee / Staff", value: "employee" },
  { label: "Caretaker", value: "caretaker" },
];

// site-specific roles keyed by site type
export const NPC_CONNECTION_SITE_TYPE_ROLES: Record<string, { label: string; value: string }[]> = {
  "tavern": [
    { label: "Innkeeper", value: "innkeeper" },
    { label: "Barkeep", value: "barkeep" },
    { label: "Cook", value: "cook" },
    { label: "Server", value: "server" },
    { label: "Entertainer / Bard", value: "entertainer" },
    { label: "Regular Patron", value: "regularPatron" },
  ],

  "temple": [
    { label: "High Priest / Priestess", value: "highPriest" },
    { label: "Cleric / Acolyte", value: "acolyte" },
    { label: "Monk / Devotee", value: "devotee" },
    { label: "Pilgrim", value: "pilgrim" },
  ],

  "shop": [
    { label: "Apprentice", value: "apprentice" },
    { label: "Craftsman / Artisan", value: "artisan" },
    { label: "Customer", value: "customer" },
  ],

  "guild": [
    { label: "Guildmaster", value: "guildmaster" },
    { label: "Guild Officer", value: "officer" },
    { label: "Guild Member", value: "member" },
    { label: "Recruit", value: "recruit" },
  ],

  "government": [
    { label: "Mayor / Ruler", value: "mayor" },
    { label: "Council Member", value: "councilMember" },
    { label: "Clerk / Official", value: "clerk" },
    { label: "Guard / Watch", value: "watch" },
  ],

  "entertainment": [
    { label: "Performer", value: "performer" },
    { label: "Troupe Leader", value: "troupeLeader" },
    { label: "Stagehand / Crew", value: "crew" },
    { label: "Spectator", value: "spectator" },
  ],

  "hidden": [
    { label: "Mastermind", value: "mastermind" },
    { label: "Conspirator", value: "conspirator" },
    { label: "Cultist", value: "cultist" },
    { label: "Spy / Informant", value: "spy" },
  ],

  "residence": [
    { label: "Head of Household", value: "headOfHousehold" },
    { label: "Family Member", value: "family" },
    { label: "Servant", value: "servant" },
    { label: "Guest", value: "guest" },
  ],

  "miscellaneous": [
    { label: "Wanderer", value: "wanderer" },
    { label: "Hermit", value: "hermit" },
    { label: "Stranger", value: "stranger" },
    { label: "Caretaker / Warden", value: "warden" },
  ],
};

export const NPC_CONNECTION_NPC_ROLE = [
  { label: "General",
    options: [
      { label: "Friend", value: "friend" },
      { label: "Rival", value: "rival" },
      { label: "Enemy", value: "enemy" },
      { label: "Romantic Interest", value: "romanticInterest" },
    ]
  },
  {
    label: "Education",
    options: [
      { label: "Teacher / Mentor", value: "teacher" },  
      { label: "Student / Apprentice", value: "student" },
      { label: "Classmate", value: "classmate" }
    ]
  },
  { label: "Family", 
    options: [
      { label: "Parent", value: "parent" },
      { label: "Child", value: "child" },
      { label: "Sibling", value: "sibling" },
      { label: "Relative", value: "relative" },
      { label: "Spouse / Partner", value: "spouse" },
      { label: "Divorced / Ex-partner", value: "divorced" },
    ]
  },
  {
    label: "Work-Related",
    options: [
      { label: "Colleague / Associate", value: "colleague" },
      { label: "Employer", value: "employer" },
      { label: "Employee", value: "employee" }
    ]    
  }  
];

export const NPC_CONNECTION_GUILD_ROLE = [
  { label: "Guildmaster", value: "guildmaster" },
  { label: "Officer", value: "officer" },
  { label: "Member", value: "member" },
  { label: "Recruit", value: "recruit" },
];

export const NPC_ROLE_PAIRS: Record<string, string> = {
  parent: "child",
  child: "parent",
  teacher: "student",
  student: "teacher",
  employer: "employee",
  employee: "employer",
  colleague: "colleague",
  divorced: "divorced",
  spouse: "spouse"
};


export type NpcAge = typeof NPC_AGE[number];
export type NpcPronounSet = typeof NPC_PRONOUNS[number];
export type NpcAlignment = typeof NPC_ALIGNMENT[number];
export type NpcRace = typeof NPC_RACES[number]["value"];
export type NpcStatus = typeof NPC_STATUS[number];
export type NpcTrait = Flatten<typeof NPC_TRAITS>["value"];
export type NpcReputation = typeof NPC_REPUTATION[number];
export type NpcArchetype = Flatten<typeof NPC_ARCHETYPE>["value"];
export type NpcOccupation = Flatten<typeof NPC_OCCUPATION>["value"];
export type NpcPersuasion = Flatten<typeof NPC_PERSUASION>["value"];
export type NpcConnectionType = typeof NPC_CONNECTION_TYPE[number];
export type NpcHeight = typeof NPC_HEIGHT[number]["value"];
export type NpcBuild = typeof NPC_BUILD[number]["value"];
export type NpcHairStyles = Flatten<typeof NPC_HAIR_STYLE>["value"];