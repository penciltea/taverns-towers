import mongoose from "mongoose";


export interface GeneratorSightFragmentPlain {
  type: 'prefix' | 'suffix';
  value: string;
  category?: string;
  tags?: string[];
  weight?: number;
  [key: string]: any;
}


const GeneratorSightFragmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['prefix', 'suffix'], required: true },
  value: { type: String, required: true },
  category: { type: String }, // e.g., 'tavern', 'temple', etc.
  tags: [String],
  weight: { type: Number, default: 1 },
});

export default mongoose.models.GeneratorSightFragment ||
  mongoose.model<GeneratorSightFragmentPlain>("GeneratorSightFragment", GeneratorSightFragmentSchema, 'generator_sight_names');