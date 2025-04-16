import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const BaseLocationSchema = new Schema(
  {
    townId: { type: Schema.Types.ObjectId, ref: "Town" },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    owner: { type: String },
    publicNotes: { type: String },
    gmNotes: { type: String },
    image: { type: String },
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
      menu: [String],
      roomsAvailable: { type: String },
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
