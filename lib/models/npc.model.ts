import mongoose, { Schema, Document} from "mongoose";
import { NPC_AGE, NPC_ALIGNMENT, NPC_ARCHETYPE, NPC_OCCUPATION, NPC_PERSUASION, NPC_PRONOUNS, NPC_REPUTATION, NPC_STATUS, NPC_TRAITS, NpcTrait } from "@/constants/npc.options";
import { NpcConnection } from "@/interfaces/connection.interface";
import { connectionSchema } from "./connection.model";

// Flatten trait values for enum use
const persuasionValues = NPC_PERSUASION.map(option => option.value);
const reputationValues = NPC_REPUTATION.map(option => option.value);
const npcArchetypeValues: string[] = NPC_ARCHETYPE.flatMap((group) =>
  group.options.map((opt) => opt.value)
);
const npcOccupationValues: string[] = NPC_OCCUPATION.flatMap((group) =>
  group.options.map((opt) => opt.value)
);
const npcTraitValues: string[] = NPC_TRAITS.flatMap((group) =>
  group.options.map((opt) => opt.value)
);

export interface INpc extends Document {
  userId: mongoose.Types.ObjectId;
  campaignId?: mongoose.Types.ObjectId;
  name: string;
  age?: string;
  pronouns?: string;
  alignment?: string;
  height?: string;
  build?: string;
  status?: string;
  eyeColor?: string[];
  hairColor?: string[];
  hairStyle?: string;
  skinTone?: string[];
  features?: string[];
  race?: string;
  traits?: NpcTrait[];
  reputation?: string;
  archetype?: string;
  occupation?: string[];
  persuasion?: string[];
  likes?: string;
  dislikes: string;
  description?: string;
  gmNotes?: string;
  publicNotes?: string;
  connections: NpcConnection[];
  image?: string;
  favorite?: boolean;
  campaignHighlight?: boolean;
  isPublic?: boolean;
  editors?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  idempotencyKey: string;
}

const npcSchema = new Schema<INpc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: false },
    name: { type: String, required: true, trim: true },
    age: { type: String, enum: NPC_AGE },
    pronouns: { type: String, enum: NPC_PRONOUNS },
    alignment: { type: String, enum: NPC_ALIGNMENT },
    status: { type: String, enum: NPC_STATUS },
    race: { type: String },
    traits: [{ type: String, enum: npcTraitValues }],
    reputation: { type: String, enum: reputationValues },
    archetype: { type: String, enum: npcArchetypeValues },
    occupation: [{ type: String, enum: npcOccupationValues }],
    persuasion: [{ type: String, enum: persuasionValues }],
    eyeColor: [{ type: String }],
    hairColor: [{ type: String }],
    hairStyle: [{ type: String }],
    skinTone: [{ type: String }],
    features: [{ type: String }],
    height: String,
    build: String,
    likes: String,
    dislikes: String,
    description: { type: String },
    gmNotes: { type: String },
    publicNotes: { type: String },
    connections: [connectionSchema],
    image: { type: String },
    favorite: { type: Boolean, default: false },
    campaignHighlight: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    idempotencyKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

/**
 * For NPC description purposes 
*/
export type IntegumentType =
  | "skin"
  | "scales"
  | "feathers"
  | "fur"
  | "chitin"
  | "stone"
  | "metal"
  | "other";

const NpcModel = mongoose.models.NPC || mongoose.model("NPC", npcSchema, "npcs");
export default NpcModel;