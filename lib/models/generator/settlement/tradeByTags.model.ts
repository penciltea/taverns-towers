import { TAG_TYPES, TagTypes } from "@/constants/environment.options";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface TradeByTagsModel {
    trade: string[];
    tags: TagTypes;
}

const TradeByTagsSchema = new Schema<TradeByTagsModel>({
    tags: { type: String, enum: TAG_TYPES, required: true, unique: true},
    trade: { type: [String], required: true }
})

export const TradeByTags = 
    (models?.TradeByTags as mongoose.Model<TradeByTagsModel>) ||
    model<TradeByTagsModel>(
        "TradeByTags",
        TradeByTagsSchema,
        "generator_trade_by_tags"
    );