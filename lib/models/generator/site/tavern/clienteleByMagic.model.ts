import mongoose from "mongoose";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlement.options";
const { Schema, model, models } = mongoose;

export interface ClienteleByMagicModel {
    magic: MagicLevel;
    clientele: string[];
}

const ClienteleByMagicSchema = new Schema<ClienteleByMagicModel>({
    magic: { type: String, enum: MAGIC_LEVELS, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleByMagic = 
    (models?.ClienteleByMagic as mongoose.Model<ClienteleByMagicModel>) ||
    model<ClienteleByMagicModel>(
        "ClienteleByMagic",
        ClienteleByMagicSchema,
        "generator_tavern_clientele_by_magic"
    );
