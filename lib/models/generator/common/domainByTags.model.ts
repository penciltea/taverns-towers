import { TAG_TYPES, TagTypes } from "@/constants/environment.options";
import { DOMAINS, DomainTypes } from "@/constants/common.options";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface DomainsByTagModel {
    domains: DomainTypes[];
    tag: TagTypes;
}

const DomainsByTagSchema = new Schema<DomainsByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true},
    domains: { type: [String], enum: DOMAINS, required: true }
})

export const DomainsByTag = 
    (models?.DomainsByTag as mongoose.Model<DomainsByTagModel>) ||
    model<DomainsByTagModel>(
        "DomainsByTag",
        DomainsByTagSchema,
        "generator_domains_by_tag"
    );