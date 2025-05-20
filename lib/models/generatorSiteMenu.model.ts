import mongoose, { Schema, Document } from "mongoose";
import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/settlementOptions";

export interface GeneratorSiteMenuPlain extends Document {
  name: string;
  description?: string;
  category?: string;
  price: string;
  siteType: string;
  shopType?: string;
  climate?: ClimateTypes[];
  terrain?: TerrainTypes[];
  tags?: TagTypes[];
}

const GeneratorSiteMenuSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  category: { type: String, required: false },
  price: { type: String, required: true },
  siteType: { type: String, required: true },
  shopType: { type: String, required: false },
  climate: { type: [String], required: false },
  terrain: { type: [String], required: false },
  tags: { type: [String], required: false }
});

export default mongoose.models.GeneratorSiteMenu ||
  mongoose.model<GeneratorSiteMenuPlain>("GeneratorSiteMenu", GeneratorSiteMenuSchema, "generator_site_menus");
