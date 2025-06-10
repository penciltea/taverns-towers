import mongoose from "mongoose";
import { RULING_TYPES, RulingType, SIZE_TYPES, SizeTypes } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface RulingStyleBySizeModel {
    size: SizeTypes;
    rulingStyle: RulingType[];
}

const RulingStyleBySizeSchema = new Schema<RulingStyleBySizeModel>({
    size: { type: String, enum: SIZE_TYPES, required: true, unique: true },
    rulingStyle: { type: [String], enum: RULING_TYPES, required: true }
});

export const RulingStyleBySize = 
    (models?.RulingStyleBySize as mongoose.Model<RulingStyleBySizeModel>) ||
    model<RulingStyleBySizeModel>(
        "RulingStyleBySize",
        RulingStyleBySizeSchema,
        "generator_ruling_style_by_size"
    );
