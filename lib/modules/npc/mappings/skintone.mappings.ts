import { NpcDescriptionType } from "../rules/normalize";

export const NpcSkinToneDescriptionTemplates = [
    (npc: NpcDescriptionType) => {
        const specialText = npc.specialSkinText
        ? `, ${npc.specialSkinText}`
        : "";

        return `${npc.pronounNoun} ${npc.hasOrHave.toLowerCase()} ${npc.skinToneText} {surface}${specialText}.`;
    }
];



export const NpcSkinToneText: Record<string, string[]> = {
    // Human skin tones
    "brown": [
        "warm brown",
        "rich brown",
        "medium brown",
        "earthy brown"
    ],
    "darkBrown": [
        "deep brown",
        "dark cocoa brown",
        "chocolate-toned",
        "rich dark brown"
    ],
    "deepTan": [
        "sun-kissed deep tan",
        "warm tan",
        "golden brown",
        "tanned"
    ],
    "ebony": [
        "deep ebony",
        "dark ebony",
        "jet brown",
        "intensely dark brown"
    ],
    "fair": [
        "light, fair",
        "soft, fair",
        "warm, pale",
        "porcelain-toned"
    ],
    "lightOlive": [
        "light olive",
        "soft olive-toned",
        "faintly greenish tan",
        "warm olive"
    ],
    "medium": [
        "medium-toned",
        "balanced medium",
        "neutral brown",
        "evenly tan"
    ],
    "olive": [
        "olive-toned",
        "greenish tan",
        "warm, olive",
        "medium olive, tanned"
    ],
    "pale": [
        "pale",
        "delicate pale",
        "light ivory",
        "fair pale"
    ],
    "tan": [
        "golden tan",
        "sun-kissed tan",
        "warm tan",
        "medium tan"
    ],
    "veryPale": [
        "very pale",
        "almost translucent",
        "ghostly pale",
        "extremely fair"
    ],

    // Fantasy skin tones
    "amethyst": [
        "purple-toned",
        "lavender-hued",
        "amethyst-colored",
        "violet-tinged"
    ],
    "ashenGray": [
        "ashen gray",
        "stone-colored",
        "smoky gray",
        "pale gray"
    ],
    "azure": [
        "sky-blue",
        "azure-toned",
        "soft blue",
        "cerulean-hued"
    ],
    "bronze": [
        "bronze-toned",
        "metallic bronze",
        "warm bronze",
        "coppery"
    ],
    "brass": [
        "brass-toned",
        "golden-brass",
        "warm metallic",
        "shiny brass"
    ],
    "charcoalBlack": [
        "charcoal black",
        "deep ashen black",
        "dark gray-black",
        "inky charcoal"
    ],
    "cobalt": [
        "cobalt-blue",
        "deep blue-toned",
        "bright cobalt",
        "metallic blue"
    ],
    "crimson": [
        "crimson-red",
        "deep red-toned",
        "blood-colored",
        "ruby-red"
    ],
    "clayRed": [
        "clay-red",
        "earthy red",
        "burnt sienna",
        "terracotta"
    ],
    "emerald": [
        "emerald green",
        "vivid green",
        "forest green",
        "rich green"
    ],
    "gold": [
        "golden",
        "metallic gold",
        "sunlit gold",
        "warm gold-toned"
    ],
    "indigo": [
        "indigo-toned",
        "deep indigo",
        "blue-purple hued",
        "dark indigo"
    ],
    "iceBlue": [
        "icy blue",
        "frosty pale",
        "pale blue",
        "frozen-toned"
    ],
    "jetBlack": [
        "jet black",
        "inky black",
        "deep obsidian",
        "midnight black"
    ],
    "lavender": [
        "soft lavender",
        "light purple",
        "lavender-hued",
        "pale violet"
    ],
    "magenta": [
        "magenta-toned",
        "vivid pink-purple",
        "deep magenta",
        "fuchsia-tinged"
    ],
    "midnightBlue": [
        "midnight blue",
        "dark navy",
        "deep blue",
        "shadowy blue"
    ],
    "mossGreen": [
        "moss green",
        "forest-hued",
        "deep moss",
        "earthy green"
    ],
    "oliveGreen": [
        "olive green",
        "warm olive",
        "earthy green",
        "muted green"
    ],
    "pearlWhite": [
        "pearly white",
        "soft ivory",
        "glimmering white",
        "pale pearl"
    ],
    "rose": [
        "rosy",
        "pink-toned",
        "warm rose",
        "soft blush"
    ],
    "rubyRed": [
        "ruby-red",
        "deep crimson",
        "jewel-toned red",
        "vivid ruby"
    ],
    "sandyTan": [
        "sandy tan",
        "beige-toned",
        "light tan",
        "warm sand-colored"
    ],
    "silver": [
        "silver-toned",
        "metallic silver",
        "shimmering gray",
        "pale silver"
    ],
    "slate": [
        "slate-gray",
        "cool gray",
        "smoky slate",
        "medium gray"
    ],
    "stoneGray": [
        "stone gray",
        "rock-toned",
        "pale gray",
        "weathered gray"
    ],
    "terracotta": [
        "terracotta",
        "warm clay-toned",
        "reddish-brown",
        "earthy terracotta"
    ],
    "teal": [
        "teal-toned",
        "blue-green",
        "deep teal",
        "greenish blue"
    ],
    "violet": [
        "violet-toned",
        "soft violet",
        "purple-hued",
        "lavender-purple"
    ],
    "verdigris": [
        "verdigris green",
        "weathered copper-toned",
        "blue-green patina",
        "muted turquoise"
    ]
};


