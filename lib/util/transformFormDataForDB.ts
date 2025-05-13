import { SightFormData } from "@/schemas/sight.schema";
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


export function transformSightFormData(data: SightFormData) {
  return {
    ...data,
    image:
      typeof data.image === "string" && data.image.startsWith("http")
        ? data.image
        : undefined,
  };
}
