import { TagTypes } from "@/constants/environmentOptions";
import { MagicLevel } from "@/constants/settlementOptions";
import { SiteSize, SiteCondition } from "@/constants/site/site.options";

export const ENTERTAINMENT_COUNT_BY_SITE_CONDITION: Record<SiteCondition, [number, number]> = {
  squalid: [1, 1],
  poor: [1, 1],
  average: [2, 3],
  wealthy: [2, 4],
  aristocratic: [3, 4]
};

export const EntertainmentBySiteSizeMapping: Record<SiteSize, string[]> = {
  tiny: [
    "Card Games",
    "Dice Games",
    "Drinking Contests"
  ],
  small: [
    "Card Games",
    "Dice Games",
    "Drinking Contests",
    "Local Talent Nights",
    "Arm Wrestling Contests"
  ],
  modest: [
    "Bardic Performances",
    "Singing Contests",
    "Comedic Acts / Stand-up",
    "Storytelling Circles",
    "Poetry Readings"
  ],
  large: [
    "Dancing (Patron Participation)",
    "Fire Breathers / Jugglers",
    "Fortune Telling",
    "Live Theater Skits",
    "Bardic Performances"
  ],
  grand: [
    "Professional Dance Shows",
    "Magicians / Illusionists",
    "Gambling Tables (House-Run)",
    "Animal Acts / Trained Pet Shows",
    "Comedic Acts / Stand-up",
    "Tavern Quizzes / Trivia Nights"
  ],
  sprawling: [
    "Professional Dance Shows",
    "Gambing Tables (House-Run)",
    "Animal Acts / Trained Pet Shows",
    "Interactive Mysteries / Riddles",
    "Fortune Telling",
    "Tavern Quizzes / Trivia Nights",
    "Underground Betting Rings"
  ]
};


export const EntertainmentBySiteConditionMapping: Record<SiteCondition, string[]> = {
  squalid: ["Pit Fighting / Brawling Matches", "Drunken Darts / Knife Throwing"],
  poor: ["Card Games", "Arm Wrestling Contests", "Dice Games"],
  average: ["Storytelling Circles", "Singing Contests", "Tavern Quizzes / Trivia Nights", "Tavern Quizzes / Trivia Nights"],
  wealthy: ["Magicians / Illusionists", "Enchanted Instrument Performances", "Cultural Dance Exhibitions"],
  aristocratic: ["Arcane Light Shows", "Charmed Object Shows", "Seance / Ghost Story Night"],
};



export const EntertainmentByTagMapping: Record<TagTypes, string[]> = {
  "Capital": ["Live Theater Skits", "Professional Dance Shows", "Arcane Light Shows"],
  "Criminal Hideout": ["Underground Betting Rings", "Pit Fighting / Brawling Matches"],
  "Druidic": ["Animal Acts / Trained Pet Shows", "Cultural Dance Exhibitions"],
  "Arcane Nexus": ["Arcane Puppet Theater", "Enchanted Instrument Performances"],
  "Fishing": ["Drunken Darts / Knife Throwing", "Singing Contests"],
  "Trade Hub": ["Gambling Tables (House-Run)", "Comedic Acts / Stand-up"],
  "Sacred Site": ["Poetry Readings", "Rune-Casting / Divination Games", "Fortune Telling", "Seance / Ghost Story Night"],
  "Hidden": ["Interactive Mysteries / Riddles", "Card Games", "Dice Games"],
};


export const EntertainmentByMagicLevelMapping: Record<MagicLevel, string[]> = {
  None: [
    "Dice Games",
    "Card Games",
    "Drinking Contests",
    "Pit Fighting / Brawling Matches",
    "Local Talent Nights",
    "Dancing (Patron Participation)"
  ],
  Low: [
    "Fortune Telling",
    "Fire Breathers / Jugglers",
    "Comedic Acts / Stand-up",
    "Local Talent Nights"
  ],
  Moderate: [
    "Charmed Object Shows (Talking Skulls, Singing Spoons)",
    "Magicians / Illusionists",
    "Enchanted Instrument Performances",
    "Rune-Casting / Divination Games",
    "Fortune Telling"
  ],
  High: [
    "Magicians / Illusionists",
    "Enchanted Instrument Performances",
    "Arcane Light Shows",
    "Arcane Puppet Theater",
    "Charmed Object Shows (Talking Skulls, Singing Spoons)",
    "Seance / Ghost Story Night"
  ],
  Mythic: [
    "Magicians / Illusionists",
    "Enchanted Instrument Performances",
    "Arcane Light Shows",
    "Arcane Puppet Theater",
    "Charmed Object Shows (Talking Skulls, Singing Spoons)",
    "Seance / Ghost Story Night"
  ]
};