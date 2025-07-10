import mongoose from "mongoose";
import { SiteCondition, SITE_CONDITION, TAVERN_ENTERTAINMENT_OFFERINGS } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

export interface EntertainmentByConditionModel {
    condition: SiteCondition;
    entertainment: string[];
}

const SITE_CONDITION_ENUM = SITE_CONDITION.map((item) => item.value);

const EntertainmentByConditionSchema = new Schema<EntertainmentByConditionModel>({
    condition: { type: String, enum: SITE_CONDITION_ENUM, required: true, unique: true },
    entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: true }
});

export const EntertainmentByCondition = 
    (models?.EntertainmentByCondition as mongoose.Model<EntertainmentByConditionModel>) ||
    model<EntertainmentByConditionModel>(
        "EntertainmentByCondition",
        EntertainmentByConditionSchema,
        "generator_tavern_entertainment_by_condition"
    );
