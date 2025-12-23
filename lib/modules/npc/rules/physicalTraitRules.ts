import { NPC_BUILD, NPC_FANTASY_SKINTONES, NPC_HEIGHT, NPC_HUMAN_SKINTONES } from "@/constants/npc.options";
import { getRandom, getWeightedRandomOptions } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";

export function applyHeightRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.height || data.height === "random") {
        data.height = getRandom(NPC_HEIGHT).value;
    }

    return data;
}

export function applyBuildRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.build || data.build === "random") {
        data.build = getRandom(NPC_BUILD).value;
    }

    return data;
}

export function applySkinToneRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!data.skinTone || data.skinTone.includes("random")) {

        // Races that are human-derived
        if(data.race === "human" || data.race === "elf" || data.race === "dwarf" || data.race === "halfling" || data.race === "gnome" || data.race === "half-elf" || data.race === "half-orc") {
            const HUMANOID_SKINTONES = [
                {
                    weight: 10,
                    group: NPC_HUMAN_SKINTONES[0]
                },
                {
                    weight: 1,
                    group: NPC_FANTASY_SKINTONES[0],
                },
            ] as const;

            data.skinTone = getWeightedRandomOptions(HUMANOID_SKINTONES, 1);
        } else {
            const FANTASY_SKINTONES = [
                ...NPC_HUMAN_SKINTONES[0].options,
                ...NPC_FANTASY_SKINTONES[0].options,
            ]

            const options = getRandom(FANTASY_SKINTONES).value;

            data.skinTone = [options];
        }
    }
    return data;
}