import { LocationFormData } from "@/schemas/locationSchema";
import { TownFormData } from "@/schemas/townSchema";

export function transformTownFormData(data: TownFormData) {
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
