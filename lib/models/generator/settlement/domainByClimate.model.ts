import { CLIMATE_TYPES, ClimateTypes } from "@/constants/environmentOptions";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface DomainsByClimateModel {
    domains: DomainTypes[];
    climate: ClimateTypes;
}

const DomainsByClimateSchema = new Schema<DomainsByClimateModel>({
    climate: { type: String, enum: CLIMATE_TYPES, required: true, unique: true},
    domains: { type: [String], enum: DOMAINS, required: true }
})

export const DomainsByClimate = 
    (models?.DomainsByClimate as mongoose.Model<DomainsByClimateModel>) ||
    model<DomainsByClimateModel>(
        "DomainsByClimate",
        DomainsByClimateSchema,
        "generator_domain_by_climate"
    );