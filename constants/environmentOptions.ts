export const TAG_TYPES = [
    "Ancient Ruins",
    "Arcane Nexus",
    "Border Post",
    "Capital",
    "Criminal Hideout",
    "Druidic",
    "Fishing",
    "Fortress",
    "Garrison",
    "Hidden",
    "Infested",
    "Isolated",
    "Mining Camp",
    "Nomadic",
    "Overgrown",
    "Port",
    "Prison Settlement",
    "Remote",
    "Sacred Site",
    "Trade Hub",
    "Military Outpost",
];

export const TERRAIN_TYPES = [
    "Coast",
    "Desert",
    "Forest",
    "Jungle",
    "Hills",
    "Mountains",
    "Plains",
    "River",
    "Swamp",
    "Tundra",
    "Underground",
    "Urban"
];

export const CLIMATE_TYPES = [
    "Polar",
    "Temperate",
    "Tropical",
    "Dry",
    "Continental",
];

export type TagTypes = (typeof TAG_TYPES)[number]
export type TerrainTypes = (typeof TERRAIN_TYPES)[number]
export type ClimateTypes = (typeof CLIMATE_TYPES)[number]