import mongoose from "mongoose";
import { SIZE_TYPES, SizeTypes } from "@/constants/settlementOptions";
const { Schema, model, models } = mongoose;

export interface ClienteleBySizeModel {
    size: SizeTypes;
    clientele: string[];
}

const ClienteleBySizeSchema = new Schema<ClienteleBySizeModel>({
    size: { type: String, enum: SIZE_TYPES, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleBySettlementSize = 
    (models?.ClienteleBySize as mongoose.Model<ClienteleBySizeModel>) ||
    model<ClienteleBySizeModel>(
        "ClienteleBySize",
        ClienteleBySizeSchema,
        "generator_tavern_clientele_by_size"
    );
