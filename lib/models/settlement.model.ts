import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { SizeTypes, WealthLevel, MagicLevel, RulingType, CriminalActivityTypes} from '@/constants/settlementOptions';
import { ClimateTypes, TerrainTypes, TagTypes } from '@/constants/environmentOptions';
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
  leader: string;
  rulingStyle: RulingType;
  wealth: WealthLevel;
  tradeNotes: string;
  guilds: string;
  domains: string[];
  holidays: string;
  folklore: string;
  crime: CriminalActivityTypes[];
  createdBy: Types.ObjectId;
  isPublic: boolean;
}


const SettlementSchema = new Schema<ISettlement>(
  {
    name: { type: String, required: true },
    size: { type: String, required: false},
    tags: [String],
    map: { type: String, required: false},
    terrain: [{ type: String }],
    climate: { type: String, required: false},
    magic: { type: String, required: false},
    races: { type: String, required: false},
    description: { type: String, required: false},
    publicNotes: { type: String, required: false},
    gmNotes: { type: String, required: false},
    leader: { type: String, required: false},
    rulingStyle: { type: String, required: false},
    wealth: { type: String, required: false},
    tradeNotes: { type: String, required: false},
    guilds: { type: String, required: false},
    domains: [{ type: String, required: false}],
    holidays: { type: String, required: false},
    folklore: { type: String, required: false},
    crime: [String],
    /* ToDo: Add user/auth
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, */

    isPublic: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);


SettlementSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Settlement = mongoose.models.Settlement || mongoose.model('Settlement', SettlementSchema, 'settlements');
export default Settlement;
