import mongoose from "mongoose";
import { SITE_SIZE, SITE_CONDITION, SECURITY_LEVELS, SECRECY_LEVELS, ENTERTAINMENT_VENUE_TYPES, TAVERN_ENTERTAINMENT_OFFERINGS, SHOP_TYPE_CATEGORIES } from "@/constants/siteOptions";
import { GUILD_TYPES } from "@/constants/site/guild.options";
const { Schema, models, model } = mongoose;

const sizeValues = SITE_SIZE.map(option => option.value);
const conditionValues = SITE_CONDITION.map(option => option.value);
const securityValues = SECURITY_LEVELS.map(opt => opt.value);
const secrecyValues = SECRECY_LEVELS.map(opt => opt.value);
const shopTypes = SHOP_TYPE_CATEGORIES.flatMap(group =>
  group.options.map(option => option.value)
);
const guildTypes = GUILD_TYPES.flatMap(group =>
  group.options.map(option => option.value)
);

const BaseSiteSchema = new Schema(
  {
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
    publicNotes: { type: String, required: false },
    gmNotes: { type: String, required: false },
    image: { type: String, required: false },
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
const Tavern =
  Site.discriminators?.tavern ||
  Site.discriminator(
    "tavern",
    new Schema({
      owner: { type: String, required: false },
      clientele: { type: String, required: false },
      cost: { type: String, required: false },
      entertainment: { type: [String], enum: TAVERN_ENTERTAINMENT_OFFERINGS, required: false },
      menu: [MenuItemSchema]
    })
  );

  const Temple =
  Site.discriminators?.temple ||
  Site.discriminator(
    "temple",
    new Schema({
      leader: { type: String, required: false },
      relics: { type: String, required: false },
      menu: [MenuItemSchema],
    })
  );

  const Shop =
  Site.discriminators?.shop ||
  Site.discriminator(
    "shop",
    new Schema({
      shopType: { type: String, enum: shopTypes, required: true },
      owner: { type: String, required: false },
      menu: [MenuItemSchema],
    })
  );

  const Guild =
  Site.discriminators?.guild ||
  Site.discriminator(
    "guild",
    new Schema({
      guildName: { type: String, required: true },
      name: { type: String, required: true },
      guildType: { type: String, enum: guildTypes, required: true },
      leader: { type: String, required: false },
      membershipRequirements: { type: [String], required: false },
      knownRivals: { type: String, required: false },
      menu: [MenuItemSchema],
    })
  );

  const Government =
  Site.discriminators?.government ||
  Site.discriminator(
    "government",
    new Schema({
      function: { type: String, required: false },
      officials: { type: String, required: false },
      jurisdiction: { type: String, required: false },
      security: { type: String, enum: securityValues, required: false }
    })
  );

  const Entertainment =
  Site.discriminators?.entertainment ||
  Site.discriminator(
    "entertainment",
    new Schema({
      venueType: { type: String, enum: ENTERTAINMENT_VENUE_TYPES, required: false },
      performances: { type: String, required: false },
      owner: { type: String, required: false },
      cost: { type: String, required: false },
    })
  );

  const Hidden =
  Site.discriminators?.hidden ||
  Site.discriminator(
    "hidden",
    new Schema({
      secrecy: {
        type: [String],
        enum: secrecyValues,
        default: [],
      },leader: { type: String, required: false }, 
      knownTo: { type: String, required: false },
      defenses: { type: String, required: false },
      purpose: { type: String, required: false },
    })
  );

  const Residence =
  Site.discriminators?.residence ||
  Site.discriminator(
    "residence",
    new Schema({
      occupant: { type: String, required: false },
      notableFeatures: { type: String, required: false },
    })
  );

  const Miscellaneous =
  Site.discriminators?.miscellaneous ||
  Site.discriminator(
    "miscellaneous",
    new Schema({
      features: { type: String, required: false },
      use: { type: String, required: false },
    })
  );


export default Site;
