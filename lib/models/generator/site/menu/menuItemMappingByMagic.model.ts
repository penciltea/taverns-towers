import { MagicLevel, MAGIC_LEVELS } from "@/constants/settlementOptions";
import { SHOP_TYPES, SITE_CATEGORIES } from "@/constants/siteOptions";
import { Schema, model, models } from "mongoose";
import { Types } from "mongoose";
import { MenuItemMappingEntry } from "./menu.type";

const siteValues = SITE_CATEGORIES.map(option => option.value);

export interface MenuItemMappingByMagicModel {
  magic: MagicLevel;
  items: MenuItemMappingEntry[];
}

// Reuse your existing menu item type
const MenuItemMappingByMagicSchema = new Schema<MenuItemMappingByMagicModel>({
  magic: {
    type: String,
    required: true,
    enum: MAGIC_LEVELS,
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
    }
  ]
});

export const MenuItemMappingByMagic =
  models.MenuItemMappingByMagic ||
  model("MenuItemMappingByMagic", MenuItemMappingByMagicSchema, "generator_site_menu_mapping_by_magic");