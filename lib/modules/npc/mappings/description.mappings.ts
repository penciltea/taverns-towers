import { toTitleCase } from "@/lib/util/stringFormats";
import { NpcDescriptionType } from "../rules/normalize";
import { NpcBuild, NpcHeight } from "@/constants/npc.options";

export const NpcDescriptionTemplates = [
  (npc: NpcDescriptionType) =>
    `${npc.name} is ${npc.ageStartsWithVowel ? "an" : "a"} ${npc.age} ${npc.race} ${npc.archetype}, ${npc.height} and ${npc.build} in stature. ` +
    `${toTitleCase(npc.pronounNoun)} ${npc.hasOrHave} ${npc.hairColor} ${npc.hairStyle} hair and ${npc.eyeColor} eyes ${
      npc.features ? `, along with ${npc.features}` : ""
    }. Their demeanor is ${npc.traits}.
    `,

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
  "average": ["average height", "normal height", "of average height", "of typical height", "of standard height"],
  "short": ["a little shorter than average", "slightly shorter than average", "on the shorter side", "a bit short"],
  "tall": ["a little taller than average", "slightly taller than average", "on the taller side", "a bit tall"],
  "veryShort": ["much shorter than average", "rather short", "noticebly undersized", "quite short"],
  "veryTall": ["much taller than average", "rather tall", "noticebly oversized", "quite tall" , "towering in height"],
};

export const NpcBuildText: Record<NpcBuild, string[]> = {
  "athletic": [
    "athletic build",
    "fit and well-toned",
    "lean and muscular",
    "built with a trained physique"
  ],
  "average": [
    "average build",
    "unremarkable physique",
    "typical build",
    "neither slim nor heavy in frame"
  ],
  "heavyset": [
    "heavyset build",
    "solidly built",
    "broad and stout",
    "heavier frame than average"
  ],
  "obese": [
    "obese build",
    "significantly overweight",
    "broad and thick-bodied",
    "large and bulky in frame"
  ],
  "thin": [
    "thin build",
    "slender frame",
    "narrow physique",
    "light and wiry in stature"
  ],
  "veryThin": [
    "very thin build",
    "gaunt and underweight",
    "noticeably slight in frame",
    "frail-looking physique"
  ],
};