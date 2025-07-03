import { SiteCategory, SiteGuildType, SiteShopType } from "@/constants/siteOptions";
import { Types } from "mongoose";

export interface MenuItemMappingEntry {
  siteType: SiteCategory;
  shopType?: SiteShopType;
  guildType?: SiteGuildType;
  itemId: Types.ObjectId;
}
