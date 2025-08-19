import { NpcConnectionType } from "@/constants/npc.options";
import mongoose from "mongoose";

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