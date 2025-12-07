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

export const NpcLikes = {

}

export const NpcDislikes = {
    
}