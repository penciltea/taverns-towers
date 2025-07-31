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
  "Aasimar",
  "Celestial",
  "Construct",
  "Dragonborn",
  "Dwarf",
  "Elf",
  "Fiend",
  "Genasi",
  "Gnome",
  "Goblin",
  "Half-Elf",
  "Half-Orc",
  "Halfling",
  "Human",
  "Kenku",
  "Orc",
  "Tabaxi",
  "Tiefling",
  "Undead",
]

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
    "npc"
] as const;



export type NpcAge = (typeof NPC_AGE)[number];
export type NpcPronounSet = (typeof NPC_PRONOUNS)[number];
export type NpcAlignment = (typeof NPC_ALIGNMENT)[number];
export type NpcRace = (typeof NPC_RACES)[number];
export type NpcStatus = (typeof NPC_STATUS)[number];
export type NpcTrait = Flatten<typeof NPC_TRAITS>["value"];
export type NpcConenctionType = (typeof NPC_CONNECTION_TYPE)[number];