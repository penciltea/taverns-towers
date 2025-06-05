import mongoose from "mongoose";
import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface RacesByTerrainModel {
  terrain: TerrainTypes;
  races: string[];
}

const RacesByTerrainSchema = new Schema<RacesByTerrainModel>({
  terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true },
  races: { type: [String], required: true },
})

export const RacesByTerrain = 
  (mongoose.models?.RacesByTerrain as mongoose.Model<RacesByTerrainModel>) ||
  mongoose.model<RacesByTerrainModel>(
    "RacesByTerrain", 
    RacesByTerrainSchema,
    "generator_races_by_terrain"
  );