import mongoose from "mongoose";
import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface ClienteleByTagModel {
    tag: TagTypes;
    clientele: string[];
}

const ClienteleByTagSchema = new Schema<ClienteleByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleByTag = 
    (models?.ClienteleByTag as mongoose.Model<ClienteleByTagModel>) ||
    model<ClienteleByTagModel>(
        "ClienteleByTag",
        ClienteleByTagSchema,
        "generator_tavern_clientele_by_tag"
    );
