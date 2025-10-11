import { Schema, model, Types, Document, Model, models } from "mongoose";

// Account document interface
export interface AccountModel extends Document {
  userId: Types.ObjectId;
  provider: "credentials" | "patreon" | string;
  providerAccountId: string;     // unique ID from the provider (email for credentials, OAuth ID for Patreon)
  accessToken?: string;          // for OAuth
  refreshToken?: string;         // for OAuth
  expiresAt?: Date;              // OAuth token expiry
  tokenType?: string;            // optional, e.g., "Bearer"
  scope?: string;                // optional, OAuth scopes
  createdAt: Date;
  updatedAt: Date;
  idempotencyKey: string;
}

// Mongoose schema
const accountSchema = new Schema<AccountModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    expiresAt: { type: Date },
    tokenType: { type: String },
    scope: { type: String },
    idempotencyKey: { type: String, unique: true, sparse: true },
  },
  {
    timestamps: true,
  }
);

// Ensure each user + provider + providerAccountId combination is unique
accountSchema.index({ userId: 1, provider: 1, providerAccountId: 1 }, { unique: true });

// Export model
const Account: Model<AccountModel> = models.accounts || model<AccountModel>("accounts", accountSchema);

export default Account;
