import mongoose from "mongoose";
import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface RacesByTagModel {
  tag: TagTypes;
  races: string[];
}

const RacesByTagSchema = new Schema<RacesByTagModel>({
  tag: { type: String, enum: TAG_TYPES, required: true, unique: true },
  races: { type: [String], required: true },
})

export const RacesByTag = 
  (models?.RacesByTag as mongoose.Model<RacesByTagModel>) ||
  model<RacesByTagModel>(
    "RacesByTag", 
    RacesByTagSchema,
    "generator_races_by_tag"
  );