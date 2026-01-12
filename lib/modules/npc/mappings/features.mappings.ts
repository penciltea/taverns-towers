import { NpcDescriptionType } from "../rules/normalize";

export const NpcFeatureDescriptionTemplates = [
  // BOTH verb + noun
  (npc: NpcDescriptionType) => {
    if (npc.featuresVerbText && npc.featuresNounText) {
      return `Notably, ${npc.pronounNoun.toLowerCase()} ${npc.featuresVerbText}, and ${npc.hasOrHave.toLowerCase()} ${npc.featuresNounText}.`;
    }

    return "";
  },

  // Verb only
  (npc: NpcDescriptionType) => {
    if (npc.featuresVerbText) {
      return `Notably, ${npc.pronounNoun.toLowerCase()} ${npc.featuresVerbText}.`;
    }
    return "";
  },

  // Noun only
  (npc: NpcDescriptionType) => {
    if (npc.featuresNounText) {
      return `Notably, ${npc.pronounNoun.toLowerCase()} ${npc.hasOrHave.toLowerCase()} ${npc.featuresNounText}.`;
    }
    return "";
  },

  // Recognition (noun-only, optional)
  (npc: NpcDescriptionType) => {
    if (!npc.featuresNounText) return "";
    return `${npc.pronounNoun} ${npc.isOrAre} easily recognized by ${npc.featuresNounText}.`;
  }
];

export const NpcFeatureNounText: Record<string, string[]> = {
  "facialHair": [
    "a well-kept beard",
    "noticeable facial hair",
    "a thick beard",
    "neatly trimmed facial hair"
  ],

  "cleftChin": [
    "a pronounced cleft chin",
    "a deep cleft in {possessive} chin",
    "a distinct cleft in the chin",
    "a subtly cleft chin"
  ],

  "crookedNose": [
    "a crooked nose",
    "{possessive} nose bent slightly off-center",
    "a visibly crooked nose",
    "a nose that has healed poorly from a break"
  ],

  "dimples": [
    "soft dimples visible when smiling",
    "subtle dimples at the corners of {possessive} mouth",
    "a pair of faint dimples",
    "noticeable dimples that deepen when smiling",
    "dimples that briefly appear when speaking",
    "gentle dimples framing {possessive} smile",
    "a single dimple on one cheek",
    "dimples that lend warmth to {possessive} expression"
  ],

  "warPaint": [
    "{possessive} face marked with war paint",
    "ritual paint across {possessive} face",
    "painted markings across {possessive} face",
    "{possessive} face streaked with ceremonial paint"
  ],

  "piercings": [
    "several facial piercings",
    "small rings and studs set into {possessive} face",
    "a single piercing on {possessive} face",
    "piercings adorning the face",
    "metal glinting from facial piercings"
  ],

  "faceTattoos": [
    "tattoos inked across {possessive} face",
    "intricate facial tattoos",
    "a single tattoo on {possessive} face",
    "{possessive} face marked with deliberate tattooing",
    "symbols tattooed into {possessive} skin"
  ],

  "bodyPiercings": [
    "multiple body piercings",
    "metal piercings visible along {possessive} body",
    "piercings adorning the body",
    "rings and studs set into {possessive} flesh"
  ],

  "bodyWarPaint": [
    "{possessive} body marked with war paint",
    "ritual paint spread across {possessive} skin",
    "bold painted markings along {possessive} body",
    "{possessive} skin streaked with ceremonial paint"
  ],

  "bodyTattoos": [
    "{possessive} body covered in tattoos",
    "extensive body tattoos",
    "a single, large tattoo across {possessive} back",
    "a single, large tattoo across {possessive} chest",
    "a single, small tattoo hidden on {possessive} body",
    "intricate tattoo work along {possessive} skin",
    "a mixture of fresh and very faded tattoos on {possessive} body"
  ]
};

