import { getRandom } from "@/lib/util/randomValues";
import { NpcSkinToneDescriptionTemplates, NpcSkinToneText } from "../mappings/skintone.mappings";
import { normalizeNpcInput, NpcDescriptionType } from "./normalize";
import { oxfordCommaList } from "@/lib/util/stringFormats";

export function getSkinToneStyleDescriptions(skinTones: string[]) {
    return skinTones.map(skinToneLabel => {
        if (!skinToneLabel) return "";
        return getRandom(
            NpcSkinToneText[skinToneLabel as keyof typeof NpcSkinToneText]
        );
    });
}

export function getNpcSkinToneDescription(npc: NpcDescriptionType): string {
  const pick = Math.floor(Math.random() * NpcSkinToneDescriptionTemplates.length);
  return NpcSkinToneDescriptionTemplates[pick](npc);
}

export function buildNpcSkinToneDescription(data: ReturnType<typeof normalizeNpcInput>, hasOrHave: string, pronounNoun: string, pronounPossessive: string): string {
    const skinToneText = oxfordCommaList(getSkinToneStyleDescriptions(data.skinTone))

    const skinToneDescription = getNpcSkinToneDescription({
        ...data,
        pronounNoun,
        pronounPossessive,
        hasOrHave,
        skinToneText
    } as NpcDescriptionType)

    return skinToneDescription;
}