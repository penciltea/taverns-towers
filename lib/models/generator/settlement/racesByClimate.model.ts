import mongoose from "mongoose";
import { ClimateTypes, CLIMATE_TYPES } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface RacesByClimateModel {
  climate: ClimateTypes;
  races: string[];
}

const RacesByClimateSchema = new Schema<RacesByClimateModel>({
  climate: { type: String, enum: CLIMATE_TYPES, required: true, unique: true },
  races: { type: [String], required: true },
})

export const RacesByClimate = 
  (models?.RacesByClimate as mongoose.Model<RacesByClimateModel>) ||
  model<RacesByClimateModel>(
    "RacesByClimate", 
    RacesByClimateSchema,
    "generator_races_by_climate"
  );