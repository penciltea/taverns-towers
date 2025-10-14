import { NpcAge } from "@/constants/npc.options";

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
    "ruffian"
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
    "inventor"
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
}