import mongoose from "mongoose";
import { SiteSize, SITE_SIZE } from "@/constants/siteOptions";
const { Schema, model, models } = mongoose;

export interface ClienteleBySizeModel {
    size: SiteSize;
    clientele: string[];
}

const SITE_SIZE_ENUM = SITE_SIZE.map((item) => item.value);

const ClienteleBySizeSchema = new Schema<ClienteleBySizeModel>({
    size: { type: String, enum: SITE_SIZE_ENUM, required: true, unique: true },
    clientele: { type: [String], required: true }
});

export const ClienteleBySize = 
    (models?.ClienteleBySize as mongoose.Model<ClienteleBySizeModel>) ||
    model<ClienteleBySizeModel>(
        "ClienteleBySize",
        ClienteleBySizeSchema,
        "generator_tavern_clientele_by_size"
    );
