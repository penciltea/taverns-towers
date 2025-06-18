import mongoose from "mongoose";
import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface FolkloreByTagModel {
    tag: TagTypes,
    folklore: string[];
}

const FolkloreByTagSchema = new Schema<FolkloreByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true },
    folklore: { type: [String], required: true }
});

export const FolkloreByTag = 
    (models?.FolkloreByTag as mongoose.Model<FolkloreByTagModel>) ||
    model<FolkloreByTagModel>(
        "FolkloreByTag",
        FolkloreByTagSchema,
        "generator_folklore_by_tag"
    )
