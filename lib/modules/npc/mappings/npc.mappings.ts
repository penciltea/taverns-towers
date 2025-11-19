import { NpcAge, NpcArchetype } from "@/constants/npc.options";

export const archetypeByAgeMapping: Record<NpcAge, string[]> = {
    "Child": [
        "child",
        "urchin",
        "entertainer"
    ],
    "Teenager": [
        "child",
        "urchin",
        "squire",
        "apprentice wizard",
        "entertainer",
        "ruffian",
        "artisan",
        "peasant"
    ],
    "Young Adult": [
        "squire",
        "apprentice wizard",
        "ruffian",
        "mercenary",
        "entertainer",
        "thief",
        "spy",
        "scholar",
        "inventor",
        "artisan",
        "peasant",
        "fisher",
        "laborer"
    ],
    "Adult": [
        "veteran soldier",
        "apprentice wizard",
        "occult caster",
        "cleric",
        "druid",
        "ruffian",
        "mercenary",
        "thief",
        "spy",
        "assassin",
        "aristocrat",
        "courtier",
        "official",
        "revolutionary",
        "entertainer",
        "scholar",
        "inventor",
        "hermit",
        "artisan",
        "peasant",
        "fisher",
        "laborer",
        "other"
    ],
    "Middle-aged": [
        "veteran soldier",
        "elder wizard",
        "occult caster",
        "cleric",
        "druid",
        "mercenary",
        "aristocrat",
        "courtier",
        "official",
        "revolutionary",
        "entertainer",
        "scholar",
        "inventor",
        "hermit",
        "crime boss",
        "assassin",
        "spy",
        "artisan",
        "peasant",
        "fisher",
        "laborer",
        "other"
    ],
    "Elderly": [
        "elder wizard",
        "occult caster",
        "cleric",
        "druid",
        "aristocrat",
        "courtier",
        "official",
        "scholar",
        "inventor",
        "hermit",
        "artisan",
        "peasant",
        "fisher",
        "laborer",
        "other"
    ],
    "Ageless": [
        "elder wizard",
        "occult caster",
        "cleric",
        "druid",
        "scholar",
        "inventor",
        "other"
    ]
};

export const reputationByArchetypeMapping: Record<NpcArchetype, string[]> = {
    // Magical
    "apprentice wizard": ["mysterious", "trusted", "respected"],
    "elder wizard": ["respected", "mysterious", "beloved"],
    "occult caster": ["mysterious", "feared", "notorious"],
    "cleric": ["trusted", "beloved", "respected"],
    "druid": ["mysterious", "trusted", "respected"],

    // Martial
    "veteran soldier": ["respected", "trusted", "beloved"],
    "squire": ["trusted", "respected", "annoying"],
    "ruffian": ["feared", "notorious", "infamous", "disliked"],
    "mercenary": ["respected", "notorious", "feared"],

    // Social / Political
    "aristocrat": ["respected", "beloved", "notorious"],
    "courtier": ["trusted", "respected", "mysterious"],
    "official": ["trusted", "respected", "feared"],
    "revolutionary": ["notorious", "respected", "beloved"],

    // Underworld / Intrigue
    "thief": ["infamous", "notorious", "mysterious", "disliked"],
    "spy": ["mysterious", "trusted", "feared"],
    "assassin": ["feared", "infamous", "mysterious"],
    "crime boss": ["feared", "notorious", "respected"],

    // Crafts & Trades
    "artisan": ["respected", "trusted", "mysterious"],
    "entertainer": ["beloved", "trusted", "notorious", "annoying"],
    "peasant": ["trusted", "beloved", "annoying"],
    "fisher": ["trusted", "respected", "annoying"],
    "laborer": ["respected", "trusted", "annoying"],

    // Miscellaneous
    "child": ["beloved", "trusted", "annoying"],
    "urchin": ["mysterious", "notorious", "annoying"],
    "hermit": ["mysterious", "respected", "disliked"],
    "inventor": ["respected", "mysterious"],
    "scholar": ["respected", "trusted"],
    "other": ["respected", "mysterious", "disliked"]
};

