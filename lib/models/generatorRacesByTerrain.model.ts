import mongoose, { Schema } from "mongoose";

export interface RacesByTerrain {
  terrain: string;
  races: string[];
}

const RacesByTerrainSchema = new Schema<RacesByTerrain>({
  terrain: { type: String, required: true, unique: true },
  races: { type: [String], required: true },
})

export default mongoose.models.RacesByTerrain ||
  mongoose.model<RacesByTerrain>("RacesByTerrain", RacesByTerrainSchema, 'generator_npc_races');
