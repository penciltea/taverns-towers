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