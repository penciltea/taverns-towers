import { NpcDescriptionType } from "../rules/normalize";

export const NpcSkinToneDescriptionTemplates = [
    (npc: NpcDescriptionType) => {
        // ToDo: Add checks for albanism, vitiligo, and other unique skin descriptions
        return `${npc.pronounNoun} ${npc.hasOrHave.toLowerCase()} ${npc.skinToneText} skin.`
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
        "light fair",
        "soft fair",
        "pale with warm undertones",
        "porcelain-toned"
    ],
    "lightOlive": [
        "light olive",
        "soft olive-toned",
        "slightly greenish tan",
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
        "warm olive",
        "medium olive"
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

export const npcSkinToneSpecialText: Record<string, string[]> ={
    "albinism": [

    ],
    "birthmarks": [

    ],
    "bodyBirthmarks": [

    ],
    "bodyMoles": [

    ],
    "bodyScars": [

    ],
    "burnScars": [

    ],
    "burnScarsOnFace": [

    ],
    "freckles": [

    ],
    "glowingSkin": [
    
    ],
    "moles": [
        
    ],
    "scars": [

    ],
    "unusualSkinTexture": [

    ],
    "vitiligo": [

    ],
};