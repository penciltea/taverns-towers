import mongoose from "mongoose";
import { CLIMATE_TYPES, ClimateTypes, TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface TerrainBlacklistByClimate {
  climate: ClimateTypes;
  blacklistedTerrains: TerrainTypes[];
}


const TerrainBlacklistSchema = new Schema<TerrainBlacklistByClimate>({
  climate: {
    type: String,
    required: true,
    enum: CLIMATE_TYPES,
    unique: true,
  },
  blacklistedTerrains: {
    type: [String],
    required: true,
    enum: TERRAIN_TYPES,
  },
});


export const TerrainBlacklist =
  (models?.TerrainBlacklist as mongoose.Model<TerrainBlacklistByClimate>) ||
  model<TerrainBlacklistByClimate>(
    "TerrainBlacklist",
    TerrainBlacklistSchema,
    "generator_terrain_blacklists"
  );