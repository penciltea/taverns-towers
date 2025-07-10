import { CLIMATE_TYPES, ClimateTypes } from "@/constants/environmentOptions";
import { SITE_CATEGORIES } from "@/constants/site/site.options";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { MenuItemMappingEntry } from "./menu.type";
import { getShopTypes } from "@/lib/util/siteHelpers";

const siteValues = SITE_CATEGORIES.map(option => option.value);

export interface MenuItemMappingByClimateModel {
  climate: ClimateTypes;
  items: MenuItemMappingEntry[];
}

// Reuse your existing menu item type
const MenuItemMappingByClimateSchema = new Schema<MenuItemMappingByClimateModel>({
  climate: {
    type: String,
    required: true,
    enum: CLIMATE_TYPES,
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
  ]
});

export const MenuItemMappingByClimate =
  models.MenuItemMappingByClimate ||
  model("MenuItemMappingByClimate", MenuItemMappingByClimateSchema, "generator_site_menu_mapping_by_climate");