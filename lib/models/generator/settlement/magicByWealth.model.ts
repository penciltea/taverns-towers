import mongoose from "mongoose";
import { WEALTH_LEVELS, WealthLevel, MAGIC_LEVELS, MagicLevel } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface MagicByWealthModel {
    wealth: WealthLevel;
    magic: MagicLevel[];
}

const MagicByWealthSchema = new Schema<MagicByWealthModel>({
    wealth: { type: String, enum: WEALTH_LEVELS, required: true, unique: true },
    magic: { type: [String], enum: MAGIC_LEVELS, required: true }
});

export const MagicByWealth = 
    (models?.MagicByWealth as mongoose.Model<MagicByWealthModel>) ||
    model<MagicByWealthModel>(
        "MagicByWealth",
        MagicByWealthSchema,
        "generator_magic_by_wealth"
    );