import { LocationFormData } from "@/schemas/locationSchema";
import { SettlementFormData } from "@/schemas/settlementSchema";

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


export function transformLocationFormData(data: LocationFormData) {
  return {
    ...data,
    image:
      typeof data.image === "string" && data.image.startsWith("http")
        ? data.image
        : undefined,
  };
}
