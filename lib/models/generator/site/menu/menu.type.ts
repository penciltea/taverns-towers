import { SiteCategory, SiteShopType } from "@/constants/site/site.options";
import { SiteGuildType } from "@/constants/site/guild.options";
import { Types } from "mongoose";

export interface MenuItemMappingEntry {
  siteType: SiteCategory;
  shopType?: SiteShopType;
  guildType?: SiteGuildType;
  itemId: Types.ObjectId;
}
