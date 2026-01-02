import { toTitleCase } from "@/lib/util/stringFormats";
import { NpcDescriptionType } from "../rules/normalize";
import { NpcBuild, NpcHeight } from "@/constants/npc.options";

export const NpcDescriptionTemplates = [
  (npc: NpcDescriptionType) =>
    `${npc.name} is ${npc.ageStartsWithVowel ? "an" : "a"} ${npc.age} ${npc.race}, who is ${npc.height} and ${npc.build}. ` +
    `${npc.hairDescription}`
  /*
  (npc: NpcDescriptionType) =>
    `At first glance, ${npc.name} appears ${npc.traits}, with ${npc.eyeColor} eyes, and so on.
    `,

  (npc: NpcDescriptionType) =>
    `${npc.name}: a ${npc.age} ${npc.race} ${npc.archetype}, ${npc.height}, ${npc.build}, ` +
    `${npc.hairColor} ${npc.hairStyle} hair, ${npc.eyeColor} eyes.
    `,
  */
];

export const NpcHeightText: Record<NpcHeight, string[]> = {
  "average": [
    "of average height", 
    "of normal height", 
    "of average height", 
    "of typical height", 
    "of standard height"
  ],
  "short": [
    "a little shorter than average", 
    "slightly shorter than average", 
    "on the shorter side", 
    "a bit short in height"
  ],
  "tall": [
    "a little taller than average", 
    "slightly taller than average", 
    "on the taller side", 
    "a bit tall"
  ],
  "veryShort": [
    "much shorter than average", 
    "rather short", 
    "noticeably undersized", 
    "quite short"
  ],
  "veryTall": [
    "much taller than average", 
    "rather tall", 
    "noticeably oversized", 
    "quite tall" , 
    "towering in height"
  ],
};

export const NpcBuildText: Record<NpcBuild, string[]> = {
  "athletic": [
    "has an athletic build",
    "with a fit and well-toned physique",
    "has a lean and muscular stature",
    "with a built, trained physique"
  ],
  "average": [
    "with an average build",
    "has an unremarkable physique",
    "has a typical build",
    "is neither slim nor heavy in frame"
  ],
  "heavyset": [
    "with a heavyset build",
    "is solidly built",
    "is broad and stout in frame",
    "has a heavier-than-average physique"
  ],
  "obese": [
    "has an obese build",
    "is significantly overweight in stature",
    "has a broad and thick-bodied build",
    "is large and bulky in frame"
  ],
  "thin": [
    "has a thin build",
    "with a slender frame",
    "with a narrow physique",
    "is light and wiry in stature"
  ],
  "veryThin": [
    "with a very thin build",
    "is gaunt and underweight in physique",
    "noticeably slight in frame",
    "has a frail-looking physique"
  ],
};

