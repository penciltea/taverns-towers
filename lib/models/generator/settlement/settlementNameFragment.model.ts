import mongoose, { Schema } from "mongoose";

export interface GeneratorSettlementFragmentPlain {
  type: "prefix" | "suffix" | "noun" | "descriptor" | "connector" | "size" | "theme" | "format";
  value: string;
  terrain?: string[];
  climate?: string[];
  size?: string[];
  magic?: string[];
  wealth?: string[];
  weight?: number;
  tags?: string[];
}

const GeneratorFragmentSchema = new Schema<GeneratorSettlementFragmentPlain>({
  type: { type: String, enum: ["prefix", "suffix", "noun", "descriptor", "connector", "size", "theme", "format"], required: true },
  value: { type: String, required: true },
  terrain: [String],
  climate: [String],
  size: [String],
  magic: [String],
  wealth: [String],
  weight: { type: Number, default: 1 },
  tags: [String]
});

export default mongoose.models.GeneratorFragment ||
  mongoose.model<GeneratorSettlementFragmentPlain>("GeneratorFragment", GeneratorFragmentSchema, 'generator_settlement_names');
