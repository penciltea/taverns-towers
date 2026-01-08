import { NPC_BUILD, NPC_DISTINGUISHING_BODY_COMMON, NPC_DISTINGUISHING_BODY_RARE, NPC_DISTINGUISHING_BODY_UNCOMMON, NPC_DISTINGUISHING_BODY_VERY_RARE, NPC_DISTINGUISHING_EYES, NPC_DISTINGUISHING_FACE_COMMON, NPC_DISTINGUISHING_FACE_UNCOMMON, NPC_DISTINGUISHING_OTHER_COMMON, NPC_DISTINGUISHING_OTHER_RARE, NPC_DISTINGUISHING_OTHER_UNCOMMON, NPC_FANTASY_EYE_COLORS, NPC_FANTASY_HAIR_COLORS, NPC_FANTASY_SKINTONES, NPC_HAIR_LENGTHS, NPC_HAIR_STYLES, NPC_HAIR_TEXTURES, NPC_HEIGHT, NPC_HUMAN_EYE_COLORS, NPC_HUMAN_HAIR_COLORS, NPC_HUMAN_SKINTONES } from "@/constants/npc.options";
import { getRandom, getWeightedRandomOptions } from "@/lib/util/randomValues";
import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";
import { checkIfHumanDerivedRace } from "./common.rules";


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
        } else if (["dragonborn", "kenku", "tabaxi"].includes(data.race.toLowerCase())) {
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

export function applyHairStyleRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!data.hairStyle || data.hairStyle.includes("random")){
        let hairArray = [];

        const hairLength = getRandom(NPC_HAIR_LENGTHS[0].options);

        // If bald or buzz cut is selected, skip rest of selection options
        if(hairLength.value === "bald" || hairLength.value === "buzzCut"){
            data.hairStyle = [hairLength.value];
        } else {
            hairArray.push(hairLength.value);
            hairArray.push(getRandom(NPC_HAIR_TEXTURES[0].options).value);
            hairArray.push(getRandom(NPC_HAIR_STYLES[0].options).value);
            data.hairStyle = hairArray;
        }
    }
    return data;
}

export function applyDistinguishingFeaturesRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(!data.features || data.features.includes("random")){
        const POSSIBLE_FEATURES = [
            {
                weight: 3,
                group: NPC_DISTINGUISHING_EYES
            },
            {
                weight: 10,
                group: NPC_DISTINGUISHING_FACE_COMMON,
            },
            {
                weight: 8,
                group: NPC_DISTINGUISHING_FACE_UNCOMMON,
            },
            {
                weight: 10,
                group: NPC_DISTINGUISHING_BODY_COMMON,
            },
            {
                weight: 8,
                group: NPC_DISTINGUISHING_BODY_UNCOMMON,
            },
            {
                weight: 3,
                group: NPC_DISTINGUISHING_BODY_RARE,
            },
            {
                weight: 1,
                group: NPC_DISTINGUISHING_BODY_VERY_RARE,
            },
            {
                weight: 10,
                group: NPC_DISTINGUISHING_OTHER_COMMON,
            },
            {
                weight: 8,
                group: NPC_DISTINGUISHING_OTHER_UNCOMMON,
            },
            {
                weight: 3,
                group: NPC_DISTINGUISHING_OTHER_RARE,
            },
        ] as const;

        data.features = getWeightedRandomOptions(POSSIBLE_FEATURES, 2);
    }

    // Overwriting potential pre-existing options based on real-world albinism
    if(data.features.includes("albinism")){
        data.eyeColor = ["pink"];
        data.hairColor = ["white"];
        data.skinTone = ["veryPale"];
    }

    return data;
}

