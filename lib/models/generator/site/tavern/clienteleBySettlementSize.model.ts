import mongoose from "mongoose";
import { SIZE_TYPES, SizeTypes } from "@/constants/settlement.options";
const { Schema, model, models } = mongoose;

export interface ClienteleBySettlementSizeModel {
    size: SizeTypes;
    clientele: string[];
}

const ClienteleBySettlementSizeSchema = new Schema<ClienteleBySettlementSizeModel>({
    size: { type: String, enum: SIZE_TYPES, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleBySettlementSize = 
    (models?.ClienteleBySettlementSize as mongoose.Model<ClienteleBySettlementSizeModel>) ||
    model<ClienteleBySettlementSizeModel>(
        "ClienteleBySettlementSize",
        ClienteleBySettlementSizeSchema,
        "generator_tavern_clientele_by_settlement_size"
    );
