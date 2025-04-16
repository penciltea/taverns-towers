import mongoose from "mongoose";
const { Schema } = mongoose;

const BaseLocationSchema = new Schema({
  townId: { type: Schema.Types.ObjectId, ref: "Town" },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: {type: String, required: false},
  owner: {type: String, required: false},
  publicNotes: {type: String, required: false},
  gmNotes: {type: String, required: false},
  image: {type: String, required: false},
}, { discriminatorKey: 'type', timestamps: true });

const Location = mongoose.model("Location", BaseLocationSchema);

// Example discriminators:
const Tavern = Location.discriminator("tavern", new Schema({
  menu: [String],
  roomsAvailable: {type: String, required: false},
}));

const Temple = Location.discriminator("temple", new Schema({
  deity: {type: String, required: false},
  rituals: {type: String, required: false},
}));

const Blacksmith = Location.discriminator("blacksmith", new Schema({
  weaponsOffered: [String],
  armorTypes: [String],
}));

export default Location;
