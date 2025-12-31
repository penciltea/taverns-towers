import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "./normalize";
import { NpcBuildText, NpcDescriptionTemplates, NpcHeightText } from "../mappings/description.mappings";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_EYE_COLOR, NPC_HEIGHT, NPC_RACES } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";
import { getOccupationLabel } from "@/lib/util/npcHelpers";
import { checkStringStartsWithVowel } from "@/lib/util/stringFormats";

export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    console.log("data: ", data);
    if(shouldReplace(data.description)){
        let prettyData = {
            ...data,
            age: data.age.toLowerCase(),
            pronounNoun: data.pronouns.split("/")[0],
            pronounPossessive: data.pronouns.split("/")[1],
            race: getLabelFromValue(NPC_RACES, data.race).toLowerCase(),
            height: getRandom(NpcHeightText[data.height]),
            build: getRandom(NpcBuildText[data.build]),
            occupation: data.occupation.map(getOccupationLabel),
            eyeColor: data.eyeColor.map((color) => getDropdownLabel(NPC_EYE_COLOR, color).toLowerCase()),
            ageStartsWithVowel: checkStringStartsWithVowel(data.age),
            hasOrHave: data.pronouns.split("/")[0].toLowerCase() === "they" ? "have" : "has",
        };
        
        const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
        data.description = NpcDescriptionTemplates[pick](prettyData as NpcDescriptionType);
    }

    return data;
}