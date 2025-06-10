import mongoose from "mongoose";
import { CLIMATE_TYPES, ClimateTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

interface HolidaysByClimateModel {
    climate: ClimateTypes,
    holidays: String[];
}

const HolidaysByClimateSchema = new Schema<HolidaysByClimateModel>({
    climate: { type: String, enum: CLIMATE_TYPES, required: true, unique: true },
    holidays: { type: [String], required: false }
});

export const HolidaysByClimate = 
    (models?.HolidaysByClimate as mongoose.Model<HolidaysByClimateModel>) ||
    model<HolidaysByClimateModel>(
        "HolidaysByClimate",
        HolidaysByClimateSchema,
        "generator_holidays_by_climate"
    )
