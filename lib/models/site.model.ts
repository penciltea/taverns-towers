import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
import { SITE_SIZE, SITE_CONDITION, ENTERTAINMENT_VENUE_TYPES, TAVERN_ENTERTAINMENT_OFFERINGS, SHOP_TYPE_CATEGORIES } from "@/constants/site/site.options";
import { DEFENSE, KNOWN_TO, PURPOSE, SECRECY_LEVELS } from "@/constants/site/hidden.options";
import { SECURITY_LEVELS } from "@/constants/site/government.options";
import { GUILD_TYPES } from "@/constants/site/guild.options";
import { connectionSchema } from "./connection.model";
import { siteSchema } from "@/schemas/site.schema";
const { Schema, models, model } = mongoose;

const sizeValues = SITE_SIZE.map(option => option.value);
const conditionValues = SITE_CONDITION.map(option => option.value);
const securityValues = SECURITY_LEVELS.map(opt => opt.value);
const secrecyValues = SECRECY_LEVELS.map(opt => opt.value);
const knownToValues = KNOWN_TO.map(opt => opt.value);
const defenseValues = DEFENSE.map(opt => opt.value);
const purposeValues = PURPOSE.map(opt => opt.value);
const shopTypes = SHOP_TYPE_CATEGORIES.flatMap(group =>
  group.options.map(option => option.value)
);
const guildTypes = GUILD_TYPES.flatMap(group =>
  group.options.map(option => option.value)
);
const venueTypes = ENTERTAINMENT_VENUE_TYPES.map(option => option.value);


export interface IBaseSite {
  _id: mongoose.Types.ObjectId;
  campaignId?: mongoose.Types.ObjectId;
  type: string;
  updatedAt: Date;
  userId: string;
  name: string;
  siteTheme: string;
  [key: string]: unknown; // allows extra fields from discriminators
}

const BaseSiteSchema = new Schema(
  {
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: false },
    settlementId: { type: Schema.Types.ObjectId, ref: "Settlement" },
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: {
      type: String,
      enum: sizeValues,
      required: false
    },
    condition: {
      type: String,
      enum: conditionValues,
      required: false
    },
    siteTheme: [{ type: String, required: false }],
    publicNotes: { type: String, required: false },
    gmNotes: { type: String, required: false },
    image: { type: String, required: false },
    connections: [connectionSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favorite: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    editors: [{type: String, required: false}], //editors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    idempotencyKey: { type: String, unique: true, sparse: true },
  },
  { discriminatorKey: "type", timestamps: true }
);

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: false }, 
  quality: { type: String, required: false },
  quantity: { type: String, required: false },
  description: { type: String, required: false },
  price: { type: String, required: false }, //set to string to allow users to enter custom currency
});

// Avoid OverwriteModelError in dev by checking if already defined
const Site = models.Site || model("Site", BaseSiteSchema);

// Define discriminators
if (!Site.discriminators?.tavern) {
  Site.discriminator(
    "tavern",
    new Schema({
      clientele: String,
      cost: String,
      entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: false },
      menu: [MenuItemSchema]
    })
  );
}

if (!Site.discriminators?.temple) {
  Site.discriminator(
    "temple",
    new Schema({
      domains: { type: [String], required: false },
      relics: String,
      menu: [MenuItemSchema],
    })
  );
}

if (!Site.discriminators?.shop) {
  Site.discriminator(
    "shop",
    new Schema({
      shopType: { type: String, enum: shopTypes, required: true },
      menu: [MenuItemSchema],
    })
  );
}

if (!Site.discriminators?.guild) {
  Site.discriminator(
    "guild",
    new Schema({
      guildName: { type: String, required: true },
      name: { type: String, required: true },
      guildType: { type: String, enum: guildTypes, required: true },
      membershipRequirements: { type: [String], required: false },
      knownRivals: String,
      menu: [MenuItemSchema],
    })
  );
}

if (!Site.discriminators?.government) { 
  Site.discriminator(
    "government",
    new Schema({
      function: String,
      jurisdiction: String,
      security: { type: String, enum: securityValues, required: false }
    })
  );
}

if (!Site.discriminators?.entertainment) {
  Site.discriminator(
    "entertainment",
    new Schema({
      venueType: { type: String, enum: venueTypes, required: false },
      performances: String,
      cost: String,
    })
  );
}

if (!Site.discriminators?.hidden) {
  Site.discriminator(
    "hidden",
    new Schema({
      secrecy: { type: [String], enum: secrecyValues, default: [], },
      knownTo: { type: [String], enum: knownToValues, default: [], },
      defenses: { type: [String], enum: defenseValues, default: [], },
      purpose: { type: [String], enum: purposeValues, default: [], }
    })
  );
}

if (!Site.discriminators?.residence) {
  Site.discriminator(
    "residence",
    new Schema({
      notableFeatures: String,
    })
  );
}

if (!Site.discriminators?.miscellaneous) {
  Site.discriminator(
    "miscellaneous",
    new Schema({
      features: String,
      use: String,
    })
  );
}


export default Site;

export type SiteObject = InferSchemaType<typeof siteSchema>;
export type SiteDocument = HydratedDocument<SiteObject>;