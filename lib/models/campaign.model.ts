import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import { TONE, ToneTypes}  from "@/constants/common.options";
import { Player } from "@/interfaces/campaign.interface";

const { Schema } = mongoose;

export interface ICampaign extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
    tone: ToneTypes[];
    isPublic: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    idempotencyKey: string;
    players: Player[];
}

const CampaignSchema = new Schema<ICampaign>(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        tone: [{ type: String, enum: TONE, required: false }],
        isPublic: { type: Boolean, required: true, default: false },
        userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        idempotencyKey: { type: String, unique: true, sparse: true },
        players: [
            {
                userId: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
                role: { type: String, enum: ['editor', 'viewer'], required: false },
            }
        ],
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema, 'campaigns');