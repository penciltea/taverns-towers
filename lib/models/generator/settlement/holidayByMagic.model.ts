import mongoose from "mongoose";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

interface HolidaysByMagicModel {
    magic: MagicLevel,
    holidays: String[];
}

const HolidaysByMagicSchema = new Schema<HolidaysByMagicModel>({
    magic: { type: String, enum: MAGIC_LEVELS, required: true, unique: true },
    holidays: { type: [String], required: false }
});

export const HolidaysByMagic = 
    (models?.HolidaysByMagic as mongoose.Model<HolidaysByMagicModel>) ||
    model<HolidaysByMagicModel>(
        "HolidaysByMagic",
        HolidaysByMagicSchema,
        "generator_holidays_by_magic"
    )
