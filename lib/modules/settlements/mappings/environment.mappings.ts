import { TerrainTypes, ClimateTypes, TagTypes } from "@/constants/settlementOptions";

 export const TerrainBlacklistMapping: Record<ClimateTypes, TerrainTypes[]> = {
  Polar: ["Jungle", "Desert"],
  Temperate: [],
  Tropical: ["Tundra"],
  Dry: ["Swamp", "Tundra", "Jungle"],
  Continental: [],
};

export const TagsByTerrain: Record<TerrainTypes, TagTypes[]> = {
  Coast: ["Port", "Fishing"],
  Desert: ["Nomadic", "Ancient Ruins"],
  Forest: ["Druidic", "Overgrown", "Hidden"],
  Jungle: ["Overgrown", "Infested"],
  Mountains: ["Mining Camp", "Remote"],
  Plains: ["Agricultural", "Trade Hub"],
  Swamp: ["Overgrown"],
  Tundra: ["Isolated"]
};