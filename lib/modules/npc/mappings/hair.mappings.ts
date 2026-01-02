import { NpcHairStyles } from "@/constants/npc.options";
import { NpcDescriptionType } from "../rules/normalize";

export const NpcHairDescriptionTemplates = [
  (npc: NpcDescriptionType) => {
    console.log("hair npc: ", npc);
    if(npc.hairLength === "bald") {
        return `${npc.pronounNoun === "They" ? "They are" : npc.pronounNoun + " is"} bald.`;
    }
    
    return `${npc.pronounPossessive} ${npc.hairTexture}, ${npc.hairLength} hair is ${npc.hairStyles}.`
  }
];

export const NpcHairStyleText: Record<NpcHairStyles, string[]> = {
  "braided": [
    "hair worn in neat braids",
    "carefully braided hair",
    "hair arranged into tight braids"
  ],

  "buns": [
    "hair gathered into one or more buns",
    "hair tied back in tidy buns",
    "hair styled into compact buns"
  ],

  "cornrows": [
    "hair woven into close-set cornrows",
    "tightly braided cornrows",
    "hair styled in neat rows against the scalp"
  ],

  "dreadlocks": [
    "hair worn in thick dreadlocks",
    "long, locked strands of hair",
    "hair formed into heavy locks"
  ],

  "halfUpHalfDown": [
    "hair worn half up and half loose",
    "hair partly tied back, the rest falling free",
    "a half-bound hairstyle that keeps hair from the face"
  ],

  "loose": [
    "hair left loose around the shoulders",
    "hair worn freely without restraint",
    "unbound hair that falls naturally"
  ],

  "messyBuns": [
    "hair pulled into loose, messy buns",
    "a casually gathered, untidy bun",
    "hair hastily tied back in a loose bun"
  ],

  "mohawk": [
    "hair shaved at the sides with a raised strip along the center",
    "a bold mohawk cut",
    "a narrow crest of hair running from forehead to neck"
  ],

  "pigtails": [
    "hair tied into two pigtails",
    "hair split and tied into matching tails",
    "a pair of neatly tied pigtails"
  ],

  "ponytail": [
    "hair pulled back into a ponytail",
    "hair tied tightly at the back of the head",
    "a simple, practical ponytail"
  ],

  "ringlets": [
    "hair falling in tight ringlets",
    "defined curls forming neat ringlets",
    "coiled strands framing the face"
  ],

  "shaggy": [
    "hair worn in a shaggy, uneven cut",
    "hair cut in a rough, layered style",
    "an intentionally unkempt, shaggy hairstyle"
  ],

  "side-shave": [
    "hair shaved along one side of the head",
    "a partially shaved hairstyle",
    "hair cut short on one side, longer on the other"
  ],

  "wavyMane": [
    "long hair flowing in loose waves",
    "a thick mane of wavy hair",
    "waves of hair falling freely over the shoulders"
  ],

  "windswept": [
    "hair constantly falling in a windswept fashion",
    "hair tousled as though by the wind",
    "a perpetually wind-tossed look"
  ],

  "wolfCut": [
    "a layered cut with wild, uneven volume",
    "a shaggy, layered hairstyle with a feral edge",
    "hair cut in a rough, modern layered style"
  ],

  "undercut": [
    "hair shaved short beneath longer layers",
    "a sharp undercut framing longer hair above",
    "closely cropped sides beneath longer strands"
  ],

  "unkempt": [
    "hair left unkempt and poorly tended",
    "hair in a state of disarray",
    "an unclean, neglected hairstyle"
  ],

  "updo": [
    "hair arranged in a formal updo",
    "hair pinned up in an elegant style",
    "hair styled neatly above the neck"
  ],
};
