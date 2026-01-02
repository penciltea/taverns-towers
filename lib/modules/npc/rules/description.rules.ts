import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "./normalize";
import { NpcBuildText, NpcDescriptionTemplates, NpcHeightText } from "../mappings/description.mappings";
import { NpcHairDescriptionTemplates, NpcHairStyleText } from "../mappings/hair.mappings";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_EYE_COLOR, NPC_HAIR_COLOR, NPC_HAIR_LENGTHS, NPC_HAIR_STYLES, NPC_HAIR_TEXTURES, NPC_RACES } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";
import { getOccupationLabel } from "@/lib/util/npcHelpers";
import { checkStringStartsWithVowel, oxfordCommaList } from "@/lib/util/stringFormats";

let npcPronounNoun = "";
let npcPronounPossessive = "";

export function setPronouns(value: string){
    // If pronouns aren't set, default to a generic value
    // If pronouns are set to "other", for descriptive purposes, also fallback to generic 
    if(!value || value.trim() === "" || value.toLowerCase() === "other") {
        console.log(1);
        npcPronounNoun = "This individual";
        npcPronounPossessive = "This individual's";
    } else {
        npcPronounNoun = value.split("/")[0];
        npcPronounPossessive = value.split("/")[1];

        // Grammatical fixes for narrative descriptions
        if (npcPronounPossessive.toLowerCase() === "they" || npcPronounPossessive.toLowerCase() === "them"){
            npcPronounPossessive = "Their";
        }

        if(npcPronounNoun.toLowerCase() === "him"){
            npcPronounNoun = "His";
        }

        if(npcPronounNoun.toLowerCase() === "xem"){
            npcPronounNoun = "Xyrs";
        }
        if(npcPronounNoun.toLowerCase() === "xim"){
            npcPronounNoun = "Xirs";
        }
        if(npcPronounNoun.toLowerCase() === "zir"){
            npcPronounNoun = "Zirs";
        }
        if(npcPronounNoun.toLowerCase() === "zem"){
            npcPronounNoun = "Zers";
        }
        if(npcPronounNoun.toLowerCase() === "hir"){
            npcPronounNoun = "Hirs";
        }
    }
}

export function groupHairStyles(values: string[]) {
  return values.reduce(
    (acc, value) => {
      // Textures
      if (NPC_HAIR_TEXTURES[0].options.some(o => o.value === value)) {
        acc.textures.push(value);
      }

      // Lengths
      if (NPC_HAIR_LENGTHS[0].options.some(o => o.value === value)) {
        acc.lengths.push(value);
      }

      // Styles
      if (NPC_HAIR_STYLES[0].options.some(o => o.value === value)) {
        acc.styles.push(value);
      }

      return acc;
    },
    {
      textures: [] as string[],
      lengths: [] as string[],
      styles: [] as string[],
    }
  );
}

function getHairLengthDescriptions(lengths: string[]) {
    return lengths.map(lengthLabel => {
        if (!lengthLabel) return "";
        if (lengthLabel.toLowerCase() === "bald"){
            return "";
        }
        return getDropdownLabel(NPC_HAIR_LENGTHS, lengthLabel).toLowerCase();
    });
}

function getHairTextureDescriptions(textures: string[]) {
    return textures.map(textureLabel => {
        if (!textureLabel) return "";
            return getDropdownLabel(NPC_HAIR_TEXTURES, textureLabel).toLowerCase();
        }
    );
}


function getHairStyleDescriptions(styles: string[]) {
    console.log("styles: ", styles);
    return styles.map(styleLabel => {
        if (!styleLabel) return "";
            return getRandom(
                NpcHairStyleText[styleLabel as keyof typeof NpcHairStyleText]
            );
        }
    );
}

export function getNpcHairDescription(npc: NpcDescriptionType): string {
  // Step 1: Get the hair styles description (e.g., braids, buns)
  const styleDescription =
    npc.hairStyles && npc.hairStyles.length > 0
      ? npc.hairStyles
          .map(style => {
            if(!style) return "";
            return getRandom(NpcHairStyleText[style as keyof typeof NpcHairStyleText])
          })
          .join(", ")
      : "";

  // Step 2: Pick a hair description template
  const pick = Math.floor(Math.random() * NpcHairDescriptionTemplates.length);
  const hairBase = NpcHairDescriptionTemplates[pick](npc);

  // Step 3: Merge the style description into the template
  if (styleDescription) {
    return `${hairBase.replace(/\.$/, "")}, styled as ${styleDescription}.`;
  }

  return hairBase;
}

export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    console.log("data: ", data);
    if(shouldReplace(data.description)){
        setPronouns(data.pronouns);
        console.log("hair details: ", groupHairStyles(data.hairStyle || []));

        let pronounNoun = npcPronounNoun;
        let pronounPossessive = npcPronounPossessive;
        let hasOrHave = pronounNoun.toLowerCase() === "they" ? "have" : "has";

        let npcData = {
            ...data,
            age: data.age.toLowerCase(),
            pronounNoun,
            pronounPossessive,
            race: getLabelFromValue(NPC_RACES, data.race).toLowerCase(),
            height: getRandom(NpcHeightText[data.height]),
            build: getRandom(NpcBuildText[data.build]),
            occupation: data.occupation.map(getOccupationLabel),
            hairColor: data.hairColor.map((color) => getDropdownLabel(NPC_HAIR_COLOR, color).toLowerCase()),
            eyeColor: data.eyeColor.map((color) => getDropdownLabel(NPC_EYE_COLOR, color).toLowerCase()),
            ageStartsWithVowel: checkStringStartsWithVowel(data.age),
            hasOrHave,
            hairDescription: getNpcHairDescription({
                ...data,
                pronounNoun,
                pronounPossessive,
                hasOrHave,
                hairStyles: groupHairStyles(data.hairStyle || []).styles,
                hairLength: oxfordCommaList(getHairLengthDescriptions(groupHairStyles(data.hairStyle || []).lengths)),
                hairTexture: oxfordCommaList(getHairTextureDescriptions(groupHairStyles(data.hairStyle || []).textures))
            } as NpcDescriptionType)
        };
        
        const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
        data.description = NpcDescriptionTemplates[pick](npcData as NpcDescriptionType);
    }

    return data;
}