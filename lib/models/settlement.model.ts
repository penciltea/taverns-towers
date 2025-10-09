import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { SizeTypes, WealthLevel, MagicLevel, RulingType, CriminalActivityTypes, CRIMINAL_ACTIVITY_TYPES, MAGIC_LEVELS, RULING_TYPES, WEALTH_LEVELS, MilitaryPresenceTypes, MILITARY_PRESENCE_TYPES} from '@/constants/settlement.options';
import { DOMAINS, DomainTypes, THEME, ThemeTypes, TONE, ToneTypes } from '@/constants/common.options';
import { ClimateTypes, TerrainTypes, TagTypes, TAG_TYPES, TERRAIN_TYPES, CLIMATE_TYPES } from '@/constants/environment.options';
import { connectionSchema } from './connection.model';
import { NpcConnection } from '@/interfaces/connection.interface';
const { Schema } = mongoose;

const THEME_TYPES = THEME.flatMap(group =>
  group.options.map(option => option.value)
);

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
  rulingStyle: RulingType;
  military: MilitaryPresenceTypes[];
  wealth: WealthLevel;
  tradeNotes: string;
  guilds: string;
  domains: DomainTypes[];
  holidays: string;
  folklore: string;
  crime: CriminalActivityTypes[];
  tone: ToneTypes[];
  theme: ThemeTypes[];
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
    rulingStyle: { type: String, enum: RULING_TYPES, required: false },
    military: [{ type: String, enum: MILITARY_PRESENCE_TYPES, required: false}],
    wealth: { type: String, enum: WEALTH_LEVELS, required: false },
    tradeNotes: { type: String, required: false },
    guilds: { type: String, required: false },
    domains: [{ type: String,enum: DOMAINS, required: false }],
    holidays: { type: String, required: false },
    folklore: { type: String, required: false },
    tone: [{ type: String, enum: TONE, required: false}],
    theme: [{ type: String, enum: THEME_TYPES, required: false }],
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


SettlementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Settlement = mongoose.models.Settlement || mongoose.model('Settlement', SettlementSchema, 'settlements');
export default Settlement;
