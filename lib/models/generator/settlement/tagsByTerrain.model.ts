import mongoose from "mongoose";
import { TAG_TYPES, TagTypes, TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
const { Schema, model, models } = mongoose;

interface TagsByTerrainModel {
  terrain: TerrainTypes;
  tags: TagTypes[];
}

const TagsByTerrainSchema = new Schema<TagsByTerrainModel>({
  terrain: { type: String, enum: TERRAIN_TYPES, required: true, unique: true },
  tags: { type: [String], enum: TAG_TYPES, required: true },
});

export const TagsByTerrain =
  (models?.TagsByTerrain as mongoose.Model<TagsByTerrainModel>) ||
  model<TagsByTerrainModel>(
    "TagsByTerrain",
    TagsByTerrainSchema,
    "generator_tags_by_terrain"
  );