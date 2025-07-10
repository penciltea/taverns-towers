import mongoose from "mongoose";
import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
import { TAVERN_ENTERTAINMENT_OFFERINGS } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

export interface EntertainmentByTagModel {
    tag: TagTypes;
    entertainment: string[];
}

const EntertainmentByTagSchema = new Schema<EntertainmentByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true },
    entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: true }
});

export const EntertainmentByTag = 
    (models?.EntertainmentByTag as mongoose.Model<EntertainmentByTagModel>) ||
    model<EntertainmentByTagModel>(
        "EntertainmentByTag",
        EntertainmentByTagSchema,
        "generator_tavern_entertainment_by_tag"
    );
