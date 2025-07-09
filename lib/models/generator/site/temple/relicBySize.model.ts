import mongoose from "mongoose";
import { SiteSize, SITE_SIZE } from "@/constants/siteOptions";
const { Schema, model, models } = mongoose;

const sizeValues = SITE_SIZE.map(option => option.value);

export interface RelicBySizeModel {
    size: SiteSize,
    relics: string[];
}

const RelicBySizeSchema = new Schema<RelicBySizeModel>({
    size: { type: String, enum: sizeValues, required: true, unique: true },
    relics: { type: [String], required: true }
});

export const RelicBySize = 
    (models?.RelicBySize as mongoose.Model<RelicBySizeModel>) ||
    model<RelicBySizeModel>(
        "RelicBySize",
        RelicBySizeSchema,
        "generator_temple_relics_by_size"
    )
