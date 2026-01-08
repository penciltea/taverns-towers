import { getRandom } from "@/lib/util/randomValues";
import { NpcSkinToneDescriptionTemplates, NpcSkinToneSpecialText, NpcSkinToneText, PIGMENT_FEATURES, SKIN_SURFACE_FEATURES, UNIVERSAL_SURFACE_FEATURES } from "../mappings/skintone.mappings";
import { normalizeNpcInput, NpcDescriptionType } from "./normalize";
import { oxfordCommaList } from "@/lib/util/stringFormats";
import { IntegumentType } from "@/lib/models/npc.model";
import { checkIfHumanDerivedRace } from "./common.rules";

function getNonHumanIntegument(race: string): IntegumentType {
    switch (race.toLowerCase()) {
        case "dragonborn":
        case "lizardfolk":
            return "scales";
        case "kenku":
        case "aarakocra":
            return "feathers";
        case "tabaxi":
        case "leonin":
            return "fur";
        default:
            return "skin";
    }
}

function filterApplicableSkinFeatures(
  features: string[],
  integument: IntegumentType
): string[] {
  return features.filter(feature => {
    if (PIGMENT_FEATURES.has(feature)) return true;

    if (UNIVERSAL_SURFACE_FEATURES.has(feature)) return true;

    if (integument === "skin" && SKIN_SURFACE_FEATURES.has(feature)) {
      return true;
    }

    return false;
  });
}

export function getSkinToneStyleDescriptions(skinTones: string[]) {
    return skinTones.map(skinToneLabel => {
        if (!skinToneLabel) return "";
        return getRandom(
            NpcSkinToneText[skinToneLabel as keyof typeof NpcSkinToneText]
        );
    });
}

export function getSpecialSkinDescriptions(race: string, features: string[]){
    const surface = getNonHumanIntegument(race)
    return features.map(feature => {
        if(!feature) return "";

        const options = NpcSkinToneSpecialText[feature as keyof typeof NpcSkinToneSpecialText];
        if(!options || options.length === 0) return "";

        const text = getRandom(options);
        return text.replace(/\{surface\}/g, surface);
    })
}

export function getNpcSkinToneDescription(npc: NpcDescriptionType): string {
  const surface = getNonHumanIntegument(npc.race);

  const pick = Math.floor(Math.random() * NpcSkinToneDescriptionTemplates.length);
  const option = NpcSkinToneDescriptionTemplates[pick](npc);

  return option.replace(/\{surface\}/g, surface);
}

export function buildNpcSkinToneDescription(data: ReturnType<typeof normalizeNpcInput>, hasOrHave: string, pronounNoun: string, pronounPossessive: string): string {
    const integument = checkIfHumanDerivedRace(data.race) ? "skin" : getNonHumanIntegument(data.race);

    const applicableFeatures = filterApplicableSkinFeatures(data.features, integument);
    let specialSkinText = oxfordCommaList(getSpecialSkinDescriptions(data.race, applicableFeatures));
    let skinToneText = oxfordCommaList(getSkinToneStyleDescriptions(data.skinTone));
    
    const skinToneDescription = getNpcSkinToneDescription({
        ...data,
        pronounNoun,
        pronounPossessive,
        hasOrHave,
        skinToneText,
        specialSkinText
    } as NpcDescriptionType)

    return skinToneDescription;
}