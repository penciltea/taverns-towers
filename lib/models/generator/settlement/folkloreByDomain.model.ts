import mongoose from "mongoose";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

interface FolkloreByDomainModel {
    domain: DomainTypes,
    folklore: String[];
}

const FolkloreByDomainSchema = new Schema<FolkloreByDomainModel>({
    domain: { type: String, enum: DOMAINS, required: true, unique: true },
    folklore: { type: [String], required: false }
});

export const FolkloreByDomain = 
    (models?.FolkloreByDomain as mongoose.Model<FolkloreByDomainModel>) ||
    model<FolkloreByDomainModel>(
        "FolkloreByDomain",
        FolkloreByDomainSchema,
        "generator_folklore_by_domain"
    )
