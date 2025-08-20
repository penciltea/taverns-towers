import { NpcConnectionType } from "@/constants/npc.options";
import mongoose from "mongoose";
import { Npc } from "./npc.interface";
import { TypographyProps } from "@mui/material";

export interface ConnectionProps{
  connections: Npc['connections'];
  variant?: TypographyProps["variant"]; // Optional for updating EntityLinkList title variant
  pageSiteType?: string; // optional, used for label lookup on EntityLinkList
}

export interface NpcConnection {
  type: NpcConnectionType;
  id: string;
  role: string;
  label?: string;
}

export interface Connection {
  type: string; // "npc" | "settlement" | "site", etc.
  id: mongoose.Types.ObjectId;
  role: string;
  label?: string;
}