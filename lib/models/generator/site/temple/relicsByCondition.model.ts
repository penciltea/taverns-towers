import mongoose from "mongoose";
import { SiteCondition, SITE_CONDITION } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

const conditionValues = SITE_CONDITION.map(option => option.value);

export interface RelicByConditionModel {
    condition: SiteCondition,
    relics: string[];
}

const RelicByConditionSchema = new Schema<RelicByConditionModel>({
    condition: { type: String, enum: conditionValues, required: true, unique: true },
    relics: { type: [String], required: true }
});

export const RelicByCondition = 
    (models?.RelicByCondition as mongoose.Model<RelicByConditionModel>) ||
    model<RelicByConditionModel>(
        "RelicByCondition",
        RelicByConditionSchema,
        "generator_temple_relics_by_condition"
    )
