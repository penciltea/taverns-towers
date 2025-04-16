import mongoose from 'mongoose';
import { Document, Types } from 'mongoose';
import { SizeTypes, TagTypes, TerrainTypes, WealthLevel, MagicLevel, ClimateTypes, RulingType} from '@/constants/townOptions';
const { Schema } = mongoose;

export interface ITown extends Document {
  _id: Types.ObjectId;
  name: string;
  size: SizeTypes;
  tags: TagTypes[];
  map: string;
  terrain: TerrainTypes[];
  climate: ClimateTypes;
  magic: MagicLevel;
  races: string;
  publicNotes: string;
  gmNotes: string;
  leader: string;
  rulingStyle: RulingType;
  wealth: WealthLevel;
  tradeNotes: string;
  guilds: string;
  religion: string;
  holidays: string;
  folklore: string;
  crime: string;
  createdBy: Types.ObjectId;
  isPublic: boolean;
}


const TownSchema = new Schema<ITown>(
  {
    name: { type: String, required: true },
    size: { type: String, required: false},
    tags: [String],
    map: { type: String, required: false},
    terrain: [String],
    climate: { type: String, required: false},
    magic: { type: String, required: false},
    races: { type: String, required: false},
    publicNotes: { type: String, required: false},
    gmNotes: { type: String, required: false},
    leader: { type: String, required: false},
    rulingStyle: { type: String, required: false},
    wealth: { type: String, required: false},
    tradeNotes: { type: String, required: false},
    guilds: { type: String, required: false},
    religion: { type: String, required: false},
    holidays: { type: String, required: false},
    folklore: { type: String, required: false},
    crime: { type: String, required: false},
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


TownSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

const Town = mongoose.models.Town || mongoose.model('Town', TownSchema, 'towns');
export default Town;
