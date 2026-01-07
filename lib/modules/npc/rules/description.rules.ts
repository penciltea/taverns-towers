import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "./normalize";
import { NpcBuildText, NpcDescriptionTemplates, NpcHeightText } from "../mappings/description.mappings";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_EYE_COLOR, NPC_RACES } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";
import { getOccupationLabel } from "@/lib/util/npcHelpers";
import { checkStringStartsWithVowel, oxfordCommaList } from "@/lib/util/stringFormats";
import { buildNpcHairDescription } from "./hair.rules";
import { buildNpcSkinToneDescription } from "./skintone.rules";

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

function getEyeColorDescriptions(colors: string[]){
    return colors.map(colorLabel => {
        if(!colorLabel) return "";
        return getDropdownLabel(NPC_EYE_COLOR, colorLabel).toLowerCase();
    })
};



export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    console.log("data: ", data);
    if(!shouldReplace(data.description)){
        return data;
    }

    setPronouns(data.pronouns);

    let pronounNoun = npcPronounNoun;
    let pronounPossessive = npcPronounPossessive;
    const hasOrHave = (pronounNoun.toLowerCase() === "they" || pronounNoun.toLowerCase() === "zey") ? "have" : "has";
    const eyeColorText = oxfordCommaList(getEyeColorDescriptions(data.eyeColor));
    

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
        skinToneDescription: buildNpcSkinToneDescription(data, hasOrHave, pronounNoun, pronounPossessive),
        hairDescription: buildNpcHairDescription(data, hasOrHave, pronounNoun, pronounPossessive)    
    };

    console.log("npcData: ", npcData);
    
    const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
    data.description = NpcDescriptionTemplates[pick](npcData);

    return data;
}