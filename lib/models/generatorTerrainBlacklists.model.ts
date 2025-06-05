import mongoose from "mongoose";
import { CLIMATE_TYPES, ClimateTypes, TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";

export interface TerrainBlacklistByClimate {
  climate: ClimateTypes;
  blacklistedTerrains: TerrainTypes[];
}


const TerrainBlacklistSchema = new mongoose.Schema<TerrainBlacklistByClimate>({
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
  (mongoose.models?.TerrainBlacklist as mongoose.Model<TerrainBlacklistByClimate>) ||
  mongoose.model<TerrainBlacklistByClimate>(
    "TerrainBlacklist",
    TerrainBlacklistSchema,
    "generator_terrain_blacklists"
  );