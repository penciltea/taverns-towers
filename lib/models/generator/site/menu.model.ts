import mongoose, { Schema, Document } from "mongoose";
import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/environmentOptions";
import { QUALITY_OPTIONS, QualityType, RARITY_OPTIONS, RarityType } from "@/constants/siteOptions";

export interface GeneratorSiteMenuPlain extends Document {
  name: string;
  description?: string;
  category?: string;
  price: string;
  quality?: QualityType;
  quantity?: string;
  rarity?: RarityType;
  siteType: string[];
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
  quality: { type: String, enum: QUALITY_OPTIONS, required: false },
  quantity: { type: String, required: false },
  rarity: { type: String, enum: RARITY_OPTIONS, required: false },
  siteType: { type: String, required: true },
  shopType: { type: String, required: false },
  climate: { type: [String], required: false },
  terrain: { type: [String], required: false },
  tags: { type: [String], required: false }
});

export default mongoose.models.GeneratorSiteMenu ||
  mongoose.model<GeneratorSiteMenuPlain>("GeneratorSiteMenu", GeneratorSiteMenuSchema, "generator_site_menus");
