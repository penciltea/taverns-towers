import { ClimateTypes, TagTypes, TerrainTypes } from "@/constants/environment.options";
import { SizeTypes, WealthLevel } from "@/constants/settlement.options";

export const CommonRacesByTerrainMapping: Record<TerrainTypes, string[]> = {
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

export const RacesByTagMapping: Record<TagTypes, string[]> = {
  "Ancient Ruins": ["Elves", "Gnomes", "Tieflings", "Yuan-ti"],
  "Arcane Nexus": ["High Elves", "Tieflings", "Gnomes", "Dragonborn"],
  "Border Post": ["Humans", "Half-Orcs", "Dwarves"],
  "Capital": ["Humans", "Elves", "Dwarves", "All Races"],
  "Criminal Hideout": ["Half-Orcs", "Tieflings", "Goblins"],
  "Druidic": ["Firbolgs", "Elves", "Halflings"],
  "Fishing": ["Halflings", "Tritons", "Sea Elves"],
  "Fortress": ["Dwarves", "Humans", "Goliaths"],
  "Garrison": ["Humans", "Half-Orcs", "Dwarves"],
  "Hidden": ["Drow", "Deep Gnomes", "Tieflings"],
  "Infested": ["Goblins", "Kobolds", "Duergar"],
  "Isolated": ["Firbolgs", "Elves", "Goliaths"],
  "Mining Camp": ["Dwarves", "Gnomes", "Duergar"],
  "Nomadic": ["Tabaxi", "Halflings", "Half-Orcs"],
  "Overgrown": ["Firbolgs", "Elves", "Lizardfolk"],
  "Port": ["Humans", "Tritons", "Half-Elves"],
  "Prison Settlement": ["Half-Orcs", "Tieflings", "Humans"],
  "Remote": ["Goliaths", "Firbolgs", "Dwarves"],
  "Sacred Site": ["Aasimar", "Elves", "Gnomes"],
  "Trade Hub": ["Humans", "Half-Elves", "Dwarves", "All Races"],
  "Military Outpost": ["Humans", "Half-Orcs", "Goliaths"],
};

export const RacesByMagicMapping: Record<string, string[]> = {
  "None": ["Humans", "Dwarves", "Halflings", "Half-Orcs"],
  "Low": ["Humans", "Half-Elves", "Dwarves", "Gnomes"],
  "Moderate": ["Half-Elves", "Elves", "Gnomes", "Dragonborn"],
  "High": ["Elves", "Tieflings", "High Elves", "Gnomes", "Aasimar"],
  "Mythic": ["Elves", "Aasimar", "Genasi", "Tieflings", "Dragonborn"],
};

export const RacesByWealthMapping: Record<WealthLevel, string[]> = {
  "Impoverished": ["Half-Orcs", "Goblins", "Humans", "Lizardfolk", "Kobolds"],
  "Struggling": ["Humans", "Halflings", "Half-Orcs", "Goblins", "Gnomes"],
  "Modest": ["Humans", "Halflings", "Dwarves", "Half-Elves"],
  "Wealthy": ["Elves", "Humans", "Half-Elves", "Gnomes", "Dragonborn"],
  "Affluent": ["High Elves", "Aasimar", "Genasi", "Tieflings", "Eladrin"],
};

export const RacesByClimateMapping: Record<ClimateTypes, string[]> = {
  Polar: ["Goliaths", "Snow Elves", "Dwarves", "Half-Orcs"],
  Temperate: ["Humans", "Elves", "Halflings", "Dwarves"],
  Tropical: ["Tabaxi", "Lizardfolk", "Yuan-ti", "Tritons"],
  Dry: ["Genasi", "Dragonborn", "Humans", "Half-Orcs"],
  Continental: ["Humans", "Half-Elves", "Dwarves", "Gnomes"]
};

export const raceCountBySize: Record<SizeTypes, [number, number]> = {
  Encampment: [1, 1],
  Thorp: [1, 1],
  Hamlet: [1, 2],
  Village: [1, 3],
  Town: [2, 4],
  City: [3, 5],
  Metropolitan: [4, 6],
};