import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
import { DOMAINS, DomainTypes } from "@/constants/settlementOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface DomainsByTagModel {
    domains: DomainTypes[];
    tag: TagTypes;
}

const DomainsByTagSchema = new Schema<DomainsByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true},
    domains: { type: [String], enum: DOMAINS, required: true }
})

export const DomainsByTag = 
    (mongoose.models?.DomainsByTag as mongoose.Model<DomainsByTagModel>) ||
    mongoose.model<DomainsByTagModel>(
        "DomainsByTag",
        DomainsByTagSchema,
        "generator_domain_by_tag"
    );