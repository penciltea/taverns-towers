import { ClimateTypes, TerrainTypes, TagTypes } from "@/constants/environmentOptions";

export const DomainsByClimateMapping: Partial<Record<ClimateTypes, string[]>> = {
  Polar: ["Cold", "Nature", "Moon", "Protection"],
  Temperate: ["Life", "Harvest", "Nature", "Glory"],
  Tropical: ["Fertility", "Storms", "Travel", "Dreams", "Water"],
  Dry: ["Sun", "Forge", "Luck", "Glory", "Law"],
  Continental: ["Knowledge", "Law", "Death", "Magic", "Life"],
};

export const DomainsByTerrainMapping: Partial<Record<TerrainTypes, string[]>> = {
  Coast: ["Storms", "Travel", "Water", "Luck"],
  Desert: ["Sun", "Law", "Forge", "Travel"],
  Forest: ["Nature", "Dreams", "Moon", "Life", "Twilight"],
  Jungle: ["Nature", "Fertility", "Chaos", "Death", "Trickery"],
  Hills: ["Harvest", "Glory", "Protection", "War"],
  Mountains: ["Forge", "War", "Glory", "Magic"],
  Plains: ["Community", "Harvest", "Travel", "Fertility", "Life", "Sun"],
  River: ["Water", "Travel", "Life", "Harvest", "Luck"],
  Swamp: ["Death", "Shadow", "Trickery", "Nature"],
  Tundra: ["Cold", "Moon", "Protection", "Glory"],
  Underground: ["Shadow", "Magic", "Death", "Law"],
  Urban: ["Arts", "Law", "Knowledge", "Trickery", "Luck", "Magic"],
};

export const DomainsByTagMapping: Partial<Record<TagTypes, string[]>> = {
  "Ancient Ruins": ["Death", "Shadow", "Magic", "Time", "Knowledge"],
  "Arcane Nexus": ["Magic", "Time", "Dreams"],
  "Border Post": ["War", "Protection", "Law", "Travel", "Glory"],
  "Capital": ["Arts", "Beauty", "Law", "Glory", "Knowledge", "Luck", "Forge"],
  "Criminal Hideout": ["Trickery", "Shadow", "Chaos", "Luck"],
  "Druidic": ["Nature", "Fertility", "Harvest", "Moon", "Dreams"],
  "Fishing": ["Water", "Luck", "Storms", "Harvest", "Travel"],
  "Fortress": ["War", "Protection", "Forge", "Glory", "Law"],
  "Garrison": ["War", "Protection", "Glory", "Law"],
  "Hidden": ["Shadow", "Trickery", "Dreams", "Moon"],
  "Infested": ["Death", "Chaos", "Shadow", "War"],
  "Isolated": ["Protection", "Moon", "Dreams", "Cold"],
  "Mining Camp": ["Forge", "Earth", "War", "Protection"],
  "Nomadic": ["Travel", "Luck", "Dreams", "Life", "Sun"],
  "Overgrown": ["Nature", "Chaos", "Life", "Fertility", "Harvest"],
  "Port": ["Travel", "Water", "Storms", "Luck", "Trade"],
  "Prison Settlement": ["Law", "Shadow", "Death", "Protection", "Glory"],
  "Remote": ["Protection", "Moon", "Cold", "Dreams"],
  "Sacred Site": ["Life", "Light", "Glory", "Twilight", "Dreams"],
  "Trade Hub": ["Luck", "Travel", "Forge", "Glory", "Knowledge"],
  "Military Outpost": ["War", "Protection", "Law", "Glory", "Forge"],
};