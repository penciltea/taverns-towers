import mongoose, { Schema } from "mongoose";

export interface GeneratorSettlementFragmentPlain {
  type: "prefix" | "suffix";
  value: string;
  terrain?: string[];
  climate?: string[];
  weight?: number;
  tags?: string[];
}

const GeneratorFragmentSchema = new Schema<GeneratorSettlementFragmentPlain>({
  type: { type: String, enum: ["prefix", "suffix"], required: true },
  value: { type: String, required: true },
  terrain: [String],
  climate: [String],
  weight: { type: Number, default: 1 },
  tags: [String]
});

export default mongoose.models.GeneratorFragment ||
  mongoose.model<GeneratorSettlementFragmentPlain>("GeneratorFragment", GeneratorFragmentSchema, 'generator_settlement_names');
