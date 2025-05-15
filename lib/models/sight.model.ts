import mongoose from "mongoose";
import { LOCATION_SIZE, LOCATION_CONDITION, SECURITY_LEVELS, SECRECY_LEVELS, SHOP_TYPES } from "@/constants/sightOptions";
const { Schema, models, model } = mongoose;

const sizeValues = LOCATION_SIZE.map(option => option.value);
const conditionValues = LOCATION_CONDITION.map(option => option.value);
const securityValues = SECURITY_LEVELS.map(opt => opt.value);
const secrecyValues = SECRECY_LEVELS.map(opt => opt.value);

const BaseSightSchema = new Schema(
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
  description: { type: String },
  price: { type: String }, // or Number if you prefer
});

// Avoid OverwriteModelError in dev by checking if already defined
const Sight = models.Sight || model("Sight", BaseSightSchema);

// Define discriminators
const Tavern =
  Sight.discriminators?.tavern ||
  Sight.discriminator(
    "tavern",
    new Schema({
      owner: { type: String, required: false },
      clientele: { type: String, required: false },
      cost: { type: String, required: false },
      entertainment: { type: String, required: false },
      menu: [MenuItemSchema]
    })
  );

  const Temple =
  Sight.discriminators?.temple ||
  Sight.discriminator(
    "temple",
    new Schema({
      deity: { type: String, required: false },
      leader: { type: String, required: false },
      relics: { type: String, required: false },
      services: [MenuItemSchema],
    })
  );

  const Shop =
  Sight.discriminators?.shop ||
  Sight.discriminator(
    "shop",
    new Schema({
      shopType: { type: String, enum: SHOP_TYPES, required: true },
      owner: { type: String, required: false },
      wares: [MenuItemSchema],
    })
  );

  const Guild =
  Sight.discriminators?.guild ||
  Sight.discriminator(
    "guild",
    new Schema({
      guildName: { type: String, required: false },
      guildType: { type: String, required: false },
      leader: { type: String, required: false },
      membershipRequirements: { type: String, required: false },
      knownRivals: { type: String, required: false },
      services: [MenuItemSchema],
    })
  );

  const Government =
  Sight.discriminators?.government ||
  Sight.discriminator(
    "government",
    new Schema({
      function: { type: String, required: false },
      officials: { type: String, required: false },
      jurisdiction: { type: String, required: false },
      security: { type: String, enum: securityValues, required: false }
    })
  );

  const Entertainment =
  Sight.discriminators?.entertainment ||
  Sight.discriminator(
    "entertainment",
    new Schema({
      venueType: { type: String, required: false },
      performances: { type: String, required: false },
      owner: { type: String, required: false },
      cost: { type: String, required: false },
    })
  );

  const Hidden =
  Sight.discriminators?.hidden ||
  Sight.discriminator(
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
  Sight.discriminators?.residence ||
  Sight.discriminator(
    "residence",
    new Schema({
      occupant: { type: String, required: false },
      notableFeatures: { type: String, required: false },
    })
  );

  const Miscellaneous =
  Sight.discriminators?.miscellaneous ||
  Sight.discriminator(
    "miscellaneous",
    new Schema({
      features: { type: String, required: false },
      use: { type: String, required: false },
    })
  );


export default Sight;