export const NpcFeatureVerbText: Record<string, string[]> = {
  "assistiveDevices": [
    // Mobility aids
    "walk with the aid of a cane",
    "lean heavily on a carved walking staff",
    "move with the support of a sturdy crutch",
    "move with the help of worn crutches",
    "use a brace to support one leg",
    "wear a rigid leg brace beneath {possessive} clothing",
    "steady themselves with a walking frame",
    "push a small wheeled chair adapted for travel",

    // Sensory aids
    "wear thick-lensed spectacles",
    "use a monocle to focus {possessive} vision",
    "rely on a finely crafted hearing trumpet",
    "wear a subtle hearing aid",
    "is guided by a white cane",
    "is guided by a trained companion animal",

    // Prosthetics
    "bear a well-crafted prosthetic hand",
    "us a wooden prosthetic leg",
    "wear an articulated metal prosthetic",
    "bear a magically reinforced limb replacement"
  ],

  "missingLimbs": [
    "is missing an arm",
    "is missing a leg",
    "has one leg amputated at the knee",
    "has one arm amputated at the elbow",
    "is missing one hand"
  ],

  "missingDigits": [
    "is missing several fingers",
    "has one finger missing a phalanx",
    "has a missing finger on one hand",
    "is missing two digits"
  ],

  "exoticFeatures": [
    "has small, curved horns atop {possessive} head",
    "has a long, flexible tail",
    "bear a pair of twisted horns",
    "has a tail that sways with {possessive} movements",
    "has short, stubby horns emerging from {possessive} skull",
    "has horns curving backward along {possessive} head",
    "has a tail tipped with a tuft of hair or scale",
    "has claws instead of fingernails",
    "has extraordinarily sharp teeth"
  ],

  "webbedDigits": [
    "has webbing between {possessive} fingers or toes",
    "has webbed fingers",
    "has subtly webbed hands or feet"
  ],

  "featheredWings": [
    "has large feathered wings",
    "bear wings of layered feathers",
    "has feathered wings sprouting from {possessive} back",
    "has wings like those of a great bird"
  ],

  "insectoidWings": [
    "has translucent, insect-like wings",
    "bear delicate insectoid wings",
    "has shimmering wings fitted along {possessive} back",
    "has wings resembling those of a giant insect"
  ],

  "leatheryWings": [
    "has broad leathery wings",
    "bear bat-like wings",
    "has wings stretched with thin, leathery skin",
    "has wings of stretched membrane"
  ],

  "distinctiveClothing": [
    "wear distinctive clothing",
    "dress in unusual garments",
    "wear attire that immediately draws the eye",
    "adorn themselves with memorable clothing or jewelry"
  ],

  "distinctiveGait": [
    "move with a measured, deliberate stride",
    "walk with a slight hitch in each step",
    "favor one leg when walking",
    "move as though carefully pacing every step",
    "has a rolling, side-to-side walk",
    "walk with the confidence of someone long accustomed to being watched",
    "move with an oddly graceful limp",
    "has a stride that seems rehearsed rather than natural",
    "walk as if always navigating uneven ground",
    "step in a steady, almost ritual pattern"
  ],

  "distinctiveMannerisms": [
    "punctuate speech with precise, practiced gestures",
    "has a habit of tilting {possessive} head while listening",
    "tap fingers when thinking",
    "move {possessive} hands constantly while speaking",
    "pause mid-sentence as if choosing each word carefully",
    "adjust {possessive} posture frequently when observed",
    "has a tendency to repeat certain phrases unconsciously",
    "use overly formal gestures even in casual moments",
    "shift expressions quickly, rarely settling"
  ],

  "uniqueScent": [
    "carry a faint scent of incense and old parchment",
    "smell faintly of smoke and ash",
    "is followed by the lingering scent of herbs",
    "carry the sharp tang of metal and oil",
    "smell of damp earth and rain",
    "has a faintly floral scent that seems out of place",
    "leave behind the smell of leather and polish",
    "carry a clean, almost medicinal aroma",
    "smell faintly of salt and wind",
    "has a lingering odor"
  ],

  "unusualVoice": [
    "speak in a low, rasping tone",
    "has a voice that sounds perpetually hoarse",
    "speak with a soft voice that carries surprisingly far",
    "has a voice that rises and falls unpredictably",
    "speak with a measured, almost careful cadence",
    "has a voice that seems oddly hollow",
    "speak with a sharp, clipped delivery",
    "has a voice that lingers in the air after speaking",
    "speak with an accent that defies easy placement",
    "carry an unsettling calm in {possessive} voice"
  ],

  "blind": [
    "is blind or visually impaired",
    "navigate without relying on sight",
    "show signs of visual impairment"
  ],

  "deaf": [
    "is hard of hearing",
    "respond primarily to visual cues",
    "communicate with limited reliance on sound",
    "show signs of hearing loss"
  ],

  "mute": [
    "is unable to speak",
    "communicate without spoken words",
    "rely on gestures or signs to communicate",
    "express themselves without a voice"
  ]
};

export const NPC_FEATURES = new Set([
    // Noun features
    "facialHair",
    "cleftChin",
    "crookedNose",
    "dimples",
    "warPaint",
    "piercings",
    "faceTattoos",
    "bodyPiercings",
    "bodyWarPaint",
    "bodyTattoos",

    // Verb features
    "assistiveDevices",
    "missingLimbs",
    "missingDigits",
    "exoticFeatures",
    "webbedDigits",
    "featheredWings",
    "insectoidWings",
    "leatheryWings",
    "distinctiveClothing",
    "distinctiveGait",
    "distinctiveMannerisms",
    "uniqueScent",
    "unusualVoice",
    "blind",
    "deaf",
    "mute"
]);