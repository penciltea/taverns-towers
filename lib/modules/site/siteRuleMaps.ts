import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";

export const CommonSiteFields = {
  sizeOptions: SITE_SIZE,
  conditionOptions: SITE_CONDITION,
};

export const GUILD_TYPE_RULES: Record<string, {
  requiredTags?: string[];
  forbiddenTags?: string[];
  requiredTerrains?: string[];
  forbiddenTerrains?: string[];
  requiredClimates?: string[];
  forbiddenClimates?: string[];
}> = {
  "Adventurers' Guild": {
    requiredTags: ["Fortress", "Garrison", "Remote", "Border Post", "Trade Hub"],
  },
  "Alchemists' Guild": {
    requiredTags: ["Arcane Nexus"],
    forbiddenTerrains: ["Desert", "Tundra"],
  },
  "Artisans' Guild": {
    requiredTags: ["Urban", "Trade Hub"],
  },
  "Assassins' Guild": {
    requiredTags: ["Criminal Hideout", "Hidden", "Urban"],
  },
  "Bards' Guild": {
    requiredTags: ["Capital", "Trade Hub", "Urban"],
  },
  "Beast Tamers' Lodge": {
    requiredTerrains: ["Forest", "Jungle", "Plains", "Mountains"],
    forbiddenTags: ["Urban"],
  },
  "Blacksmiths' Guild": {
    requiredTags: ["Garrison", "Capital", "Urban"],
  },
  "Cartographers' Guild": {
    requiredTags: ["Explorers' Guild", "Border Post", "Remote", "Capital"],
  },
  "Couriers' Guild": {
    requiredTags: ["Trade Hub", "Capital", "Urban"],
  },
  "Dockworkers' Guild": {
    requiredTags: ["Port"],
    requiredTerrains: ["Coast", "River"],
  },
  "Engineers' Guild": {
    requiredTags: ["Capital", "Urban"],
  },
  "Explorers' Guild": {
    requiredTags: ["Remote", "Border Post", "Jungle", "Mountains"],
  },
  "Glassblowers' Guild": {
    requiredTags: ["Artisans' Guild", "Urban"],
    forbiddenClimates: ["Polar"],
  },
  "Healers' Guild": {
    requiredTags: ["Sacred Site", "Capital", "Urban"],
  },
  "Hunters' Guild": {
    requiredTerrains: ["Forest", "Plains", "Mountains", "Swamp"],
    forbiddenTags: ["Urban"],
  },
  "Laborers' Union": {
    requiredTags: ["Urban", "Trade Hub"],
  },
  "Mages' Guild": {
    requiredTags: ["Arcane Nexus", "Capital"],
  },
  "Merchants' Syndicate": {
    requiredTags: ["Trade Hub", "Capital"],
  },
  "Miners' Guild": {
    requiredTags: ["Mining Camp"],
    requiredTerrains: ["Mountains", "Hills", "Underground"],
  },
  "Scribes' Guild": {
    requiredTags: ["Capital", "Urban"],
  },
  "Seafarers' Brotherhood": {
    requiredTags: ["Port"],
    requiredTerrains: ["Coast", "River"],
    forbiddenTerrains: ["Desert", "Mountains", "Tundra"],
  },
  "Spy Network (Front Guild)": {
    requiredTags: ["Criminal Hideout", "Hidden"],
  },
  "Tailors' Guild": {
    requiredTags: ["Urban", "Trade Hub"],
  },
  "Thieves' Guild": {
    requiredTags: ["Criminal Hideout", "Hidden", "Urban"],
  },
  "Other": {}, // always allowed fallback
};