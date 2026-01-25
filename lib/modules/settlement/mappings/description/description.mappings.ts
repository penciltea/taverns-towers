import { SizeTypes } from "@/constants/settlement.options";
import { SettlementDescriptionType } from "../../rules/normalize";
import { TerrainTypes } from "@/constants/environment.options";

export const SettlementDescriptionTemplates = [
    (settlement: SettlementDescriptionType) => 
        `This ${settlement.sizeDescription} ${settlement.verbText} the ${settlement.terrainText}.`
]

export const SettlementSizeText: Record<SizeTypes, string[]> = {
    "City": [
        "sprawling city",
        "densely packed city",
        "broad cityscape",
        "bustling urban center"
    ],
    "Encampment": [
        "scattered encampment",
        "temporary cluster of shelters",
        "series of tents and wagons"
    ],
    "Hamlet": [
        "small hamlet",
        "handful of homes and buildings",
        "small roadside hamlet",
        "scattered cluster of cottages"
    ],
    "Metropolis": [
        "thriving metropolis", 
        "sea of districts",
        "immense urban sprawl",
        "expansive cityscape"
    ],
    "Town": [
        "growing town",
        "up and coming town",
        "small town",
        "well-traveled town"
    ],
    "Village": [
        "village of simple homes and buildings",
        "quiet collection of cottages",
        "modest village"
    ]
};

export const GeneralSettlementVerb = [
    "sits",
    "rests",
    "lies",
    "stands",
    "rises"
];

export const SmallSettlementVerb = [
    "huddles",
    "nestles",
    "tucks"
]

export const LargeSettlementVerb = [
    "towers",
    "looms",
    "stands",
    "spreads",
    "stretches",
    "cascades",
];

export const VerbPairings: Record<string, string[]> = {
   // -------------------------
  // General Settlement Verbs
  // -------------------------
  "sits": ["beneath", "beside", "near", "at the edge of", "within"],
  "rests": ["beneath", "beside", "within", "near"],
  "lies": ["beneath", "along", "within", "near"],
  "stands": ["within", "near", "at the heart of", "above"],
  "rises": ["above", "from", "within", "overlooking"],

  // -------------------------
  // Small Settlement Verbs
  // -------------------------
  "huddles": ["beneath", "against", "near", "along"],
  "nestles": ["beneath", "among", "within", "beside"],
  "tucks": ["into", "beneath", "among"],

  // -------------------------
  // Large Settlement Verbs
  // -------------------------
  "towers": ["above", "over", "beyond"],
  "looms": ["over", "above", "beyond"],
  "spreads": ["across", "over", "along", "between"],
  "stretches": ["across", "along", "between", "over"],
  "cascades": ["down", "across", "from"],
};

export const SettlementTerrainText: Record<TerrainTypes, string[]> = {
    "Coast": [
        "open shoreline",
        "rugged coastal cliffs",
        "salt-worn sands",
        "crashing waves and rocky shores",
        "harbor waters",
    ],

    "Desert": [
        "rolling dunes",
        "shifting sands of the open desert",
        "arid plains of dust and stone",
        "endless horizon of sands",
        "barren, ochre wastes",
    ],

    "Forest": [
        "shadowed forest canopy",
        "towering trees and winding paths",
        "deep green woodlands",
        "whispering boughs and mossy ground",
        "ancient forest heart",
    ],

    "Hills": [
        "rolling hill country",
        "gentle slopes and stone outcrops",
        "layered hillsides",
        "low, grassy rises",
        "uneven folds of the land",
        "terraced slopes",
        "patchwork of grassy knolls",
        "shallow valleys between the hills",
    ],

    "Jungle": [
        "dense jungle growth",
        "tangled vines and towering trees",
        "broad green expanse",
        "thick undergrowth",
        "emerald canopy",
    ],

    "Mountains": [
        "towering mountain peaks",
        "jagged stone ridges",
        "high mountain passes",
        "rugged alpine slopes",
        "sheer rock faces",
    ],

    "Plains": [
        "wide, open plains",
        "rolling grasslands",
        "open fields",
        "open, flat lands",
        "stretches of farmland",
    ],

    "River": [
        "winding riverbanks",
        "slow-moving waters",
        "stone-lined shores",
        "river's edge",
        "flowing channel and nearby docks",
    ],

    "Swamp": [
        "murky wetlands",
        "marshlands",
        "tangled roots and dark waters",
        "reed-filled lowlands",
        "shadowed bogs",
    ],

    "Tundra": [
        "tundra flats",
        "open northern plains",
        "ice fields",
        "barren expanse",
        "low, frozen ground",
    ],

    "Underground": [
        "echoing stone caverns",
        "carved tunnels",
        "vast subterranean halls",
        "shadowed depths below the surface",
        "winding underground passages",
    ],

    "Urban": [
        "crowded streets and towering buildings",
        "winding alleys and busy thoroughfares",
        "dense urban districts",
        "stone-paved roads and market squares",
        "layered city streets",
    ],

    "Volcanic": [
        "dark stone slopes",
        "jagged volcanic ridges",
        "molten-lit rock fields",
        "blackened stone plains",
        "fire-scarred ground",
    ],
};