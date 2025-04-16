import { TownFormData } from "@/schemas/townSchema";

export function transformTownFormData(data: TownFormData) {
  return {
    ...data,
    tags: data.tags || [],
    terrain: data.terrain || [],
    map:
      typeof data.map === "string" && data.map.startsWith("http")
        ? data.map
        : undefined,
  };
}
