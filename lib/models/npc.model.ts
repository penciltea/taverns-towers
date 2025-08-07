import mongoose, { Schema } from "mongoose";
import { NPC_AGE, NPC_ALIGNMENT, NPC_CONNECTION_TYPE, NPC_PRONOUNS, NPC_RACES, NPC_STATUS, NPC_TRAITS } from "@/constants/npc.options";

// Flatten trait values for enum use
const npcTraitValues = NPC_TRAITS.flatMap((group) => group.options.map((opt) => opt.value));

// Connection subdocument schema
const connectionSchema = new Schema(
  {
    type: { type: String, enum: NPC_CONNECTION_TYPE, required: true },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "connections.type", // Dynamically reference appropriate collection
    },
    role: { type: String, required: false, default: "" },
    label: { type: String, required: false, default: "" },
  },
  { _id: false }
);

// NPC schema
const npcSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true, trim: true },
    age: { type: String, enum: NPC_AGE, required: false },
    pronouns: { type: String, enum: NPC_PRONOUNS, required: false },
    alignment: { type: String, enum: NPC_ALIGNMENT, required: false },
    status: { type: String, enum: NPC_STATUS, required: false },
    race: { type: String, enum: NPC_RACES, required: false },
    traits: [ { type: String, enum: npcTraitValues, required: false } ],
    description: { type: String, required: false },
    gmNotes: { type: String, required: false },
    publicNotes: { type: String, required: false },
    connections: [connectionSchema],
    image: { type: String, required: false },
    isPublic: { type: Boolean, default: false },
    editors: [ { type: Schema.Types.ObjectId, ref: "User", } ]
  },
  { timestamps: true }
);

const NpcModel = mongoose.models.NPC || mongoose.model("NPC", npcSchema, "npcs");
export default NpcModel;