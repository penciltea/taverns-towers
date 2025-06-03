import { defaultSiteValues, SiteFormData } from "@/schemas/site.schema";

export function isValidSiteCategory(value: string): value is SiteFormData["type"] {
  return Object.keys(defaultSiteValues).includes(value);
}