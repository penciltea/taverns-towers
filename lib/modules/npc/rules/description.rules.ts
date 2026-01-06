import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "./normalize";
import { NpcBuildText, NpcDescriptionTemplates, NpcHeightText } from "../mappings/description.mappings";
import { NpcHairDescriptionTemplates, NpcHairLengthText, NpcHairStyleText, NpcHairTextureText } from "../mappings/hair.mappings";
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
        npcPronounNoun = "This individual";
        npcPronounPossessive = "This individual's";
    } else {
        const [ noun, poss ] = value.split("/");
        npcPronounNoun = noun;

        // Grammatical fixes for narrative descriptions

        if (poss.toLowerCase() === "they" || poss.toLowerCase() === "them"){
            npcPronounPossessive = "Their";
        }

        switch (poss.toLowerCase()){
            case "him":
                npcPronounPossessive = "His";
                break;
            case "xem":
                npcPronounPossessive = "Xyrs";
                break;
            case "xim":
                npcPronounPossessive = "Xirs";
                break;
            case "zir":
                npcPronounPossessive = "Zirs";
                break;
            case "zem":
                npcPronounPossessive = "Zers";
                break;
            case "hir":
                npcPronounPossessive = "Hirs";
                break;
            default: 
                npcPronounPossessive = "This individual's";
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
        return getRandom(
            NpcHairLengthText[lengthLabel as keyof typeof NpcHairLengthText]
        );
    });
}

function getHairTextureDescriptions(textures: string[]) {
    return textures.map(textureLabel => {
        if (!textureLabel) return "";
        return getRandom(
            NpcHairTextureText[textureLabel as keyof typeof NpcHairTextureText]
        );
        }
    );
}


function getHairStyleDescriptions(styles: string[]) {
    return styles.map(styleLabel => {
        if (!styleLabel) return "";
            return getRandom(
                NpcHairStyleText[styleLabel as keyof typeof NpcHairStyleText]
            );
        }
    );
}

function getEyeColorDescriptions(colors: string[]){
    return colors.map(colorLabel => {
        if(!colorLabel) return "";
        return getDropdownLabel(NPC_EYE_COLOR, colorLabel).toLowerCase();
    })
};

function getHairColorDescriptions(colors: string[]){
    return colors.map(colorLabel => {
        if(!colorLabel) return "";
        return getDropdownLabel(NPC_HAIR_COLOR, colorLabel).toLowerCase();
    })
};

export function getNpcHairDescription(npc: NpcDescriptionType): string {
  const pick = Math.floor(Math.random() * NpcHairDescriptionTemplates.length);
  return NpcHairDescriptionTemplates[pick](npc);
}

export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    console.log("data: ", data);
    if(!shouldReplace(data.description)){
        return data;
    }

    setPronouns(data.pronouns);

    let pronounNoun = npcPronounNoun;
    let pronounPossessive = npcPronounPossessive;
    const hasOrHave = (pronounNoun.toLowerCase() === "they" || pronounNoun.toLowerCase() === "zey") ? "have" : "has";
    const groupedHair = groupHairStyles(data.hairStyle || []);

    const hairLengthText = oxfordCommaList(getHairLengthDescriptions(groupedHair.lengths));
    const hairTextureText = oxfordCommaList(getHairTextureDescriptions(groupedHair.textures));
    const hairStyleText = oxfordCommaList(getHairStyleDescriptions(groupedHair.styles));
    const eyeColorText = oxfordCommaList(getEyeColorDescriptions(data.eyeColor));
    const hairColorText = oxfordCommaList(getHairColorDescriptions(data.hairColor));

    const hairDescription = getNpcHairDescription({
        ...data,
        pronounNoun,
        pronounPossessive,
        ageStartsWithVowel: checkStringStartsWithVowel(data.age),
        hasOrHave,
        hairColorText,
        hairStyleText,
        hairLengthText,
        hairTextureText,
        hairFlags: {
            isBald: groupedHair.lengths.includes("bald"),
            isBuzzCut: groupedHair.lengths.includes("buzzCut")
        },
    } as NpcDescriptionType)

    const npcData: NpcDescriptionType = {
        ...data,
        age: data.age.toLowerCase(),
        pronounNoun,
        pronounPossessive,
        race: getLabelFromValue(NPC_RACES, data.race).toLowerCase(),
        height: getRandom(NpcHeightText[data.height]),
        build: getRandom(NpcBuildText[data.build]),
        occupation: data.occupation.map(getOccupationLabel),
        ageStartsWithVowel: checkStringStartsWithVowel(data.age),
        hasOrHave,
        eyeColorText,
        hairDescription    
    };

    console.log("npcData: ", npcData);
    
    const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
    data.description = NpcDescriptionTemplates[pick](npcData);

    return data;
}