import { TERRAIN_TYPES, TerrainTypes } from "@/constants/environmentOptions";
import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { MenuItemMappingEntry } from "./menu.type";
import { getShopTypes } from "@/lib/util/siteHelpers";

const siteValues = SITE_CATEGORIES.map(option => option.value);

export interface MenuItemMappingByTerrainModel {
  terrain: TerrainTypes;
  items: MenuItemMappingEntry[];
}

// Reuse your existing menu item type
const MenuItemMappingByTerrainSchema = new Schema<MenuItemMappingByTerrainModel>({
  terrain: {
    type: String,
    required: true,
    enum: TERRAIN_TYPES,
  },
  items: [
    {
      siteType: {
        type: String,
        enum: siteValues,
        required: true,
      },
      shopType: {
        type: String,
        enum: getShopTypes,
        required: false
      },
      itemId: {
        type: Types.ObjectId,
        ref: "GeneratorSiteMenuPlain", // Reference to the menu item model
        required: true,
      }
    }
  ],
});

export const MenuItemMappingByTerrain =
  models.MenuItemMappingByTerrain ||
  model("MenuItemMappingByTerrain", MenuItemMappingByTerrainSchema, "generator_site_menu_mapping_by_terrain");