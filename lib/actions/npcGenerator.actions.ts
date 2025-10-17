'use server';

import connectToDatabase from "@/lib/db/connect";
import GeneratorNpcFragment, { GeneratorNpcFragmentPlain } from "@/lib/models/generator/npc/npcNameFragment.model";
import { normalizeNpcInput } from "../modules/npc/rules/normalize";
import { NpcGenerationInput } from "@/interfaces/npc.interface";
import { dispatchNpcName } from "../modules/npc/rules/name/name.dispatcher";
import { defaultNpcValues, NpcFormData } from "@/schemas/npc.schema";
import { generateNpcValues } from "../modules/npc/rules/npc.dispatcher";
import { defaultCommonFields } from "@/lib/modules/npc/rules/normalize";

export async function generateNpcName({ race }: { race?: string[] }): Promise<string> {
    await connectToDatabase();

    let fragments: GeneratorNpcFragmentPlain[] = [];

    try {
        const rawFragments = await GeneratorNpcFragment.find().lean();
        fragments = (rawFragments as unknown as GeneratorNpcFragmentPlain[]).filter(
        (f): f is GeneratorNpcFragmentPlain =>
            typeof f.type === "string" && typeof f.value === "string"
        );
    } catch (error) {
        console.warn("Failed to load npc name fragments from DB, using fallback data", error);
    }

    // Use fallback if DB fragments are empty
    /* ToDo: uncomment once fallback constants are in place
    if (!fragments.length) {
        const fallbackFragments = Object.values(NAME_FRAGMENT_MAP_BY_TYPE).flat().map(frag => ({
        ...frag,
        type: frag.type as GroupKey,
        }));

        fragments = fallbackFragments;
    }
    */

    return dispatchNpcName(fragments, { race });
}


export async function generateNpcData(
  input: NpcGenerationInput,
  rerollAll = false
): Promise<NpcFormData> {
  await connectToDatabase();

  const baseInput = rerollAll ? {
    ...defaultCommonFields,
    ...defaultNpcValues,
    ...input.overrides
  } : input;

  const normalized = normalizeNpcInput({
    ...baseInput
  })

  return await generateNpcValues(normalized);
}