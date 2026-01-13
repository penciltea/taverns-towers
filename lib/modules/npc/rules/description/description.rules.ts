import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "../normalize";
import { NpcBuildText, NpcDescriptionTemplates, NpcHeightText } from "../../mappings/description.mappings";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_RACES } from "@/constants/npc.options";
import { getOccupationLabel } from "@/lib/util/npcHelpers";
import { checkStringStartsWithVowel } from "@/lib/util/stringFormats";
import { buildNpcHairDescription } from "./hair.rules";
import { buildNpcSkinToneDescription } from "./skintone.rules";
import { buildNpcEyeDescription } from "./eyes.rules";
import { buildNpcFeaturesDescription } from "./features.rules";

let npcPronounNoun = "";
let npcPronounPossessive = "";

export function setPronouns(value: string){
    // If pronouns aren't set, default to a generic value
    // If pronouns are set to "other", for descriptive purposes, also fallback to generic 
    if(!value || value.trim() === "" || value.toLowerCase() === "other") {
        npcPronounNoun = "This individual";
        npcPronounPossessive = "Their";
    } else {
        const [ noun, poss ] = value.split("/");
        npcPronounNoun = noun;

        // Grammatical fixes for narrative descriptions

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
            case "its": 
                npcPronounPossessive = "Its";
                break;
            case "her": 
                npcPronounPossessive = "Her";
                break;
            default: 
                npcPronounPossessive = "Their";
        }
    }
}


export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!shouldReplace(data.description)){
        return data;
    }
    console.log("data: ", data);
    setPronouns(data.pronouns);

    let pronounNoun = npcPronounNoun;
    let pronounPossessive = npcPronounPossessive;
    const hasOrHave = (pronounNoun.toLowerCase() === "they" || pronounNoun.toLowerCase() === "zey") ? "have" : "has";  

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
        eyeDescription: buildNpcEyeDescription(data, hasOrHave, pronounNoun, pronounPossessive),
        skinToneDescription: buildNpcSkinToneDescription(data, hasOrHave, pronounNoun, pronounPossessive),
        hairDescription: buildNpcHairDescription(data, hasOrHave, pronounNoun, pronounPossessive),    
        featuresDescription: buildNpcFeaturesDescription(data, hasOrHave, pronounNoun, pronounPossessive)
    };
    
    const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
    data.description = NpcDescriptionTemplates[pick](npcData);

    return data;
}