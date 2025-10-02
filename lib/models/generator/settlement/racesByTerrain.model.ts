import mongoose from "mongoose";
import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environment.options";
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
  (models?.RacesByTerrain as mongoose.Model<RacesByTerrainModel>) ||
  model<RacesByTerrainModel>(
    "RacesByTerrain", 
    RacesByTerrainSchema,
    "generator_races_by_terrain"
  );