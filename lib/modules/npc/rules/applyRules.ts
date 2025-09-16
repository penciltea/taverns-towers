import { normalizeNpcInput, NormalizedNpcInput } from "./normalize";
import { getRandom, getRandomSubset, shouldReplace } from "@/lib/util/randomValues";
import { NPC_AGE, NPC_RACES, NPC_ALIGNMENT, NPC_STATUS, NPC_PRONOUNS, NPC_TRAITS } from "@/constants/npc.options";

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
        data.alignment = getRandom(NPC_ALIGNMENT);
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
export function applyTraitsRule(
  data: ReturnType<typeof normalizeNpcInput>
): ReturnType<typeof normalizeNpcInput> {
  if (shouldReplace(data.traits)) {
    const allTraits = NPC_TRAITS.flatMap(group =>
      group.options.map(opt => opt.value)
    );

    data.traits = getRandomSubset(allTraits, { min: 1, max: 4 });
  }

  return data;
}