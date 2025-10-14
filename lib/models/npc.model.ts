import mongoose, { Schema, Document} from "mongoose";
import { NPC_AGE, NPC_ALIGNMENT, NPC_ARCHETYPE, NPC_OCCUPATION, NPC_PERSUASION, NPC_PRONOUNS, NPC_RACES, NPC_REPUTATION, NPC_STATUS, NPC_TRAITS, NpcRace, NpcTrait } from "@/constants/npc.options";
import { NpcConnection } from "@/interfaces/connection.interface";
import { connectionSchema } from "./connection.model";

// Flatten trait values for enum use
const raceValues = NPC_RACES.map(option => option.value);
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
  name: string;
  age?: string;
  pronouns?: string;
  alignment?: string;
  status?: string;
  race?: NpcRace;
  traits?: NpcTrait[];
  reputation?: string;
  archetype?: string;
  occupation?: string[];
  persuasion?: string[];
  description?: string;
  gmNotes?: string;
  publicNotes?: string;
  connections: NpcConnection[];
  image?: string;
  isPublic?: boolean;
  editors?: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  idempotencyKey: string;
}

const npcSchema = new Schema<INpc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    age: { type: String, enum: NPC_AGE },
    pronouns: { type: String, enum: NPC_PRONOUNS },
    alignment: { type: String, enum: NPC_ALIGNMENT },
    status: { type: String, enum: NPC_STATUS },
    race: { type: String, enum: raceValues },
    traits: [{ type: String, enum: npcTraitValues }],
    reputation: { type: String, enum: reputationValues },
    archetype: { type: String, enum: npcArchetypeValues },
    occupation: [{ type: String, enum: npcOccupationValues }],
    persuasion: [{ type: String, enum: persuasionValues }],
    description: { type: String },
    gmNotes: { type: String },
    publicNotes: { type: String },
    connections: [connectionSchema],
    image: { type: String },
    isPublic: { type: Boolean, default: false },
    editors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    idempotencyKey: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const NpcModel = mongoose.models.NPC || mongoose.model("NPC", npcSchema, "npcs");
export default NpcModel;