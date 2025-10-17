import { ShopSite } from "@/interfaces/site.interface";
import { SHOP_TYPE_CATEGORIES, SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { getLabelFromValue } from "../getLabelFromValue";

export function getShopTypeLabel(value: string): string {
  for (const category of SHOP_TYPE_CATEGORIES) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export function getShopSiteDetails(site: ShopSite){
    return [
        { label: "Shop Type", type: "text", value: site.shopType ? getShopTypeLabel(site.shopType) : "N/A" },
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
    ]
}

export function getShopSiteDescriptions(site: ShopSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}