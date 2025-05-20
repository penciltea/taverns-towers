import mongoose from "mongoose";


export interface GeneratorSiteFragmentPlain {
  type: 'prefix' | 'suffix' | 'noun' | 'person' | 'storeType' | 'format';
  weight?: number;
  value: string;
  categories?: string[];    // e.g. ["tavern"]
  siteTypes?: string[];    // e.g. ["tavern"]
  tags?: string[];          // e.g. ["hidden", "trade hub"]
  terrains?: string[];      // e.g. ["forest"]
  climates?: string[];
  shopType?: string[];
  [key: string]: any;
}


const GeneratorSiteFragmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['prefix', 'suffix', 'noun', 'person', 'format'], required: true },
  value: { type: String, required: true },
  category: { type: String }, // e.g., 'tavern', 'temple', etc.
  tags: [String],
  weight: { type: Number, default: 1 },
});

export default mongoose.models.GeneratorSiteFragment ||
  mongoose.model<GeneratorSiteFragmentPlain>("GeneratorSiteFragment", GeneratorSiteFragmentSchema, 'generator_site_names');