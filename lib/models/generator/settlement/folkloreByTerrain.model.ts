import mongoose from "mongoose";
import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface FolkloreByTerrainModel {
    terrain: TerrainTypes,
    folklore: string[];
}

const FolkloreByTerrainSchema = new Schema<FolkloreByTerrainModel>({
    terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true },
    folklore: { type: [String], required: true }
});

export const FolkloreByTerrain = 
    (models?.FolkloreByTerrain as mongoose.Model<FolkloreByTerrainModel>) ||
    model<FolkloreByTerrainModel>(
        "FolkloreByTerrain",
        FolkloreByTerrainSchema,
        "generator_folklore_by_terrain"
    )
