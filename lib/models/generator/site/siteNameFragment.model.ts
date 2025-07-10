import mongoose from "mongoose";


export interface GeneratorSiteFragmentPlain {
  type: 'prefix' | 'suffix' | 'noun' | 'person' | 'shopType' | 'format';
  weight?: number;
  value: string;
  siteType?: string[];     // e.g. ["tavern"]
  tags?: string[];          // e.g. ["hidden", "trade hub"]
  terrains?: string[];      // e.g. ["forest"]
  climates?: string[];
  shopType?: string;
  guildType?: string;
  [key: string]: any;
}


const GeneratorSiteFragmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['prefix', 'suffix', 'noun', 'person', 'format'], required: true },
  value: { type: String, required: true },
  tags: { type: [String], required: false },
  weight: { type: Number, default: 1, required: false },
  siteType: { type: [String], required: false },
  terrains: { type: [String], required: false },
  climates: { type: [String], required: false },
  shopType: { type: String, required: false },
  guildType: { type: String, required: false },
});

export default mongoose.models.GeneratorSiteFragment ||
  mongoose.model<GeneratorSiteFragmentPlain>("GeneratorSiteFragment", GeneratorSiteFragmentSchema, 'generator_site_names');