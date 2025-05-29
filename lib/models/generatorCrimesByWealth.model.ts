
import mongoose from "mongoose";
import { CRIMINAL_ACTIVITY_TYPES, CriminalActivityTypes, WEALTH_LEVELS, WealthLevel } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface CrimesByWealthModel {
    wealth: WealthLevel;
    crime: CriminalActivityTypes[];
}

const CrimesByWealthSchema = new Schema<CrimesByWealthModel>({
    wealth: { type: String, enum: WEALTH_LEVELS, required: true, unique: true },
    crime: { type: [String], enum: CRIMINAL_ACTIVITY_TYPES, required: true }
});

export const CrimesByWealth = 
    (mongoose.models?.CrimesByWealthModel as mongoose.Model<CrimesByWealthModel>) ||
    mongoose.model<CrimesByWealthModel>(
        "CrimesByWealth",
        CrimesByWealthSchema,
        "generator_crimes_by_wealth"
    )