export const occupationCountByArchetype: Record<NpcArchetype, [min: number, max: number]> = {
  // Magical
  "apprentice wizard": [1, 1],
  "elder wizard": [1, 2],
  "occult caster": [1, 2],
  "cleric": [1, 1],
  "druid": [1, 1],

  // Martial
  "veteran soldier": [1, 1],
  "squire": [1, 1],
  "ruffian": [1, 1],
  "mercenary": [1, 1],

  // Social / Political
  "aristocrat": [1, 3],
  "courtier": [1, 2],
  "official": [1, 2],
  "revolutionary": [1, 2],

  // Underworld / Intrigue
  "thief": [1, 2],
  "spy": [1, 2],
  "assassin": [1, 1],
  "crime boss": [1, 2],

  // Crafts & Trades
  "artisan": [1, 2],
  "entertainer": [1, 2],
  "peasant": [1, 1],
  "fisher": [1, 1],
  "laborer": [1, 1],

  // Miscellaneous
  "child": [1, 1],
  "urchin": [1, 1],
  "hermit": [1, 1],
  "inventor": [1, 2],
  "scholar": [1, 2],
  "other": [1, 2]
};

export const occupationByArchetypeMapping: Record<NpcArchetype, string[]> = {
  // Magical
  "apprentice wizard": ["apprentice artisan", "apprentice wizard", "scribe", "student"],
  "elder wizard": ["wizard", "teacher", "advisor"],
  "occult caster": ["wizard", "healer", "herbalist", "scribe"],
  "cleric": ["priest", "healer", "teacher"],
  "druid": ["druid", "healer", "herbalist", "farmer", "hunter"],

  // Martial
  "veteran soldier": ["soldier", "guard", "military leader", "mercenary"],
  "squire": ["squire", "soldier", "apprentice artisan"],
  "ruffian": ["ruffian", "thief", "smuggler", "fence"],
  "mercenary": ["mercenary", "soldier", "guard", "military leader"],

  // Social / Political
  "aristocrat": ["aristocrat", "advisor", "official", "steward", "guildmaster"],
  "courtier": ["advisor", "official", "teacher", "scribe"],
  "official": ["official", "scribe", "steward", "advisor"],
  "revolutionary": ["advisor", "official", "ruffian", "laborer"],

  // Underworld / Intrigue
  "thief": ["thief", "smuggler", "fence", "spy"],
  "spy": ["spy", "scribe", "advisor", "thief"],
  "assassin": ["assassin", "spy", "ruffian"],
  "crime boss": ["guildmaster", "smuggler", "fence", "ruffian"],

  // Crafts & Trades
  "artisan": ["artisan", "apprentice artisan", "merchant", "scribe", "shopkeeper", "guildmaster"],
  "entertainer": ["entertainer", "tavernkeeper", "merchant"],
  "peasant": ["farmer", "fisher", "animal husbandry", "lumberjack", "miller", "laborer", "militia"],
  "fisher": ["fisher", "boatman", "sailor"],
  "laborer": ["laborer", "hunter", "lumberjack", "miller", "courier", "boatman"],

  // Miscellaneous
  "child": ["student", "beggar", "servant", "entertainer", "farmer", "animal husbandry", "thief", "apprentice artisan", "apprentice wizard", "spy", "aristocrat"],
  "urchin": ["beggar", "thief", "courier", "entertainer"],
  "hermit": ["herbalist", "healer", "hunter", "druid", "fisher", "lumberjack"],
  "inventor": ["inventor", "artisan", "teacher", "scribe", "merchant"],
  "scholar": ["teacher", "scribe", "advisor"],
  "other": ["merchant", "laborer", "healer", "entertainer"]
};


export const npcAlignmentMapping = [
    "Lawful Good",
    "Lawful Good",
    "Lawful Good",
    "Lawful Good",
    "Lawful Good",
    "Neutral Good",
    "Neutral Good",
    "Neutral Good",
    "Chaotic Good",
    "Chaotic Good",
    "Lawful Neutral",
    "Lawful Neutral",
    "Lawful Neutral",
    "True Neutral",
    "True Neutral",
    "Chaotic Neutral",
    "Chaotic Neutral",
    "Lawful Evil",
    "Neutral Evil",
    "Chaotic Evil",
    "Unaligned"
]