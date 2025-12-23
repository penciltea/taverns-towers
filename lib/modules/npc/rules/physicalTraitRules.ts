import { NPC_BUILD, NPC_FANTASY_EYE_COLORS, NPC_FANTASY_HAIR_COLORS, NPC_FANTASY_SKINTONES, NPC_HEIGHT, NPC_HUMAN_EYE_COLORS, NPC_HUMAN_HAIR_COLORS, NPC_HUMAN_SKINTONES } from "@/constants/npc.options";
import { getRandom, getWeightedRandomOptions } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";

function checkIfHumanDerivedRace(race: string){
    if( race === "human" || 
        "elf" || 
        "dwarf" || 
        "halfling" || 
        "gnome" || 
        "half-elf" || 
        "half-orc" || 
        "aasimar" || 
        "goliath" || 
        "goblin" 
    ){
        return true;
    }
    return false;
}

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
        if(checkIfHumanDerivedRace(data.race)) {
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

        // Some races should have fantasy-color skintones exclusively
        } else if( data.race === "dragonborn" || "kenku" || "tabaxi" ) {
            const SKINTONES = [...NPC_FANTASY_SKINTONES[0].options];

            const options = getRandom(SKINTONES).value;

            data.skinTone = [options]
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

export function applyEyeColorRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!data.eyeColor || data.eyeColor.includes("random")){
        const EYE_COLORS = [
            {
                weight: 10,
                group: NPC_HUMAN_EYE_COLORS[0]
            },
            {
                weight: 1,
                group: NPC_FANTASY_EYE_COLORS[0],
            },
        ] as const;

        let colorCount = 1;

        // if NPC has heterochromia, set count to 2
        if(data.features.includes("heterochromia")){
            colorCount = 2;
        }

        data.eyeColor = getWeightedRandomOptions(EYE_COLORS, colorCount);
    }

    return data;
}

export function applyHairColorRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!data.hairColor || data.hairColor.includes("random")){
        const HAIR_COLORS = [
            {
                weight: 10,
                group: NPC_HUMAN_HAIR_COLORS[0]
            },
            {
                weight: 1,
                group: NPC_FANTASY_HAIR_COLORS[0],
            },
        ] as const;

        data.hairColor = getWeightedRandomOptions(HAIR_COLORS, 1);
    }

    return data;
}