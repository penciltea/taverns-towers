import mongoose from "mongoose";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlementOptions";
import { TAVERN_ENTERTAINMENT_OFFERINGS } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

export interface EntertainmentByMagicModel {
    magic: MagicLevel;
    entertainment: string[];
}

const EntertainmentByMagicSchema = new Schema<EntertainmentByMagicModel>({
    magic: { type: String, enum: MAGIC_LEVELS, required: true, unique: true },
    entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: true }
});

export const EntertainmentByMagic = 
    (models?.EntertainmentByMagic as mongoose.Model<EntertainmentByMagicModel>) ||
    model<EntertainmentByMagicModel>(
        "EntertainmentByMagic",
        EntertainmentByMagicSchema,
        "generator_tavern_entertainment_by_magic"
    );
