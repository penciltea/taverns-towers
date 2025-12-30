import { toTitleCase } from "@/lib/util/stringFormats";
import { NpcDescriptionType } from "../rules/normalize";
import { NpcHeight } from "@/constants/npc.options";

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
  "average": ["average height", "normal height"],
  "short": ["a little shorter than average", "slightly shorter than average"],
  "tall": ["a little taller than average", "slightly taller than average"],
  "veryShort": ["much shorter than average", "rather short"],
  "veryTall": ["much taller than average", "rather tall"],
};