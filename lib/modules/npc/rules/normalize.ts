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
    favorite: data.favorite ?? false
  };
}

export const defaultCommonFields: NormalizedCommonInput = {
  name: "",
  userId: "",
  editors: [],
  isPublic: false,
  publicNotes: "",
  gmNotes: "",
  favorite: false
};

// All required fields after normalization
export type NormalizedNpcInput = Omit<Npc, '_id' | 'createdAt' | 'updatedAt'> &  {
    race: string;
    age: string;
    pronouns: string;
    alignment: string;
    status: string;
    traits: string[];
    archetype: string;
    occupation: string[];
    height: string;
    build: string;
    skinTone: string[];
    hairColor: string[];
    hairStyle: string[];
    eyeColor: string[];
    features: string[];
    persuasion: string[];
    reputation: string;
    likes: string;
    dislikes: string;
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
        archetype: !data.archetype || data.archetype.trim() === "" ? "random" : data.archetype,
        occupation: !data.occupation || data.occupation.length === 0 ? ["random"] : data.occupation,
        height: !data.height || data.height.trim() === "" ? "random" : data.height,
        build: !data.build || data.build.trim() === "" ? "random" : data.build,
        skinTone: !data.skinTone || data.skinTone.length === 0 ? ["random"] : data.skinTone,
        hairColor: !data.hairColor || data.hairColor.length === 0 ? ["random"] : data.hairColor,
        hairStyle: !data.hairStyle || data.hairStyle.length === 0 ? ["random"] : data.hairStyle,
        eyeColor: !data.eyeColor || data.eyeColor.length === 0 ? ["random"] : data.eyeColor,
        features: !data.features || data.features.length === 0 ? ["random"] : data.features,
        persuasion: !data.persuasion || data.persuasion.length === 0 ? ["random"] : data.persuasion,
        reputation: !data.reputation || data.reputation.trim() === "" ? "random" : data.reputation,
        likes: data.likes?.trim() || "",
        dislikes: data.dislikes?.trim() || "",
        image: data.image,
        description: data.description,
        connections: normalizedConnections,
    };
}