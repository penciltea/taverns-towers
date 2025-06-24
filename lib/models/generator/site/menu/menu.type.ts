import { SiteCategory, SiteShopType } from "@/constants/siteOptions";
import { Types } from "mongoose";

export interface MenuItemMappingEntry {
  siteType: SiteCategory;
  shopType?: SiteShopType;
  itemId: Types.ObjectId;
}