/**
 * A set of options from Distinguishing Features (npc.features) for determining if the "special skin" rules should apply
 */

export const NPC_SKIN_FEATURE_KEYS = new Set<string>([
  "albinism",
  "vitiligo",
  "freckles",
  "birthmarks",
  "bodyBirthmarks",
  "moles",
  "bodyMoles",
  "scars",
  "bodyScars",
  "burnScars",
  "burnScarsOnFace",
  "unusualSkinTexture",
  "glowingSkin"
]);

export const NpcSkinToneSpecialText: Record<string, string[]> ={
    "albinism": [
        "lacking natural pigmentation",
        "showing a complete absence of visible pigment"
    ],

    "birthmarks": [
        "marked by a visible birthmark on the face",
        "with a distinctive birthmark upon the face",
        "bearing a noticeable facial birthmark",
        "with a faint birthmark across one cheek",
        "with a small birthmark on the neck",
        "bearing a small birthmark on the jaw",
    ],

    "bodyBirthmarks": [
        "marked by a couple of birthmarks across the body",
        "with distinctive birthmarks along the {surface}",
        "bearing birthmarks visible on their {surface}",
        "with faint birthmarks scattered across the body",
        "bearing a birthmark across one shoulder",
        "bearing a small birthmark on the chest"
    ],

    "bodyMoles": [
        "dotted with small moles across the {surface}",
        "with several noticeable moles",
        "marked by clusters of dark moles",
        "with a scattering of moles along the body",
        "bearing a mole on one thigh",
        "bearing a small mole on the back"
    ],

    "bodyScars": [
        "marked by old scars along the body",
        "bearing scars that hint at past hardships",
        "with visible scars etched into the {surface}",
        "showing the marks of healed wounds",
        "marked by one large scar across the back",
        "bearing a scar on one arm",
        "with a scar running across the abdomen",
        "bearing a scar that runs down one leg"  
    ],

    "burnScars": [
        "marked by severe burn scars",
        "with areas of {surface} altered by old burns",
        "bearing the lasting scars of fire or heat",
        "with burn scars tracing parts of the body",
        "with a small, faded burn on the back of a hand",
        "bearing a faded burn scar across the shoulder and chest",
    ],

    "burnScarsOnFace": [
        "with burn scars marring the face",
        "bearing old burn scars across the face",
        "with facial {surface} marked by past burns",
        "showing signs of healed burn damage on the face"
    ],

    "freckles": [
        "dusted with freckles",
        "peppered with light freckles",
        "marked by a spray of freckles",
        "freckled across the skin",
        "littered with freckles across the body",
        "with freckles dotting the face like stars",
        "marked by a few freckles across the cheeks and nose"
    ],

    "glowingSkin": [
        "that emits a faint, unnatural glow",
        "with a subtle luminescence beneath the surface",
        "that softly glows in low light",
        "with {surface} that seems to shimmer faintly"
    ],

    "moles": [
        "marked by a mole on one cheek",
        "with a prominent facial mole",
        "bearing several small moles on the face",
        "with a noticeable mole on the forehead"
    ],

    "scars": [
        "marked by scars across the face",
        "bearing facial scars from past injuries",
        "with an old scar tracing the face",
        "showing the mark of a healed facial wound"
    ],

    "unusualSkinTexture": [
        "with skin of an unusual texture",
        "marked by an uncommon skin texture",
        "with skin that feels oddly textured",
        "bearing an unusual surface to the skin",       
        "thickened patches on the hands and elbows",
        "with an uneven, slightly pitted texture",
        "lightly cracked from dryness",
        "weathered from the sun and wind"
    ],

    "vitiligo": [
        "mottled by pale patches",
        "marked by irregular patches of lighter pigmentation",
        "with areas of {surface} noticeably lighter than the rest",
        "showing distinctive patterns of depigmentation",

    ]
};

export const PIGMENT_FEATURES = new Set([
    "albinism",
    "vitiligo"
]);

export const SKIN_SURFACE_FEATURES = new Set([
    "freckles",
    "birthmarks",
    "bodyBirthmarks",
    "moles",
    "bodyMoles",
    "scars",
    "bodyScars",
    "burnScars",
    "burnScarsOnFace",
    "unusualSkinTexture"
]);

export const UNIVERSAL_SURFACE_FEATURES = new Set([
    "glowingSkin"
]);