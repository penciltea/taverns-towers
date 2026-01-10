import { NpcDescriptionType } from "../rules/normalize";

export const NpcEyeDescriptionTemplates = [
    (npc: NpcDescriptionType) => {
        const specialText = npc.specialEyeText
        ? `, ${npc.specialEyeText}`
        : "";

        return `${npc.pronounNoun} ${npc.hasOrHave.toLowerCase()} ${npc.eyeColorText} eyes${specialText}.`;
    }
];

export const NpcEyeColorText: Record<string, string[]> = {
    // Human / realistic eye colors
    "black": [
        "deep black",
        "ink-dark",
        "black, dark as night",
        "glossy black"
    ],

    "blue": [
        "clear blue",
        "soft blue",
        "cool blue",
        "pale blue"
    ],

    "darkBrown": [
        "deep brown",
        "dark chocolate brown",
        "rich brown",
        "nearly black, brown"
    ],

    "gray": [
        "cool gray",
        "steel gray",
        "pale gray",
        "stormy gray"
    ],

    "green": [
        "soft green",
        "leaf green",
        "deep green",
        "mossy green",
        "jade green"
    ],

    "hazel": [
        "warm hazel",
        "gold-flecked hazel",
        "green-brown hazel",
        "soft hazel"
    ],

    "lightBrown": [
        "light brown",
        "amber brown",
        "warm brown",
        "honey brown"
    ],

    // Fantasy colors
    "amethyst": [
        "amethyst-hued",
        "bright, gemstone-like purple",
        "violet-toned",
        "deep amethyst"
    ],

    "aqua": [
        "aqua blue",
        "seafoam-colored",
        "clear turquoise",
        "watery blue-green"
    ],

    "bloodRed": [
        "blood red",
        "dark crimson",
        "deep scarlet",
        "wine-dark red"
    ],

    "bronze": [
        "bronze-toned",
        "burnished bronze",
        "warm metallic brown",
        "gold-brown bronze"
    ],

    "cobalt": [
        "cobalt blue",
        "brilliant blue",
        "deep cobalt",
        "electric blue"
    ],

    "copper": [
        "copper-toned",
        "reddish bronze",
        "warm, metallic copper",
        "burnished copper"
    ],

    "crimson": [
        "crimson red",
        "deep ruby red",
        "dark scarlet",
        "rich crimson"
    ],

    "emerald": [
        "emerald green",
        "jewel-bright green",
        "deep emerald",
        "vivid green"
    ],

    "gold": [
        "golden",
        "molten gold",
        "sunlit gold",
        "bright amber gold"
    ],

    "indigo": [
        "indigo-toned",
        "deep blue-violet",
        "dark indigo",
        "shadowed indigo"
    ],

    "lavender": [
        "soft lavender",
        "pale purple",
        "lavender-hued",
        "misty violet"
    ],

    "magenta": [
        "magenta-toned",
        "deep pink-purple",
        "vivid magenta",
        "fuchsia-hued"
    ],

    "opal": [
        "opaline",
        "iridescent opal",
        "milky and shimmering",
        "opal-bright"
    ],

    "peridot": [
        "peridot green",
        "yellow-green",
        "bright chartreuse",
        "jewel-toned green"
    ],

    "pink": [
        "soft pink",
        "pale rose",
        "blush-colored",
        "light pink"
    ],

    "ruby": [
        "ruby red",
        "jewel-bright red",
        "deep ruby",
        "crystal-clear crimson"
    ],

    "sapphire": [
        "sapphire blue",
        "deep ocean-blue",
        "rich blue gemstone-toned",
        "dark sapphire"
    ],

    "teal": [
        "teal",
        "blue-green",
        "deep teal",
        "green-tinged blue"
    ],

    "topaz": [
        "topaz gold",
        "warm yellow-gold",
        "honey-colored",
        "sunstone-bright"
    ],

    "violet": [
        "violet-toned",
        "deep purple",
        "dark lavender",
        "royal violet"
    ],

    "vibrantBlue": [
        "brilliant blue",
        "intensely vivid blue",
        "bright azure",
        "electric blue"
    ],

    "vibrantGreen": [
        "brilliant green",
        "intensely vivid green",
        "bright neon green",
        "luminous green"
    ],

    "vibrantPink": [
        "vivid pink",
        "bright rose",
        "neon pink",
        "hot pink"
    ],

    "vibrantPurple": [
        "vivid purple",
        "bright violet",
        "electric purple",
        "luminous purple"
    ],

    "vibrantRed": [
        "vivid red",
        "bright scarlet",
        "intensely red",
        "fiery crimson"
    ],

    "vibrantYellow": [
        "vivid yellow",
        "bright golden yellow",
        "glowing yellow"
    ]
};

export const NpcEyeSpecialText: Record<string, string[]> = {
    "blind": [
        "with a gaze unfocused and unseeing",
        "with eyes that do not track movement",
        "showing no sign of visual awareness",
        "clouded by blindness"
    ],

    "cataracts": [
        "with eyes clouded by cataracts",
        "one eye clouded by a cataract",
        "are milky and opaque",
        "with a pale haze obscuring the eyes",
        "with a pale haze obscuring one eye",
        "showing signs of severe clouding"
    ],

    "crossEyed": [
        "with eyes that slightly cross",
        "a subtly misaligned gaze",
        "with a noticeable cross-eyed focus",
    ],

    "heterochromia": [
        "each eye a different color",
        "one eye a different color than the other"
    ],

    "glowingEyes": [
        "faintly glowing",
        "emitting a soft light",
        "with a gaze lit by an unnatural glow",
        "which gleam in low light"
    ],

    "missingEyes": [
        "with one eye missing",
        "bearing the absence of an eye",
        "with an empty eye socket",
        "and, notably, one eye missing"
    ],

    "scarredEyes": [
        "with scars around one eye",
        "one eye marked by old scars",
        "bearing scars that mar an eye",
        "with visible scarring near the eyes"
    ],

    "unusualPupils": [
        "with unusually shaped pupils",
        "their pupils narrow and unnatural",
        "bearing slit-shaped pupils",
        "with pupils unlike those of most folk"
    ]
};