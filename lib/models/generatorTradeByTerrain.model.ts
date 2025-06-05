import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface TradeByTerrainModel {
    trade: string[];
    terrain: TerrainTypes;
}

const TradeByTerrainSchema = new Schema<TradeByTerrainModel>({
    terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true},
    trade: { type: [String], required: true }
})

export const TradeByTerrain = 
    (mongoose.models?.TradeByTerrain as mongoose.Model<TradeByTerrainModel>) ||
    mongoose.model<TradeByTerrainModel>(
        "TradeByTerrain",
        TradeByTerrainSchema,
        "generator_trade_by_terrain"
    );