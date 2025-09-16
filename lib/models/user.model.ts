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
}

const userSchema = new Schema<UserModel>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tier: {
        type: String,
        enum: userTier,
        default: userTier[0], // "free"/"traveler"
        required: true,
    },
    theme: { 
        type: String, 
        enum: UI_THEMES, 
        required: true, 
        default: UI_THEMES[0] // "dark"
    },
    passwordHash: String,
    passwordResetToken: String,
    passwordResetExpires: Date
})

export const User = 
    (models?.User as mongoose.Model<UserModel>) ||
    model<UserModel>(
        "User",
        userSchema,
        "user"
    );