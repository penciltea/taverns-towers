import mongoose from "mongoose";
import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

export interface HolidaysByTagModel {
    tag: TagTypes,
    holidays: string[];
}

const HolidaysByTagSchema = new Schema<HolidaysByTagModel>({
    tag: { type: String, enum: TAG_TYPES, required: true, unique: true },
    holidays: { type: [String], required: false }
});

export const HolidaysByTag = 
    (models?.HolidaysByTag as mongoose.Model<HolidaysByTagModel>) ||
    model<HolidaysByTagModel>(
        "HolidaysByTag",
        HolidaysByTagSchema,
        "generator_holidays_by_tag"
    )
