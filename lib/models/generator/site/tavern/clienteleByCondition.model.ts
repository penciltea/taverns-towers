import mongoose from "mongoose";
import { SiteCondition, SITE_CONDITION } from "@/constants/site/site.options";
const { Schema, model, models } = mongoose;

export interface ClienteleByConditionModel {
    condition: SiteCondition;
    clientele: string[];
}

const SITE_CONDITION_ENUM = SITE_CONDITION.map((item) => item.value);

const ClienteleByConditionSchema = new Schema<ClienteleByConditionModel>({
    condition: { type: String, enum: SITE_CONDITION_ENUM, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleByCondition = 
    (models?.ClienteleByCondition as mongoose.Model<ClienteleByConditionModel>) ||
    model<ClienteleByConditionModel>(
        "ClienteleByCondition",
        ClienteleByConditionSchema,
        "generator_tavern_clientele_by_condition"
    );
