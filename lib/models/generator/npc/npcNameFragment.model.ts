import { NpcGroupKey } from "@/interfaces/npc.interface";
import mongoose from "mongoose";


export interface GeneratorNpcFragmentPlain {
  type: NpcGroupKey;
  weight?: number;
  value: string;
  race?: string[];
  [key: string]: any;
}


const GeneratorNpcFragmentSchema = new mongoose.Schema({
  type: { type: String, enum: ['prefix', 'suffix', 'first', 'last', 'fullName', 'nickname', 'format'], required: true },
  value: { type: String, required: true },
  tags: { type: [String], required: false },
  weight: { type: Number, default: 1, required: false },
  race: { type: [String], required: false },
});

export default mongoose.models.GeneratorNpcFragment ||
  mongoose.model<GeneratorNpcFragmentPlain>("GeneratorNpcFragment", GeneratorNpcFragmentSchema, 'generator_npc_names');