import mongoose from "mongoose";
import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface HolidaysByTerrainModel {
    terrain: TerrainTypes,
    holidays: string[];
}

const HolidaysByTerrainSchema = new Schema<HolidaysByTerrainModel>({
    terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true },
    holidays: { type: [String], required: true }
});

export const HolidaysByTerrain = 
    (models?.HolidaysByTerrain as mongoose.Model<HolidaysByTerrainModel>) ||
    model<HolidaysByTerrainModel>(
        "HolidaysByTerrain",
        HolidaysByTerrainSchema,
        "generator_holidays_by_terrain"
    )
