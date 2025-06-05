import { TerrainTypes } from "@/constants/environmentOptions";

export const CommonRacesByTerrain: Record<TerrainTypes, string[]> = {
  Coast: ["Humans", "Half-Elves", "Halflings", "Sea Elves", "Tritons"],
  Desert: ["Humans", "Genasi", "Dragonborn"],
  Forest: ["Elves", "Firbolgs", "Gnomes"],
  Jungle: ["Tabaxi", "Yuan-ti", "Lizardfolk"],
  Hills: ["Halflings", "Dwarves", "Humans"],
  Mountains: ["Dwarves", "Goliaths", "Dragonborn"],
  Plains: ["Humans", "Halflings", "Half-Orcs"],
  River: ["Humans", "Half-Elves", "Elves", "Tritons"],
  Swamp: ["Humans", "Lizardfolk", "Half-Orcs", "Goblins"],
  Tundra: ["Goliaths", "Snow Elves", "Humans", "Half-Elves"],
  Underground: ["Drow", "Duergar", "Deep Gnomes"],
  Urban: ["Humans", "Half-Elves", "Tieflings", "All Races"],
};