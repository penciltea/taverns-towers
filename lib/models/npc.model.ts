import mongoose, { Schema, Document} from "mongoose";
import { NPC_AGE, NPC_ALIGNMENT, NPC_CONNECTION_TYPE, NPC_PRONOUNS, NPC_RACES, NPC_STATUS, NPC_TRAITS, NpcRace, NpcTrait } from "@/constants/npc.options";

// Flatten trait values for enum use
const npcTraitValues: string[] = NPC_TRAITS.flatMap((group) =>
  group.options.map((opt) => opt.value)
);

const connectionSchema = new Schema(
  {
    type: { type: String, enum: NPC_CONNECTION_TYPE, required: true },
    id: { type: Schema.Types.ObjectId, required: true, refPath: "connections.type" },
    role: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

export interface INpc extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  age?: string;
  pronouns?: string;
  alignment?: string;
  status?: string;
  race?: NpcRace;
  traits?: NpcTrait[];
  description?: string;
  gmNotes?: string;
  publicNotes?: string;
  connections?: { type: string; id: mongoose.Types.ObjectId; role?: string; label?: string }[];
  image?: string;
  isPublic?: boolean;
  editors?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

const npcSchema = new Schema<INpc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    age: { type: String, enum: NPC_AGE },
    pronouns: { type: String, enum: NPC_PRONOUNS },
    alignment: { type: String, enum: NPC_ALIGNMENT },
    status: { type: String, enum: NPC_STATUS },
    race: { type: String, enum: NPC_RACES },
    traits: [{ type: String, enum: npcTraitValues }], // <-- still enforced by Mongoose
    description: { type: String },
    gmNotes: { type: String },
    publicNotes: { type: String },
    connections: [connectionSchema],
    image: { type: String },
    isPublic: { type: Boolean, default: false },
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const NpcModel = mongoose.models.NPC || mongoose.model("NPC", npcSchema, "npcs");
export default NpcModel;