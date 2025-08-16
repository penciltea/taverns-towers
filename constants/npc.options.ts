import { Flatten } from "./commonOptions";

export const NPC_TABS = ["Basics", "Connections"];

export const NPC_AGE = [
  "Child",
  "Teenager",
  "Young Adult",
  "Adult",
  "Middle-aged",
  "Elderly",
  "Ageless",
]

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
]

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
]

export const NPC_STATUS = [
  "Alive",
  "Dead",
  "Missing",
  "Unknown",
]

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
  },
  {
    label: "Reputation",
    options: [
      { label: "Feared", value: "feared" },
      { label: "Infamous", value: "infamous" },
      { label: "Mysterious", value: "mysterious" },
      { label: "Notorious", value: "notorious" },
      { label: "Respected", value: "respected" },
      { label: "Trusted", value: "trusted" },
    ]
  }
]

export const NPC_CONNECTION_TYPE = [
    "settlement",
    "site",
    "npc",
    "guild"
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
  { label: "Mentor", value: "mentor" },
  { label: "Family", value: "family" },
  { label: "Rival", value: "rival" },
];

export const NPC_CONNECTION_GUILD_ROLE = [
  { label: "Guildmaster", value: "guildmaster" },
  { label: "Officer", value: "officer" },
  { label: "Member", value: "member" },
  { label: "Recruit", value: "recruit" },
];


export type NpcAge = typeof NPC_AGE[number];
export type NpcPronounSet = typeof NPC_PRONOUNS[number];
export type NpcAlignment = typeof NPC_ALIGNMENT[number];
export type NpcRace = typeof NPC_RACES[number]["value"];
export type NpcStatus = typeof NPC_STATUS[number];
export type NpcTrait = Flatten<typeof NPC_TRAITS>["value"];
export type NpcConnectionType = typeof NPC_CONNECTION_TYPE[number];