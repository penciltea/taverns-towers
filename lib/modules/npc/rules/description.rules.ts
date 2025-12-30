import { getRandom, shouldReplace } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput, NpcDescriptionType } from "./normalize";
import { NpcDescriptionTemplates, NpcHeightText } from "../mappings/description.mappings";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { NPC_EYE_COLOR, NPC_HEIGHT, NPC_RACES } from "@/constants/npc.options";
import { getDropdownLabel } from "@/lib/util/getDropdownLabel";
import { checkAgeStartsWithVowel, getOccupationLabel } from "@/lib/util/npcHelpers";

export function applyNpcDescriptionRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    console.log("data: ", data);
    if(shouldReplace(data.description)){
        let npcHeight = getRandom(NpcHeightText[data.height]);

        console.log("age: ", data.age);

        console.log("age starts with: ", checkAgeStartsWithVowel(data.age));

        let prettyData = {
            ...data,
            age: data.age.toLowerCase(),
            pronounNoun: data.pronouns.split("/")[0],
            pronounPossessive: data.pronouns.split("/")[1],
            race: getLabelFromValue(NPC_RACES, data.race).toLowerCase(),
            height: npcHeight,
            build: getLabelFromValue(NPC_HEIGHT, data.build).toLowerCase(),
            occupation: data.occupation.map(getOccupationLabel),
            eyeColor: data.eyeColor.map((color) => getDropdownLabel(NPC_EYE_COLOR, color).toLowerCase()),
            ageStartsWithVowel: checkAgeStartsWithVowel(data.age),
            hasOrHave: data.pronouns.split("/")[0].toLowerCase() === "they" ? "have" : "has",
        };
        
        const pick = Math.floor(Math.random() * NpcDescriptionTemplates.length);
        data.description = NpcDescriptionTemplates[pick](prettyData as NpcDescriptionType);
    }

    return data;
}