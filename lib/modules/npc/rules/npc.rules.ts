import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";
import { getRandom, getRandomSubset, shouldReplace } from "@/lib/util/randomValues";
import { NPC_AGE, NPC_RACES, NPC_STATUS, NPC_PRONOUNS, NPC_TRAITS } from "@/constants/npc.options";
import { archetypeByAgeMapping, npcAlignmentMapping, occupationByArchetypeMapping, occupationCountByArchetype, reputationByArchetypeMapping } from "../mappings/npc.mappings";
import { NpcCommonDislikes, NpcCommonLikes, NpcUncommonDislikes, NpcUncommonLikes, persuasionByAlignmentMapping, persuasionByArchetypeMapping, persuasionByTraitsMapping } from "../mappings/personality.mappings";

// Logic for setting Age if set to "random" or missing
export function applyAgeRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.age || data.age === "random") {
        data.age = getRandom(NPC_AGE);
    }

    return data;
}

// Logic for setting Pronouns if set to "random" or missing
export function applyPronounsRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.pronouns || data.pronouns === "random") {
        data.pronouns = getRandom(NPC_PRONOUNS);
    }

    return data;
}

// Logic for setting Race if set to "random" or missing
export function applyRaceRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.race || data.race === "random") {
        data.race = getRandom(NPC_RACES).value;
    }

    return data;
}

// Logic for setting Alignment if set to "random" or missing
export function applyAlignmentRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.alignment || data.alignment === "random") {
        data.alignment = getRandom(npcAlignmentMapping);
    }

    return data;
}


// Logic for setting Status if set to "random" or missing
export function applyStatusRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if (!data.status || data.status === "random") {
        data.status = getRandom(NPC_STATUS);
    }

    return data;
}


// Logic for setting Traits if set to "random" or missing
export function applyTraitsRule( data: ReturnType<typeof normalizeNpcInput> ): ReturnType<typeof normalizeNpcInput> {
  if (shouldReplace(data.traits)) {
    const allTraits = NPC_TRAITS.flatMap(group =>
      group.options.map(opt => opt.value)
    );

    data.traits = getRandomSubset(allTraits, { min: 1, max: 4 });
  }

  return data;
}



export function applyArchetypeByAgeRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(shouldReplace(data.archetype) && (data.age || data.age !== "random")) {
        data.archetype = getRandom(archetypeByAgeMapping[data.age]);
    }

    return data;
}

export function applyReputationByArchetypeRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput {
    if(shouldReplace(data.reputation) && (data.archetype && data.archetype !== "random")) {
        data.reputation = getRandom(reputationByArchetypeMapping[data.archetype])
    }
    return data;
}

export function applyOccupationByConditionsRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput{
    if(shouldReplace(data.occupation) && (data.age && data.age !== "random") && (data.archetype && data.archetype !== "random")){
        const occupationResults = occupationByArchetypeMapping[data.archetype];
        const [min, max] = occupationCountByArchetype[data.archetype ?? "other"];

        data.occupation = getRandomSubset(occupationResults, { min, max });
    }
    return data;
}

export function applyPersuasionByConditionsRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput{
    if(
        shouldReplace(data.persuasion) && 
        (data.archetype && data.archetype !== "random") && 
        (data.traits.length > 0 && !data.traits.includes("random")) &&
        (data.alignment && data.alignment !== "random") 
    ){
        const persuasionByArchetype = persuasionByArchetypeMapping[data.archetype] || [];
        const persuasionByAlignment = persuasionByAlignmentMapping[data.alignment] || [];
        const persuationByTraits = data.traits.flatMap(t => persuasionByTraitsMapping[t] || []);

        const combined = Array.from(new Set([
            ...persuasionByArchetype,
            ...persuasionByAlignment,
            ...persuationByTraits
        ]));

        const results = getRandomSubset(combined, {min: 1, max: 3});

        if(results.includes("none")){
            data.persuasion = ["none"]; // if "none" is selected, prevent other choices from being selected
        } else {
            data.persuasion = results;
        }
    }

    return data;
}

export function applyLikesRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput{
    if(shouldReplace(data.likes)){
        let commonLikes = getRandomSubset(NpcCommonLikes, {min: 1, max: 3});
        let uncommonLikes = getRandom(NpcUncommonLikes);
        data.likes = [...commonLikes, uncommonLikes].join(", ").toString();
    }

    return data;
}

export function applyDislikesRule(data: ReturnType<typeof normalizeNpcInput>): NormalizedNpcInput{
    if(shouldReplace(data.dislikes)){
        let commonDislikes = getRandomSubset(NpcCommonDislikes, {min: 1, max: 2});
        let uncommonDislikes = getRandom(NpcUncommonDislikes);
        let selectedDislikes = [...commonDislikes, uncommonDislikes];

        // Convert likes to an array (only if they exist)
        const likeList = data.likes
            ? data.likes.split(",").map(like => like.trim().toLowerCase())
            : [];

        // Filter the dislikes to avoid conflicts
        selectedDislikes = selectedDislikes.filter(dislike =>
            !likeList.includes(dislike.toLowerCase())
        );

        // Reassign final filtered string
        data.dislikes = selectedDislikes.join(", ").toString();
    }

    return data;
}