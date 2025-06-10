import { CLIMATE_TYPES, ClimateTypes } from "@/constants/environmentOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface TradeByClimateModel {
    trade: string[];
    climate: ClimateTypes;
}

const TradeByClimateSchema = new Schema<TradeByClimateModel>({
    climate: { type: String, enum: CLIMATE_TYPES, required: true, unique: true},
    trade: { type: [String], required: true }
})

export const TradeByClimate = 
    (models?.TradeByClimate as mongoose.Model<TradeByClimateModel>) ||
    model<TradeByClimateModel>(
        "TradeByClimate",
        TradeByClimateSchema,
        "generator_trade_by_climate"
    );