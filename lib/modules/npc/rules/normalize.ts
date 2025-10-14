import { CommonInterface } from "@/interfaces/common.interface";
import { NpcConnection } from "@/interfaces/connection.interface";
import { Npc } from "@/interfaces/npc.interface";


export type NormalizedCommonInput = Omit<CommonInterface, '_id' | 'createdAt' | 'updatedAt'>;

export function normalizeCommonInput(data: Partial<CommonInterface>): NormalizedCommonInput {
  return {
    name: data.name?.trim() || "Untitled",
    userId: data.userId || "",
    editors: data.editors ?? [],
    isPublic: data.isPublic ?? false,
    publicNotes: data.publicNotes?.trim() || "",
    gmNotes: data.gmNotes?.trim() || "",
  };
}

export const defaultCommonFields: NormalizedCommonInput = {
  name: "",
  userId: "",
  editors: [],
  isPublic: false,
  publicNotes: "",
  gmNotes: "",
};

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

    const normalizedConnections: NpcConnection[] = Array.isArray(data.connections)
    ? data.connections
        .filter((c): c is NpcConnection => !!c && "type" in c && "id" in c && "role" in c)
    : [];
    
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
        connections: normalizedConnections,
    };
}