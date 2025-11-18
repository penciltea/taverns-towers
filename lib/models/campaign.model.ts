import mongoose from "mongoose";
import { Document, Types } from "mongoose";
import { TONE, ToneTypes}  from "@/constants/common.options";
import { PlayerForDB } from "@/interfaces/campaign.interface";
import { GENRES } from "@/constants/campaign.options";

const { Schema } = mongoose;

const GenreTypes = GENRES.flatMap(group =>
  group.options.map(option => option.value)
);

export interface ICampaign extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    genre?: string[];
    tone?: ToneTypes[];
    rules?: string;
    links?: string[];
    highlights?: string[];
    players: PlayerForDB[];
    allowedRaces?: string[];
    generatorDomains?: string[];
    generatorMagic?: string[];
    isActive: boolean;
    isPublic: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    idempotencyKey: string;
}

const CampaignSchema = new Schema<ICampaign>(
    {
        name: { type: String, required: true },
        description: { type: String, required: false },
        genre: [{ type: String, enum: GenreTypes, required: false }],
        tone: [{ type: String, enum: TONE, required: false }],
        rules: { type: String, required: false },
        links: [{ type: String, required: false }],
        highlights: [{ String }],
        players: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: function(this: { placeholder?: boolean }) {
                        return !this.placeholder; // required if not a placeholder
                    },
                },
                roles: [{ type: String }],
                placeholder: { type: Boolean, default: false },
                identifier: {
                    type: String,
                    required: function(this: { placeholder?: boolean }) {
                        return !!this.placeholder; // required if placeholder
                    },
                },
            }
        ],
        allowedRaces: [{ type: String, required: false}],
        generatorDomains: [{ type: String, required: false }],
        generatorMagic: [{ type: String, required: false }],
        isActive: { type: Boolean, default: true },
        isPublic: { type: Boolean, default: false },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        idempotencyKey: { type: String, unique: true, sparse: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

const CampaignModel = mongoose.models.Campaign || mongoose.model("Campaign", CampaignSchema, "campaigns");
export default CampaignModel;