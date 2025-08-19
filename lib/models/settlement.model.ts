import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { SizeTypes, WealthLevel, MagicLevel, RulingType, CriminalActivityTypes, CRIMINAL_ACTIVITY_TYPES, MAGIC_LEVELS, RULING_TYPES, WEALTH_LEVELS, DOMAINS, DomainTypes} from '@/constants/settlementOptions';
import { ClimateTypes, TerrainTypes, TagTypes, TAG_TYPES, TERRAIN_TYPES, CLIMATE_TYPES } from '@/constants/environmentOptions';
import { NpcConnection } from '@/interfaces/connection.interface';
import { connectionSchema } from './connection.model';
const { Schema } = mongoose;

export interface ISettlement extends Document {
  _id: Types.ObjectId;
  name: string;
  size: SizeTypes;
  tags: TagTypes[];
  map: string;
  terrain: TerrainTypes[];
  climate: ClimateTypes;
  magic: MagicLevel;
  races: string;
  description: string;
  publicNotes: string;
  gmNotes: string;
  leader?: Types.ObjectId[];
  rulingStyle: RulingType;
  wealth: WealthLevel;
  tradeNotes: string;
  guilds: string;
  domains: DomainTypes[];
  holidays: string;
  folklore: string;
  crime: CriminalActivityTypes[];
  createdBy: Types.ObjectId;
  isPublic: boolean;
  userId: Types.ObjectId;
  editors: string[];
  connections: NpcConnection[];
}


const SettlementSchema = new Schema<ISettlement>(
  {
    name: { type: String, required: true },
    size: { type: String, required: false },
    map: { type: String, required: false },
    tags: [{ type: String, enum: TAG_TYPES, required: false }],
    terrain: [{ type: String, enum: TERRAIN_TYPES, required: false }],
    climate: { type: String, enum: CLIMATE_TYPES, required: false },
    crime: [{ type: String, enum: CRIMINAL_ACTIVITY_TYPES, required: false }],
    magic: { type: String, enum: MAGIC_LEVELS, required: false },
    races: { type: String, required: false },
    description: { type: String, required: false },
    publicNotes: { type: String, required: false },
    gmNotes: { type: String, required: false },
    leader: [{ type: Schema.Types.ObjectId, ref: "NPC" }],
    rulingStyle: { type: String, enum: RULING_TYPES, required: false },
    wealth: { type: String, enum: WEALTH_LEVELS, required: false },
    tradeNotes: { type: String, required: false },
    guilds: { type: String, required: false },
    domains: [{ type: String,enum: DOMAINS, required: false }],
    holidays: { type: String, required: false },
    folklore: { type: String, required: false },
    connections: [connectionSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: { type: Boolean, default: false },
    editors: [{type: String, required: false}]
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export interface SettlementDbData extends Document {
  name: string;
  leader?: Types.ObjectId[];
}


SettlementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Settlement = mongoose.models.Settlement || mongoose.model('Settlement', SettlementSchema, 'settlements');
export default Settlement;
