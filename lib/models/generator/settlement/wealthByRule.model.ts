import { SIZE_TYPES, SizeTypes, WEALTH_LEVELS, WealthLevel } from "@/constants/settlement.options";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface WealthBySizeModel {
    size: SizeTypes;
    wealth: WealthLevel[];
}

const WealthBySizeSchema = new Schema<WealthBySizeModel>({
    size: { type: String, enum: SIZE_TYPES, required: true, unique: true},
    wealth: { type: [String], enum: WEALTH_LEVELS, required: true }
})

export const WealthBySize = 
    (models?.WealthBySize as mongoose.Model<WealthBySizeModel>) ||
    model<WealthBySizeModel>(
        "WealthBySize",
        WealthBySizeSchema,
        "generator_wealth_by_sizes"
    );