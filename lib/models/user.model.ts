import mongoose, { Types } from "mongoose";
import { userTier } from "@/constants/user.options";
import { UI_THEMES } from "@/constants/ui.options";

const { Schema, model, models } = mongoose;

export interface UserModel {
  _id: Types.ObjectId;
  email?: string;
  username: string;
  avatar?: string;
  tier: string;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
  idempotencyKey: string;
  placeholder?: boolean;

  passwordHash?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  emailVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
}

const userSchema = new Schema<UserModel>({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  avatar: { type: String, required: false },
  tier: { type: String, enum: userTier, default: userTier[0], required: true },
  theme: { type: String, enum: UI_THEMES, default: UI_THEMES[0], required: true },
  idempotencyKey: { type: String, unique: true, sparse: true },
  placeholder: { type: Boolean, required: false },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  verificationTokenExpires: { type: Date, default: null },
});

export const User = models?.User
  ? (models.User as mongoose.Model<UserModel>)
  : model<UserModel>("User", userSchema, "users");
