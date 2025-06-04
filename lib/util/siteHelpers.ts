import { SITE_CATEGORIES } from "@/constants/siteOptions";
import { SiteCategory } from "@/constants/siteOptions";

export function isValidSiteCategory(value: string | null): value is SiteCategory {
  if (typeof value !== "string") return false;
  return SITE_CATEGORIES.some((category) => category.value === value);
}