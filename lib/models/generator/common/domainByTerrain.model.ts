import { TerrainTypes, TERRAIN_TYPES } from "@/constants/environmentOptions";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface DomainsByTerrainModel {
    domains: DomainTypes[];
    terrain: TerrainTypes;
}

const DomainsByTerrainSchema = new Schema<DomainsByTerrainModel>({
    terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true},
    domains: { type: [String], enum: DOMAINS, required: true }
})

export const DomainsByTerrain = 
    (models?.DomainsByTerrain as mongoose.Model<DomainsByTerrainModel>) ||
    model<DomainsByTerrainModel>(
        "DomainsByTerrain",
        DomainsByTerrainSchema,
        "generator_domains_by_terrain"
    );