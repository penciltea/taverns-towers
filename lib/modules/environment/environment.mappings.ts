import { TerrainTypes, ClimateTypes, TagTypes } from "@/constants/environmentOptions";

 export const TerrainBlacklistMapping: Record<ClimateTypes, TerrainTypes[]> = {
  Polar: ["Jungle", "Desert"],
  Temperate: [],
  Tropical: ["Tundra"],
  Dry: ["Swamp", "Tundra", "Jungle"],
  Continental: [],
};

export const TagsByTerrainMapping: Record<TerrainTypes, TagTypes[]> = {
  Coast: ["Port", "Fishing"],
  Desert: ["Nomadic", "Ancient Ruins"],
  Forest: ["Druidic", "Overgrown", "Hidden"],
  Hills: ["Remote", "Border Post", "Ancient Ruins"],
  Jungle: ["Overgrown", "Infested"],
  Mountains: ["Mining Camp", "Remote"],
  Plains: ["Agricultural", "Trade Hub"],
  River: ["Port", "Druidic", "Fishing", "Trade Hub", "Capital"],
  Swamp: ["Overgrown", "Isolated", "Infested", "Hidden"],
  Tundra: ["Isolated", "Border Post", "Garrison", "Fortress", "Ancient Ruins"],
  Underground: ["Mining Camp", "Prison Settlement", "Ancient Ruins", "Hidden"],
  Urban: ["Capital", "Criminal Hideout", "Border Post", "Trade Hub", "Military Outpost"]
};