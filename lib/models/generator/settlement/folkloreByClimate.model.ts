import mongoose from "mongoose";
import { CLIMATE_TYPES, ClimateTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface FolkloreByClimateModel {
    climate: ClimateTypes,
    folklore: string[];
}

const FolkloreByClimateSchema = new Schema<FolkloreByClimateModel>({
    climate: { type: String, enum: CLIMATE_TYPES, required: true, unique: true },
    folklore: { type: [String], required: true }
});

export const FolkloreByClimate = 
    (models?.FolkloreByClimate as mongoose.Model<FolkloreByClimateModel>) ||
    model<FolkloreByClimateModel>(
        "FolkloreByClimate",
        FolkloreByClimateSchema,
        "generator_folklore_by_climate"
    )
