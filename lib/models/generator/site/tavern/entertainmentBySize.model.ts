import mongoose from "mongoose";
import { SITE_SIZE, SiteSize, TAVERN_ENTERTAINMENT_OFFERINGS } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

export interface EntertainmentBySizeModel {
    size: SiteSize;
    entertainment: string[];
}

const SITE_SIZE_ENUM = SITE_SIZE.map((item) => item.value);

const EntertainmentBySizeSchema = new Schema<EntertainmentBySizeModel>({
    size: { type: String, enum: SITE_SIZE_ENUM, required: true, unique: true },
    entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: true }
});

export const EntertainmentBySize = 
    (models?.EntertainmentBySize as mongoose.Model<EntertainmentBySizeModel>) ||
    model<EntertainmentBySizeModel>(
        "EntertainmentBySize",
        EntertainmentBySizeSchema,
        "generator_tavern_entertainment_by_size"
    );
