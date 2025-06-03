import mongoose from "mongoose";
import { CRIMINAL_ACTIVITY_TYPES, CriminalActivityTypes, WEALTH_LEVELS, WealthLevel } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface CrimeByWealthModel {
    wealth: WealthLevel;
    crime: CriminalActivityTypes[];
}

const CrimeByWealthSchema = new Schema<CrimeByWealthModel>({
    wealth: { type: String, enum: WEALTH_LEVELS, required: true, unique: true },
    crime: { type: [String], enum: CRIMINAL_ACTIVITY_TYPES, required: true }
});

export const CrimeByWealth = 
    (mongoose.models?.CrimeByWealth as mongoose.Model<CrimeByWealthModel>) ||
    mongoose.model<CrimeByWealthModel>(
        "CrimeByWealth",
        CrimeByWealthSchema,
        "generator_crimes_by_wealth"
    )