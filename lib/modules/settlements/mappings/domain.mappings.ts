import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/environmentOptions";

export const DomainsByClimate: Partial<Record<ClimateTypes, string[]>> = {
  Polar: ["Winter", "Survival", "Nature", "Moon", "Protection"],
  Temperate: ["Life", "Harvest", "Nature", "Glory"],
  Tropical: ["Fertility", "Storms", "Travel", "Dreams", "Water"],
  Dry: ["Sun", "Forge", "Luck", "Glory", "Law"],
  Continental: ["Knowledge", "Law", "Death", "Arcana", "Life"],
};

export const DomainsByTerrain: Partial<Record<TerrainTypes, string[]>> = {
  Coast: ["Tempest", "Storms", "Travel", "Water", "Luck"],
  Desert: ["Sun", "Law", "Forge", "Survival", "Travel"],
  Forest: ["Nature", "Dreams", "Moon", "Life", "Twilight"],
  Jungle: ["Nature", "Fertility", "Chaos", "Death", "Trickery"],
  Hills: ["Harvest", "Glory", "Protection", "War"],
  Mountains: ["Forge", "War", "Glory", "Elements", "Arcana"],
  Plains: ["Community", "Harvest", "Travel", "Fertility", "Life", "Sun"],
  River: ["Water", "Travel", "Life", "Harvest", "Luck"],
  Swamp: ["Death", "Shadow", "Trickery", "Nature"],
  Tundra: ["Winter", "Survival", "Moon", "Protection", "Glory"],
  Underground: ["Shadow", "Arcana", "Death", "Law"],
  Urban: ["Arts", "Law", "Knowledge", "Trickery", "Luck", "Arcana"],
};

export const DomainsByTag: Partial<Record<TagTypes, string[]>> = {
  "Ancient Ruins": ["Death", "Shadow", "Arcana", "Time", "Knowledge"],
  "Arcane Nexus": ["Arcana", "Time", "Elements", "Dreams"],
  "Border Post": ["War", "Protection", "Law", "Travel", "Glory"],
  "Capital": ["Arts", "Beauty", "Law", "Glory", "Knowledge", "Luck", "Forge"],
  "Criminal Hideout": ["Trickery", "Shadow", "Chaos", "Luck"],
  "Druidic": ["Nature", "Fertility", "Harvest", "Moon", "Dreams"],
  "Fishing": ["Water", "Luck", "Tempest", "Harvest", "Travel"],
  "Fortress": ["War", "Protection", "Forge", "Glory", "Law"],
  "Garrison": ["War", "Protection", "Glory", "Law"],
  "Hidden": ["Shadow", "Trickery", "Dreams", "Moon"],
  "Infested": ["Death", "Chaos", "Shadow", "War"],
  "Isolated": ["Protection", "Moon", "Dreams", "Winter"],
  "Mining Camp": ["Forge", "Earth", "Elements", "War", "Protection"],
  "Nomadic": ["Travel", "Luck", "Dreams", "Life", "Sun"],
  "Overgrown": ["Nature", "Chaos", "Life", "Fertility", "Harvest"],
  "Port": ["Travel", "Water", "Tempest", "Luck", "Trade"],
  "Prison Settlement": ["Law", "Shadow", "Death", "Protection", "Glory"],
  "Remote": ["Protection", "Moon", "Winter", "Dreams"],
  "Sacred Site": ["Life", "Light", "Glory", "Twilight", "Dreams"],
  "Trade Hub": ["Luck", "Travel", "Forge", "Glory", "Knowledge"],
  "Military Outpost": ["War", "Protection", "Law", "Glory", "Forge"],
};