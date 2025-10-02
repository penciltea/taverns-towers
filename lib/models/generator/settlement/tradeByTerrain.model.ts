import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environment.options";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface TradeByTerrainModel {
    trade: string[];
    terrain: TerrainTypes;
}

const TradeByTerrainSchema = new Schema<TradeByTerrainModel>({
    terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true},
    trade: { type: [String], required: true }
})

export const TradeByTerrain = 
    (models?.TradeByTerrain as mongoose.Model<TradeByTerrainModel>) ||
    model<TradeByTerrainModel>(
        "TradeByTerrain",
        TradeByTerrainSchema,
        "generator_trade_by_terrain"
    );