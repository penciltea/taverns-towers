import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";
import { getRandom } from "@/lib/util/randomValues";
import { NPC_AGE, NPC_RACES, NPC_ALIGNMENT, NPC_STATUS, NPC_PRONOUNS, NPC_TRAITS } from "@/constants/npc.options";

// Logic for setting Sge if set to "random" or missing
export function applyAgeRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.age || data.age === "random") {
        data.age = getRandom(NPC_AGE);
    }

    return data;
}