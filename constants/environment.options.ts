export const TAG_TYPES = [
    "Agricultural",
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
    "Military Outpost",
    "Mining Camp",
    "Nomadic",
    "Overgrown",
    "Port",
    "Prison Settlement",
    "Remote",
    "Sacred Site",
    "Trade Hub",
];

export const TERRAIN_TYPES = [
    "Coast",
    "Desert",
    "Forest",
    "Hills",    
    "Jungle",
    "Mountains",
    "Plains",
    "River",
    "Swamp",
    "Tundra",
    "Underground",
    "Urban",
    "Volcanic"
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