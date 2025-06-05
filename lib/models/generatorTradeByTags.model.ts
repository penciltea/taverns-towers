import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

interface TradeByTagsModel {
    trade: string[];
    tags: TagTypes;
}

const TradeByTagsSchema = new Schema<TradeByTagsModel>({
    tags: { type: String, enum: TAG_TYPES, required: true, unique: true},
    trade: { type: [String], required: true }
})

export const TradeByTags = 
    (mongoose.models?.TradeByTags as mongoose.Model<TradeByTagsModel>) ||
    mongoose.model<TradeByTagsModel>(
        "TradeByTags",
        TradeByTagsSchema,
        "generator_trade_by_tags"
    );