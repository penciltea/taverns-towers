import mongoose, { Types } from "mongoose";
import { userTier } from "@/constants/user.options";
import { UI_THEMES } from "@/constants/ui.options";

const { Schema, model, models } = mongoose;

export interface UserModel {
  _id: Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  tier: string;
  theme: string;
  oauthProvider?: string;
  patreon?: {
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

const userSchema = new Schema<UserModel>({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  avatar: { type: String, required: false },
  tier: { type: String, enum: userTier, default: userTier[0], required: true },
  theme: { type: String, enum: UI_THEMES, default: UI_THEMES[0], required: true },
  oauthProvider: String,
  patreon: {
    tier: String,
    accessToken: String,
    refreshToken: String,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
});

export const User = models?.User
  ? (models.User as mongoose.Model<UserModel>)
  : model<UserModel>("User", userSchema, "user");
