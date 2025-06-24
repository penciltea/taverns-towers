import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
import { SITE_CATEGORIES, SHOP_TYPES } from "@/constants/siteOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { MenuItemMappingEntry } from "./menu.type";

const siteValues = SITE_CATEGORIES.map(option => option.value);

export interface MenuItemMappingByTagModel {
  tag: TagTypes;
  items: MenuItemMappingEntry[];
}

// Reuse your existing menu item type
const MenuItemMappingByTagSchema = new Schema<MenuItemMappingByTagModel>({
  tag: {
    type: String,
    required: true,
    enum: TAG_TYPES,
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
        enum: SHOP_TYPES,
        required: false
      },
      itemId: {
        type: Types.ObjectId,
        ref: "GeneratorSiteMenuPlain", // Reference to the menu item model
        required: true,
      }
    },
  ],
});

export const MenuItemMappingByTag =
  models.MenuItemMappingByTag ||
  model("MenuItemMappingByTag", MenuItemMappingByTagSchema, "generator_site_menu_mapping_by_tag");