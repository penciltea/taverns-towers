import { NpcAge, NpcAlignment, NpcConnectionType, NpcPronounSet, NpcRace, NpcStatus, NpcTrait } from "@/constants/npc.options";
import { CommonInterface } from "./common.interface";

export interface NpcConnection {
  type: NpcConnectionType;
  id: string;
  role?: string;
  label?: string;
}

export interface Npc extends CommonInterface {
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
}


export interface NpcResponse {
  success: boolean;
  npcs: Npc[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export const DefaultNpcQueryParams: NpcQueryParams = {
  page: 1,
  limit: 12,
  search: '',
  age: '',
  race: '',
  pronouns: '',
  status: '',
  alignment: ''
}

export interface NpcQueryParams {
  page: number;
  limit: number;
  search: string;
  age: string;
  race: string;
  pronouns: string;
  status: string;
  alignment: string;
}