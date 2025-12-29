import { NpcArchetype, NpcAlignment } from "@/constants/npc.options";

export const persuasionByArchetypeMapping: Record<NpcArchetype, string[]> = {
  // Magical & Religious
  "apprentice wizard": ["reason", "empathy"],
  "elder wizard": ["reason", "empathy"],
  "occult caster": ["manipulation", "reason"],
  "cleric": ["empathy", "authority", "reason"],
  "druid": ["empathy", "reason"],

  // Martial
  "veteran soldier": ["threats", "reason", "negotiation"],
  "squire": ["threats", "reason"],
  "ruffian": ["threats", "goading", "bribery"],
  "mercenary": ["bribery", "threats"],

  // Social / Political
  "aristocrat": ["flattery", "charm", "negotiation"],
  "courtier": ["flattery", "charm", "negotiation"],
  "official": ["negotiation", "reason", "authority"],
  "revolutionary": ["goading", "reason", "empathy"],

  // Underworld / Criminal
  "thief": ["deception", "manipulation", "bribery"],
  "spy": ["deception", "manipulation", "reason"],
  "assassin": ["threats", "deception"],
  "crime boss": ["threats", "bribery", "manipulation"],

  // Crafts & Trades
  "artisan": ["reason", "negotiation"],
  "entertainer": ["flattery", "charm", "empathy"],
  "peasant": ["reason", "empathy"],
  "fisher": ["reason", "empathy"],
  "laborer": ["reason", "threats"],

  // Miscellaneous
  "child": ["none", "flattery", "goading"],
  "urchin": ["deception", "flattery", "goading"],
  "hermit": ["none", "reason"],
  "inventor": ["reason", "empathy"],
  "scholar": ["reason", "empathy"],
  "other": ["reason", "empathy"]
};

export const persuasionByAlignmentMapping: Record<NpcAlignment, string[]> = {
    "Lawful Good": ["empathy", "reason", "negotiation", "authority"],
    "Neutral Good": ["negotiation", "empathy", "reason"],
    "Chaotic Good": ["empathy", "negotiation", "charm", "manipulation", "flattery"],

    "Lawful Neutral": ["authority", "reason", "negotiation"],
    "True Neutral": ["none", "reason", "negotiation", "goading"],
    "Chaotic Neutral": ["empathy", "deception", "flattery", "negotiation", "goading"],
    
    "Lawful Evil": ["authority", "negotiation", "reason", "manipulation"],
    "Neutral Evil": ["manipulation", "deception", "trheats", "bribery", "goading"],
    "Chaotic Evil": ["manipulation", "deception", "threats", "bribery", "goading" ]
};

export const persuasionByTraitsMapping: Record<string, string[]> = {
  // Personality
  "charming": ["flattery", "charm"],
  "witty": ["flattery", "reason"],
  "grumpy": ["threats", "goading", "none"],
  "polite": ["empathy", "negotiation"],
  "stoic": ["reason", "none"],
  "friendly": ["empathy", "reason"],
  "wise": ["reason", "empathy"],
  "naive": ["empathy", "none"],
  "curious": ["reason", "manipulation"],

  // Flaws
  "arrogant": ["threats", "goading"],
  "cowardly": ["bribery", "manipulation"],
  "deceitful": ["deception", "manipulation"],
  "greedy": ["bribery", "flattery"],
  "impulsive": ["threats", "goading"],
  "manipulative": ["manipulation", "deception"],
  "reckless": ["threats", "goading"],

  // Ambition & Drive
  "ambitious": ["bribery", "negotiation"],
  "cunning": ["deception", "manipulation"],
  "scheming": ["deception", "manipulation"],
  "rebellious": ["goading", "threats"],
  "obsessive": ["reason", "manipulation"]
};

export const NpcCommonLikes = [
  "sharing meals", "cooking", "trying new cuisines", "gourmet dishes", "baking", "spicy foods", "sweets", "alcoholic drinks", "coffee", "tea", "fresh fruit",
  "the smell of fresh bread", "the smell of rain", "the smell of a fireplace", "fresh flowers", "the ocean breeze",
  "playing instruments", "singing", "dancing", "attending performances", "writing music",
  "telling tales", "listening to stories", "reading books", "writing stories", "poetry",
  "hiking", "gardening", "bird watching", "camping", "fishing", "spending time outdoors",
  "painting", "sculpting", "dabbling in new hobbies", "crafting", "drawing",
  "board games", "card games", 
  "cats", "dogs", "horses", "exotic pets", "wildlife",
  "studying history", "visiting historical sites", "collecting antiques",
  "exploring new places", "meeting new people", "adventuring", "learning about cultures",
  "studying new subjects", "attending lectures", "reading scholarly works",
  "cozy firesides", "warm blankets", "comfortable furniture", "quiet spaces", "taking warm baths",
];

export const NpcUncommonLikes = [
  "carving wood animals", "tailoring", "jewelry making",
  "taking a nap in sunlight", "cloud watching", "stargazing", "moonlit walks",
  "wearing perfume or cologne", "dressing fashionably", "collecting hats", "designing clothing",
  "debating philosophical ideas", "reading philosophical texts", "writing philosophical texts", "engaging in debates",
  "meditation", "prayer", "attending religious services", "studying sacred texts",
  "strategy games", "gambling", "puzzles", "drinking games",
  "inventing", "tinkering", "studying new technologies", "building gadgets",
  "collecting oddly-shaped rocks", "collecting feathers, buttons, or other trinkets", "talking to plants", "memorizing unusual facts", "walking in the rain without an umbrella", "splashing in puddles",
  "reading tea leaves", "studying astrology", "practicing divination", "exploring haunted places",
  "being the center of attention", "public speaking", "large social gatherings",
];

export const NpcCommonDislikes = [
  "spicy foods", "sweets", "coffee", "tea", "beer or ale", "wine", "fish or seafood", 
  "loud noises", "crowded places",
  "spiders", "snakes", "bugs", "insects",
  "scratchy fabrics", "tight clothing", "damp clothes", "wet socks",
  "being interrupted", "rudeness", "dishonesty", "cheating",
  "waiting in long lines", "being late",
  "cold weather", "hot weather", "being wet",
  "drunken brawlers",
];

export const NpcUncommonDislikes = [
  "rough textures", "the sound of quills on parchment", "overly repetitive noises", "the smell of smoke", "the taste of magically-purified water", "strong perfumes or colognes", "cilantro",
  "cats", "dogs",
  "the color orange", "the color yellow", 
  "being the center of attention", "public speaking", "large social gatherings", "being ignored",
  "dirty environment", "untidiness", 
  "heights", "dark or enclosed spaces", "feeling worthless",
  "bad weather on travel days", "early mornings", 
  "sitting facing away from the door", "gossipers",
]