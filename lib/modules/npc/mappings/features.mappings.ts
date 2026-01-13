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
    "walks with the aid of a cane",
    "leans heavily on a carved walking staff",
    "moves with the support of a sturdy crutch",
    "moves with the help of worn crutches",
    "uses a brace to support one leg",
    "wears a rigid leg brace beneath {possessive} clothing",
    "steadies themselves with a walking frame",
    "pushes a small wheeled chair adapted for travel",

    // Sensory aids
    "wears thick-lensed spectacles",
    "uses a monocle to focus {possessive} vision",
    "relies on a finely crafted hearing trumpet",
    "wears a subtle hearing aid",
    "is guided by a white cane",
    "is guided by a trained companion animal",

    // Prosthetics
    "bears a well-crafted prosthetic hand",
    "uses a wooden prosthetic leg",
    "wears an articulated metal prosthetic",
    "bears a magically reinforced limb replacement"
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
    "bears a pair of twisted horns",
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
    "bears wings of layered feathers",
    "has feathered wings sprouting from {possessive} back",
    "has wings like those of a great bird"
  ],

  "insectoidWings": [
    "has translucent, insect-like wings",
    "bears delicate insectoid wings",
    "has shimmering wings fitted along {possessive} back",
    "has wings resembling those of a giant insect"
  ],

  "leatheryWings": [
    "has broad leathery wings",
    "bears bat-like wings",
    "has wings stretched with thin, leathery skin",
    "has wings of stretched membrane"
  ],

  "distinctiveClothing": [
    "wears distinctive clothing",
    "dresses in unusual garments",
    "wears attire that immediately draws the eye",
    "sports memorable clothing or jewelry"
  ],

  "distinctiveGait": [
    "moves with a measured, deliberate stride",
    "walks with a slight hitch in each step",
    "favors one leg when walking",
    "moves as though carefully pacing every step",
    "has a rolling, side-to-side walk",
    "walks with the confidence of someone long accustomed to being watched",
    "moves with an oddly graceful limp",
    "has a stride that seems rehearsed rather than natural",
    "walks as if always navigating uneven ground",
    "steps in a steady, almost ritual pattern"
  ],

  "distinctiveMannerisms": [
    "punctuates speech with precise, practiced gestures",
    "has a habit of tilting {possessive} head while listening",
    "taps fingers when thinking",
    "moves {possessive} hands constantly while speaking",
    "pauses mid-sentence as if choosing each word carefully",
    "adjusts {possessive} posture frequently when observed",
    "has a tendency to repeat certain phrases unconsciously",
    "uses overly formal gestures even in casual moments",
    "shifts expressions quickly, rarely settling"
  ],

  "uniqueScent": [
    "carries a faint scent of incense and old parchment",
    "smells faintly of smoke and ash",
    "is followed by the lingering scent of herbs",
    "carries the sharp tang of metal and oil",
    "smells of damp earth and rain",
    "has a faintly floral scent that seems out of place",
    "leaves behind the smell of leather and polish",
    "carries a clean, almost medicinal aroma",
    "smells faintly of salt and wind",
    "has a lingering odor"
  ],

  "unusualVoice": [
    "speaks in a low, rasping tone",
    "has a voice that sounds perpetually hoarse",
    "speaks with a soft voice that carries surprisingly far",
    "has a voice that rises and falls unpredictably",
    "speaks with a measured, almost careful cadence",
    "has a voice that seems oddly hollow",
    "speaks with a sharp, clipped delivery",
    "has a voice that lingers in the air after speaking",
    "speaks with an accent that defies easy placement",
    "carries an unsettling calm in {possessive} voice"
  ],

  "blind": [
    "is visually impaired",
    "navigates without relying on sight",
    "shows signs of visual impairment"
  ],

  "deaf": [
    "is hard of hearing",
    "responds primarily to visual cues",
    "communicates with limited reliance on sound",
    "shows signs of hearing loss"
  ],

  "mute": [
    "is unable to speak",
    "communicates without spoken words",
    "relies on gestures or signs to communicate",
    "expresses themselves without a voice"
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