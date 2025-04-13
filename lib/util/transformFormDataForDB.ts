import { TownFormData } from "@/schemas/townSchema";

export function transformTownFormData(data: TownFormData) {
    return {
      ...data,
      tags: data.tags?.join(",") || "",
      terrain: data.terrain?.join(",") || "",
      map:
        typeof data.map === "string" && data.map.startsWith("http")
          ? data.map
          : undefined,
    };
  }
  