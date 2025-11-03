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
                // Either a real user ObjectId or a placeholder
                user: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "User", 
                    required: function(this: { placeholder?: boolean }) { return !this.placeholder; } 
                },
                roles: [{ type: String, required: false }],
                    
                // Flag to mark placeholder users
                placeholder: { type: Boolean, default: false },
                    
                // For placeholders: store the email or username
                identifier: { 
                    type: String, 
                    required: function(this: { placeholder?: boolean }) { return this.placeholder; } 
                },
            }
        ],
        isPublic: { type: Boolean, default: false },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        idempotencyKey: { type: String, unique: true, sparse: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default mongoose.models.Campaign || mongoose.model<ICampaign>('Campaign', CampaignSchema, 'campaigns');