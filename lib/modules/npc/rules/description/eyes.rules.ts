import { oxfordCommaList } from "@/lib/util/stringFormats";
import { NPC_EYE_FEATURE_KEYS, NpcEyeColorText, NpcEyeDescriptionTemplates, NpcEyeSpecialText } from "../../mappings/eyes.mappings";
import { normalizeNpcInput, NpcDescriptionType } from "../normalize";
import { getRandom } from "@/lib/util/randomValues";

export function filterApplicableEyeFeatures(features: string[]): string[]{
    return features.filter(feature => {
        if(NPC_EYE_FEATURE_KEYS.has(feature)) return true;
        return false;
    });
}

export function getSpecialEyeDescriptions(features: string[]){
    return features.map(feature => {
        if(!feature) return "";
        return getRandom(
            NpcEyeSpecialText[feature as keyof typeof NpcEyeSpecialText]
        )
    })
};

export function getEyeColorDescriptions(eyeColor: string[]){
    return eyeColor.map(eyeColorLabel => {
        if(!eyeColorLabel) return "";
        return getRandom(
            NpcEyeColorText[eyeColorLabel as keyof typeof NpcEyeColorText]
        )
    });
}

export function getNpcEyeDescriptions(npc: NpcDescriptionType): string {
    const pick = Math.floor(Math.random() * NpcEyeDescriptionTemplates.length);
    return NpcEyeDescriptionTemplates[pick](npc);
}

export function buildNpcEyeDescription(data: ReturnType<typeof normalizeNpcInput>, hasOrHave: string, pronounNoun: string, pronounPossessive: string): string {
    const applicableFeatures = filterApplicableEyeFeatures(data.features);
    let specialEyeText = oxfordCommaList(getSpecialEyeDescriptions(applicableFeatures));
    let eyeColorText = oxfordCommaList(getEyeColorDescriptions(data.eyeColor));
    
    const eyeDescription = getNpcEyeDescriptions({
        ...data,
        pronounNoun,
        pronounPossessive,
        hasOrHave,
        eyeColorText,
        specialEyeText
    } as NpcDescriptionType)

    return eyeDescription;
}