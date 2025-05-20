import { SiteFormData } from "@/schemas/site.schema";
import { SettlementFormData } from "@/schemas/settlement.schema";

export function transformSettlementFormData(data: SettlementFormData) {
  return {
    ...data,
    tags: data.tags || [],
    terrain: data.terrain || [],
    crime: data.crime || [],
    map:
      typeof data.map === "string" && data.map.startsWith("http")
        ? data.map
        : undefined,
  };
}


export function transformSiteFormData(data: SiteFormData) {
  return {
    ...data,
    image:
      typeof data.image === "string" && data.image.startsWith("http")
        ? data.image
        : undefined,
  };
}
