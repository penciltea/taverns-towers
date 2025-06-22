import { TERRAIN_TYPES } from "@/constants/environmentOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface MenuItemMappingByTerrainModel {
  terrain: string;
  siteType: string;
  shopType?: string;
  items: Types.ObjectId[];
}

// Reuse your existing menu item type
const MenuItemMappingByTerrainSchema = new Schema<MenuItemMappingByTerrainModel>({
  terrain: {
    type: String,
    required: true,
    enum: TERRAIN_TYPES,
  },
  siteType: {
    type: String,
    required: true,
  },
  shopType: {
    type: String,
    required: false
  },
  items: [
    {
      type: Types.ObjectId,
      ref: "GeneratorSiteMenuPlain", // Reference to the menu item model
      required: true,
    },
  ],
});

export const MenuItemMappingByTerrain =
  models.MenuItemMappingByTerrain ||
  model("MenuItemMappingByTerrain", MenuItemMappingByTerrainSchema, "generator_tavern_menu_mapping_by_terrain");