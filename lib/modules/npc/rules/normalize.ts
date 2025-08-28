import { Npc } from "@/interfaces/npc.interface";
import { normalizeCommonInput } from "@/lib/util/normalizeData";

// All required fields after normalization
export type NormalizedNpcInput = Omit<Npc, '_id' | 'createdAt' | 'updatedAt'> &  {
    race: string;
    age: string;
    pronouns: string;
    alignment: string;
    status: string;
    traits: string[];
  };

export function normalizeNpcInput(data: Partial<Npc>): NormalizedNpcInput {
    const common = normalizeCommonInput(data);
    
    return {
        ...common,
        ...data,
        race: !data.race || data.race.trim() === "" ? "random" : data.race,
        age: !data.age || data.age.trim() === "" ? "random" : data.age,
        pronouns: !data.pronouns || data.pronouns.trim() === "" ? "random" : data.pronouns,
        alignment: !data.alignment || data.alignment.trim() === "" ? "random" : data.alignment,
        status: !data.status || data.status.trim() === "" ? "random" : data.status,
        traits: !data.traits || data.traits.length === 0 ? ["random"] : data.traits,
        image: data.image,
        description: data.description,
        connections: data.connections ?? [],
    };
}