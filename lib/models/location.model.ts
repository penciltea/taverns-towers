import mongoose from "mongoose";
import { LOCATION_SIZE, LOCATION_CONDITION } from "@/constants/locationOptions";
const { Schema, models, model } = mongoose;

const sizeValues = LOCATION_SIZE.map(option => option.value);
const conditionValues = LOCATION_CONDITION.map(option => option.value);

const BaseLocationSchema = new Schema(
  {
    townId: { type: Schema.Types.ObjectId, ref: "Town" },
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: {
      type: String,
      enum: sizeValues,
      default: 'modest',
      required: false
    },
    condition: {
      type: String,
      enum: conditionValues,
      default: 'modest',
      required: false
    },
    owner: { type: String, required: false },
    publicNotes: { type: String, required: false },
    gmNotes: { type: String, required: false },
    image: { type: String,required: false },
  },
  { discriminatorKey: "type", timestamps: true }
);

// Avoid OverwriteModelError in dev by checking if already defined
const Location = models.Location || model("Location", BaseLocationSchema);

// Define discriminators
const Tavern =
  Location.discriminators?.tavern ||
  Location.discriminator(
    "tavern",
    new Schema({
      clientele: { type: String, required: false },
      cost: { type: String, required: false },
      entertainment: { type: String, required: false }
    })
  );

const Temple =
  Location.discriminators?.temple ||
  Location.discriminator(
    "temple",
    new Schema({
      deity: { type: String },
      rituals: { type: String },
    })
  );

const Blacksmith =
  Location.discriminators?.blacksmith ||
  Location.discriminator(
    "blacksmith",
    new Schema({
      weaponsOffered: [String],
      armorTypes: [String],
    })
  );

export default Location;
