import mongoose from 'mongoose';

const townSchema = new mongoose.Schema({
  townName: { type: String, required: true },
  size: String,
  tags: [{type: String}],
  mapUrl: String,
  terrain: [String],
  climate: String,
  magic: String,
  commonRaces: String,
  publicNotes: String,
  gmNotes: String,
  leader: String,
  rulingStyle: String,
  wealth: String,
  tradeNotes: String,
  guilds: String,
  majorReligions: String,
  holidays: String,
  folklore: String,
  crime: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Town || mongoose.model('Town', townSchema);
