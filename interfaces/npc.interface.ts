import { NpcAge, NpcAlignment, NpcConnectionType, NpcPronounSet, NpcRace, NpcStatus, NpcTrait } from "@/constants/npc.options";

export interface NpcConnection {
  type: NpcConnectionType;
  id: string;
  role?: string;
  label?: string;
}

export interface Npc {
  _id: string;
  userId: string;
  name: string;
  age?: NpcAge;
  race?: NpcRace;
  pronouns?: NpcPronounSet;
  status?: NpcStatus
  alignment?: NpcAlignment
  traits?: NpcTrait[];
  image?: string;
  publicNotes?: string;
  description?: string;
  gmNotes?: string;
  isPublic: boolean;
  connections: NpcConnection[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface NpcResponse {
  success: boolean;
  npcs: Npc[];
  total: number;
  currentPage: number;
  totalPages: number;
}
