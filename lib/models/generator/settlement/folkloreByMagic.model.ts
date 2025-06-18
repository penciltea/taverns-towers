import mongoose from "mongoose";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface FolkloreByMagicModel {
    magic: MagicLevel,
    folklore: string[];
}

const FolkloreByMagicSchema = new Schema<FolkloreByMagicModel>({
    magic: { type: String, enum: MAGIC_LEVELS, required: true, unique: true },
    folklore: { type: [String], required: false }
});

export const FolkloreByMagic = 
    (models?.FolkloreByMagic as mongoose.Model<FolkloreByMagicModel>) ||
    model<FolkloreByMagicModel>(
        "FolkloreByMagic",
        FolkloreByMagicSchema,
        "generator_folklore_by_magic"
    )
