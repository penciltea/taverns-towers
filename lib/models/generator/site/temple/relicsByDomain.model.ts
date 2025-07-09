import mongoose from "mongoose";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface RelicByDomainModel {
    domain: DomainTypes,
    relics: string[];
}

const RelicByDomainSchema = new Schema<RelicByDomainModel>({
    domain: { type: String, enum: DOMAINS, required: true, unique: true },
    relics: { type: [String], required: true }
});

export const RelicByDomain = 
    (models?.RelicByDomain as mongoose.Model<RelicByDomainModel>) ||
    model<RelicByDomainModel>(
        "RelicByDomain",
        RelicByDomainSchema,
        "generator_temple_relics_by_domain"
    )
