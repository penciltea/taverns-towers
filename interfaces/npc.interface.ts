import { NpcAge, NpcAlignment, NpcConnectionType, NpcPronounSet, NpcRace, NpcStatus, NpcTrait } from "@/constants/npc.options";
import { CommonInterface } from "./common.interface";
import { DialogProps } from "@mui/material";
import { NpcFormData } from "@/schemas/npc.schema";

export interface NpcConnection {
  type: NpcConnectionType;
  id: string;
  role?: string;
  label?: string;
}

export interface Npc extends CommonInterface {
  age?: NpcAge;
  race?: NpcRace;
  pronouns?: NpcPronounSet;
  status?: NpcStatus;
  alignment?: NpcAlignment
  traits?: NpcTrait[];
  image?: string;
  description?: string;
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

export interface NpcDialogProps extends DialogProps {
  npc: Npc;
}

export type NpcFormFieldProps = {
  generator?: {
    name?: (target?: string ) => Promise<void> | void;
  };
};

export interface NpcGenerationContext {
  age?: string;
  race?: string;
  pronouns?: string;
  alignment?: string;
  status?: string;
  traits?: string[];
  reroll?: boolean;
}


// For site name generation fragments
export type NpcGroupKey =
  | "prefix"
  | "suffix"
  | "first"
  | "last"
  | "nickname"
  | "fullName"
  | "format";

export interface GenerateNpcNameOptions {
  race?: string[];
  data?: Partial<NpcFormData>;
}

export interface NpcGenerationInput extends NpcGenerationContext {
  overrides?: Partial<NpcFormData>;
}