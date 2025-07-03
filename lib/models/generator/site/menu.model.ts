import mongoose, { Schema } from "mongoose";
import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/environmentOptions";
import { QUALITY_OPTIONS, QualityType, RARITY_OPTIONS, RarityType } from "@/constants/siteOptions";
import { MAGIC_LEVELS, MagicLevel } from "@/constants/settlementOptions";

export interface GeneratorSiteMenuPlain {
  name: string;
  description?: string;
  category?: string;
  price: string;
  quality?: QualityType;
  quantity?: string;
  rarity?: RarityType;
  magic?: MagicLevel;
  siteType: string;
  shopType?: string;
  guildType?: string;
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
  magic: { type: String, enum: MAGIC_LEVELS, required: false },
  siteType: { type: String, required: true },
  shopType: { type: String, required: false },
  guildType: { type: String, required: false },
  climate: { type: [String], required: false },
  terrain: { type: [String], required: false },
  tags: { type: [String], required: false }
});

export const GeneratorSiteMenu = mongoose.models.GeneratorSiteMenu ||
  mongoose.model<GeneratorSiteMenuPlain>("GeneratorSiteMenu", GeneratorSiteMenuSchema, "generator_site_menus");
