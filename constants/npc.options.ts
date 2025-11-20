import { Flatten } from "./common.options";

export const NPC_TABS = ["Basics", "Personality", "NPC Connections", "Configuration"];

export const NPC_AGE = [
  "Child",
  "Teenager",
  "Young Adult",
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
  "Ze/Hir",
  "Other",
];

export const NPC_ALIGNMENT = [
  "Lawful Good",
  "Neutral Good",
  "Chaotic Good",
  "Lawful Neutral",
  "True Neutral",
  "Chaotic Neutral",
  "Lawful Evil",
  "Neutral Evil",
  "Chaotic Evil",
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
      { label: "Apprentice Wizard", value: "apprentice wizard" },
      { label: "Elder Wizard", value: "elder wizard" },
      { label: "Occult Caster", value: "occult caster" },
      { label: "Priest / Cleric", value: "cleric" },
      { label: "Druid / Shaman", value: "druid" }
    ]
  },
  {
    label: "Martial",
    options: [
      { label: "Veteran Soldier", value: "veteran soldier" },
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
      { label: "Animal Husbandry", value: "animal husbandry" },
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
      { label: "Apprentice Artisan", value: "apprentice artisan" },
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
      { label: "Apprentice Wizard", value: "apprentice wizard" },
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
      { label: "Military Leader", value: "military leader" },
      { label: "Militia Member", value: "militia" },
      { label: "Squire", value: "squire" },
    ]
  },
  {
    label: "Underworld / Criminal",
    options: [
      { label: "Assassin", value: "assassin" },
      { label: "Fence / Black Market Dealer", value: "fence" },
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
      { label: "Government Official", value: "official" },
      { label: "Servant / Retainer", value: "servant" },
      { label: "Steward / Chamberlain", value: "steward" },
      { label: "Student", value: "student" },
      { label: "Other", value: "other" },
    ]
  }
];

export const NPC_PERSUASION = [
  { label: "Appeal to Authority / Tradition", value: "authority" },
  { label: "Appeal to Emotion / Empathy", value: "empathy" },
  { label: "Appeal to Reason / Logic", value: "reason" },
  { label: "Bribery", value: "bribery" },
  { label: "Charm / Seduction", value: "charm" },
  { label: "Deception", value: "deception" },
  { label: "Emotional Manipulation", value: "manipulation" },
  { label: "Flattery", value: "flattery" },
  { label: "Force / Threats", value: "threats" },
  { label: "Goading", value: "goading" },
  { label: "Negotiation / Compromise", value: "negotiation" },
  { label: "None (Stubborn)", value: "none" },
];

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
  { label: "Friend", value: "friend" },
  { label: "Enemy", value: "enemy" },
  { label: "Teacher / Mentor", value: "teacher" },  
  { label: "Student / Apprentice", value: "student" },
  { label: "Parent", value: "parent" },
  { label: "Child", value: "child" },
  { label: "Sibling", value: "sibling" },
  { label: "Family", value: "family" },
  { label: "Rival", value: "rival" },
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
  student: "teacher"
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