import { GroupKey } from "@/interfaces/site.interface";
import mongoose from "mongoose";


export interface GeneratorSiteFragmentPlain {
  type: GroupKey;
  weight?: number;
  value: string;
  siteType?: string[];      // e.g. ["tavern"]
  tags?: string[];          // e.g. ["hidden", "trade hub"]
  terrain?: string[];      // e.g. ["forest"]
  climate?: string[];
  shopType?: string[];        // for shop type sites
  guildType?: string[];       // for guild type sites
  venueType?: string[];       // for entertainment venue type sites
  functionType?: string[];    // for government type sites
  domain?: string[];        // for temple type sites
}


const GeneratorSiteFragmentSchema = new mongoose.Schema<GeneratorSiteFragmentPlain>({
  type: { type: String, enum: ['prefix', 'suffix', 'noun', 'person', 'siteTypeName', 'fullName', 'format'], required: true },
  value: { type: String, required: true },
  tags: { type: [String], required: false },
  weight: { type: Number, default: 1, required: false },
  siteType: { type: [String], required: false },
  terrain: { type: [String], required: false },
  climate: { type: [String], required: false },
  shopType: { type: String, required: false },
  guildType: { type: String, required: false },
  venueType: { type: String, required: false },
  functionType: { type: String, required: false }
});

export default mongoose.models.GeneratorSiteFragment ||
  mongoose.model<GeneratorSiteFragmentPlain>("GeneratorSiteFragment", GeneratorSiteFragmentSchema, 'generator_site_names');