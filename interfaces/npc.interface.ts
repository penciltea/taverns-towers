import { NpcAge, NpcAlignment, NpcConenctionType, NpcPronounSet, NpcRace, NpcStatus, NpcTrait } from "@/constants/npc.options";

export interface NpcConnection {
  type: NpcConenctionType;
  refId: string;
  relationship: string;
  roleName?: string;
  notes?: string;
}

export interface Npc {
  _id: string;
  userId: string;
  name: string;
  age: NpcAge;
  race: NpcRace;
  pronouns: NpcPronounSet;
  status: NpcStatus
  alignment: NpcAlignment
  traits: NpcTrait[];
  image?: string;
  publicNotes?: string;
  description?: string;
  gmNotes?: string;
  isPublic: boolean;
  connections: NpcConnection[];
  createdAt?: Date;
  updatedAt?: Date;
}