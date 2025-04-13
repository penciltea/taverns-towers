import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  townId: string; // Associated Town ID
  name: string;
  type: string;
  description?: string;
  owner?: string;
  services?: string[];
  notes?: string;
  map?: string;
}

const LocationSchema: Schema = new Schema(
  {
    townId: { type: Schema.Types.ObjectId, ref: 'Town', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: false },
    owner: { type: String, required: false },
    services: [{ type: String, required: false }],
    notes: { type: String, required: false },
    map: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);