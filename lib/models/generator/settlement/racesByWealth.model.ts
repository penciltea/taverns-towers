import mongoose from "mongoose";
import { WEALTH_LEVELS, WealthLevel } from "@/constants/settlement.options";
const { Schema, model, models } = mongoose;

export interface RacesByWealthModel {
  wealth: WealthLevel;
  races: string[];
}

const RacesByWealthSchema = new Schema<RacesByWealthModel>({
  wealth: { type: String, enum: WEALTH_LEVELS, required: true, unique: true },
  races: { type: [String], required: true },
})

export const RacesByWealth = 
  (models?.RacesByWealth as mongoose.Model<RacesByWealthModel>) ||
  model<RacesByWealthModel>(
    "RacesByWealth", 
    RacesByWealthSchema,
    "generator_races_by_wealth"
  );