import mongoose from "mongoose";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlement.options";
const { Schema, model, models } = mongoose;

export interface RacesByMagicModel {
  magic: MagicLevel;
  races: string[];
}

const RacesByMagicSchema = new Schema<RacesByMagicModel>({
  magic: { type: String, enum: MAGIC_LEVELS, required: true, unique: true },
  races: { type: [String], required: true },
})

export const RacesByMagic = 
  (models?.RacesByMagic as mongoose.Model<RacesByMagicModel>) ||
  model<RacesByMagicModel>(
    "RacesByMagic", 
    RacesByMagicSchema,
    "generator_races_by_magic"
  );