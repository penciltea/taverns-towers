import { CLIMATE_TYPES } from "@/constants/environmentOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface MenuItemMappingByClimateModel {
  climate: string;
  siteType: string;
  shopType?: string;
  items: Types.ObjectId[];
}

// Reuse your existing menu item type
const MenuItemMappingByClimateSchema = new Schema<MenuItemMappingByClimateModel>({
  climate: {
    type: String,
    required: true,
    enum: CLIMATE_TYPES,
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

export const MenuItemMappingByClimate =
  models.MenuItemMappingByClimate ||
  model("MenuItemMappingByClimate", MenuItemMappingByClimateSchema, "generator_menu_item_mapping_by_climate");