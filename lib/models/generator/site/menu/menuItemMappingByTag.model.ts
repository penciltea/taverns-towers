import { TAG_TYPES, TagTypes } from "@/constants/environmentOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface MenuItemMappingByTagModel {
  tag: TagTypes;
  siteType: string;
  shopType?: string;
  items: Types.ObjectId[];
}

// Reuse your existing menu item type
const MenuItemMappingByTagSchema = new Schema<MenuItemMappingByTagModel>({
  tag: {
    type: String,
    required: true,
    enum: TAG_TYPES,
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

export const MenuItemMappingByTag =
  models.MenuItemMappingByTag ||
  model("MenuItemMappingByTag", MenuItemMappingByTagSchema, "generator_site_menu_mapping_by_tag");