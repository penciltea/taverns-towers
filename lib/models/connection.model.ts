import { Schema} from "mongoose";
import { NPC_CONNECTION_TYPE } from "@/constants/npc.options";

export const connectionSchema = new Schema(
  {
    type: { type: String, enum: NPC_CONNECTION_TYPE, required: true },
    id: { type: Schema.Types.ObjectId, required: true, refPath: "connections.type" },
    role: { type: String, default: "" }
  },
  { _id: false }
);