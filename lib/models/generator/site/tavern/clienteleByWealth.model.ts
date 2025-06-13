import mongoose from "mongoose";
import { WealthLevel, WEALTH_LEVELS } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface ClienteleByWealthModel {
    wealth: WealthLevel;
    clientele: string[];
}

const ClienteleByWealthSchema = new Schema<ClienteleByWealthModel>({
    wealth: { type: String, enum: WEALTH_LEVELS, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleByWealth = 
    (models?.ClienteleByWealth as mongoose.Model<ClienteleByWealthModel>) ||
    model<ClienteleByWealthModel>(
        "ClienteleByWealth",
        ClienteleByWealthSchema,
        "generator_tavern_clientele_by_wealth"
    );
