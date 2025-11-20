import { NpcGroupKey } from "@/interfaces/npc.interface";
import mongoose from "mongoose";


export interface GeneratorNpcFragmentPlain {
  type: NpcGroupKey;
  weight?: number;
  value: string;
  race?: string[];
}


const GeneratorNpcFragmentSchema = new mongoose.Schema<GeneratorNpcFragmentPlain>({
  type: { type: String, enum: ['prefix', 'suffix', 'first', 'last', 'fullName', 'nickname', 'format'], required: true },
  value: { type: String, required: true },
  weight: { type: Number, default: 1, required: false },
  race: { type: [String], required: false },
});

export default mongoose.models.GeneratorNpcFragment ||
  mongoose.model<GeneratorNpcFragmentPlain>("GeneratorNpcFragment", GeneratorNpcFragmentSchema, 'generator_npc_names');