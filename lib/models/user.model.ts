import mongoose from "mongoose";
const { Schema, model, models } = mongoose;
import { userTier } from "@/constants/user.options";
import { UI_THEMES } from "@/constants/ui.options";

export interface UserModel {
    username: string;
    email: string;
    password: string;
    tier: string;
    theme: string;
    passwordHash: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    oauthProvider?: string;
}

const userSchema = new Schema<UserModel>({
    username: { type: String, unique: true, sparse: true }, // display name
    email: { type: String, required: true, unique: true },
    password: { 
        type: String, 
        required: function() { return !this.oauthProvider } // only required for local users
    },
    tier: { type: String, enum: userTier, default: userTier[0], required: true },
    theme: { type: String, enum: UI_THEMES, default: UI_THEMES[0], required: true },
    passwordHash: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    oauthProvider: String // "patreon", "google", etc.
});

export const User = 
    (models?.User as mongoose.Model<UserModel>) ||
    model<UserModel>(
        "User",
        userSchema,
        "user"
    );