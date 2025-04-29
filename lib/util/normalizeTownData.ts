import { TownFormData } from "@/schemas/townSchema";

export const normalizeTownData = (town: Partial<TownFormData>) => ({
    ...town,
    tags: Array.isArray(town.tags) ? town.tags.filter(tag => tag.trim() !== "") : [],
    terrain: Array.isArray(town.terrain) ? town.terrain.filter(t => t.trim() !== "") : [],
    crime: Array.isArray(town.crime) ? town.crime.filter(c => c.trim() !== "") : [],
  });