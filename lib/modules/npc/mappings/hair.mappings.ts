import { NpcHairLengths, NpcHairStyles, NpcHairTextures } from "@/constants/npc.options";
import { NpcDescriptionType } from "../rules/normalize";

export const NpcHairDescriptionTemplates = [
  (npc: NpcDescriptionType) => {
    if (npc.hairFlags?.isBald) {
      return `${npc.pronounNoun} ${npc.hasOrHave === "have" ? "are" : "is"} bald.`;
    }

    if (npc.hairFlags?.isBuzzCut) {
      return `${npc.pronounPossessive} ${npc.hairColorText} hair is cut very short in a neat buzz cut.`;
    }

    return `${npc.pronounPossessive} ${npc.hairColorText}, ${npc.hairTextureText} ${npc.hairLengthText} is ${npc.hairStyleText}.`;
  }
];

export const NpcHairLengthText: Record<NpcHairLengths, string[]> = {
  "bald": [
    "no-length",
  ],
  "buzzCut": [
    "exceptionally short hair",
    "hair shaved close to the scalp"
  ],
  "long": [
    "rather long hair",
    "hair, sweeping past the shoulders,"
  ],
  "medium": [
    "medium length hair",
    "chin-length hair"
  ],
  "short": [
    "hair, a bit on the short side,",
    "rather short hair",
  ],
  "shoulderLength": [
    "shoulder length hair",
    "hair, falling just past the shoulders,"
  ],
  "veryLong": [
    "surprisingly long hair",
    "hair, cascading down the back,",
    "exceptionally long hair",
  ],
  "waistLength": [
    "waist length hair",
    "hair falls just above the hips"
  ]
}

export const NpcHairTextureText: Record<NpcHairTextures, string[]> = {
  coily: [
    "tight, coily",
    "coiled tightly",
    "very coily",
    "densely coiled",
    "coily"
  ],

  curly: [
    "loosely curled,",
    "tightly curled,",
    "very curly,",
    "softly curled,",
    "rather curly,",
    "curly"
  ],

  fine: [
    "fine and light",
    "thin and delicate",
    "soft, fine",
    "fine-textured",
    "silken and fine"
  ],

  kinky: [
    "tightly kinked",
    "densely kinked",
    "short, kinky",
    "coarse and kinked",
    "kinky"
  ],

  straight: [
    "straight and smooth",
    "sleek and straight",
    "pin-straight",
    "perfectly straight",
    "straight"
  ],

  thick: [
    "thick and heavy,",
    "dense and thick,",
    "full and thick,",
    "coarsely thick,",
    "thick"
  ],

  voluminous: [
    "rich and voluminous,",
    "copious,",
    "luxuriantly full,",
    "voluminous"
  ],

  wavy: [
    "softly wavy",
    "gently waved",
    "loose, wavy",
    "lightly wavy",
    "wavy"
  ]
};


export const NpcHairStyleText: Record<NpcHairStyles, string[]> = {
  "braided": [
    "worn in neat braids",
    "carefully braided hair",
    "arranged into tight braids"
  ],

  "buns": [
    "gathered into one bun",
    "tied back in tidy buns",
    "styled into compact buns",
    "pulled back into two low buns",
    "separated into three small buns going down the back of the head"
  ],

  "cornrows": [
    "woven into close-set cornrows",
    "tightly braided cornrows",
    "styled in neat rows against the scalp"
  ],

  "dreadlocks": [
    "worn in thick dreadlocks",
    "styled into long, locked strands of hair",
    "formed into heavy locks"
  ],

  "halfUpHalfDown": [
    "worn half up and half loose",
    "partly tied back, the rest falling free",
    "a half-bound hairstyle that keeps hair from the face"
  ],

  "loose": [
    "left loose around the shoulders",
    "worn freely without restraint",
    "unbound and falls naturally"
  ],

  "messyBuns": [
    "pulled into loose, messy buns",
    "thrown into a a casually gathered, untidy bun",
    "hastily tied back in a loose bun"
  ],

  "mohawk": [
    "shaved at the sides with a raised strip along the center",
    "a bold mohawk cut",
    "a narrow crest of hair running from forehead to neck"
  ],

  "pigtails": [
    "tied into two pigtails",
    "split and tied into matching tails",
    "tied into a pair of neatly tied pigtails"
  ],

  "ponytail": [
    "pulled back into a ponytail",
    "tied tightly at the back of the head",
    "a simple, practical ponytail"
  ],

  "ringlets": [
    "a series of tight ringlets",
    "well-defined, forming neat ringlets",
    "coiled, framing the face"
  ],

  "shaggy": [
    "worn in a shaggy, uneven cut",
    "cut in a rough, layered style",
    "left in an intentionally unkempt, shaggy hairstyle"
  ],

  "side-shave": [
    "shaved along one side of the head",
    "a partially shaved hairstyle",
    "cut short on one side, longer on the other"
  ],

  "windswept": [
    "hair constantly falling in a windswept fashion",
    "hair tousled as though by the wind",
    "a perpetually wind-tossed look"
  ],

  "wolfCut": [
    "a layered cut with wild, uneven volume",
    "a shaggy, layered hairstyle with a feral edge",
    "cut in a rough, modern layered style"
  ],

  "undercut": [
    "shaved short beneath longer layers",
    "a sharp undercut framing longer hair above",
    "closely cropped sides beneath longer strands"
  ],

  "unkempt": [
    "left unkempt and poorly tended",
    "in a state of disarray",
    "unclean and neglected"
  ],

  "updo": [
    "arranged in a formal updo",
    "hair pinned up in an elegant style",
    "styled neatly above the neck"
  ],
};
