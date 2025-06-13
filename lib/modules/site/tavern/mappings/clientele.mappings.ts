import { TagTypes } from "@/constants/environmentOptions";
import { MagicLevel, SizeTypes } from "@/constants/settlementOptions";

export const BaseClienteleBySettlementSize: Record<SizeTypes, string[]> = {
  Encampment: [
    "nomads",
    "hunters",
    "traveling merchants",
    "scouts",
    "camp followers"
  ],
  Thorp: [
    "villagers",
    "farmers",
    "laborers",
    "seasonal workers"
  ],
  Hamlet: [
    "locals",
    "farmhands",
    "caravan guards",
    "wandering travelers"
  ],
  Village: [
    "locals",
    "travelers",
    "farmers",
    "craftspeople",
    "traders"
  ],
  Town: [
    "locals",
    "adventurers",
    "merchants",
    "guild members",
    "caravaners"
  ],
  City: [
    "locals",
    "sailors",
    "mercenaries",
    "scholars",
    "clergy",
    "entertainers",
    "nobles",
    "criminals"
  ],
  Metropolitan: [
    "nobles",
    "mages",
    "criminals",
    "foreign dignitaries",
    "guild elites",
    "street performers",
    "mercenaries",
    "commoners from all walks"
  ]
};

export const ClienteleByTag: Record<TagTypes, string[]> = 
{
  "Ancient Ruins": ["treasure hunters", "historians", "archaeologists"],
  "Arcane Nexus": ["mages", "arcane scholars", "magical experimenters"],
  "Border Post": ["border patrols", "messengers", "foreign travelers"],
  "Capital": ["politicians", "wealthy elites", "ambassadors"],
  "Criminal Hideout": ["thieves", "spies", "black market dealers"],
  "Druidic": ["druids", "herbalists", "forest folk"],
  "Fishing": ["fisherfolk", "dockhands", "fishmongers"],
  "Fortress": ["soldiers", "military officers", "weapon merchants"],
  "Garrison": ["guards", "soldiers", "off-duty officers"],
  "Hidden": ["outcasts", "fugitives", "secretive locals"],
  "Infested": ["monster hunters", "survivors", "paranoid travelers"],
  "Isolated": ["loners", "hermits", "self-reliant settlers"],
  "Mining Camp": ["miners", "stonecutters", "ore traders"],
  "Nomadic": ["travelers", "bards", "wandering craftspeople"],
  "Overgrown": ["scavengers", "rangers", "botanists"],
  "Port": ["sailors", "merchants", "smugglers"],
  "Prison Settlement": ["guards", "parolees", "ex-convicts"],
  "Remote": ["curious adventurers", "explorers", "lone traders"],
  "Sacred Site": ["pilgrims", "clerics", "divine scholars"],
  "Trade Hub": ["merchants", "caravan leaders", "bargain hunters"],
  "Military Outpost": ["recruits", "veterans", "commanders"]
};

export const ClienteleByMagic: Record<MagicLevel, string[]> = 
{
  "None": ["superstitious locals", "magic-averse folk", "old-fashioned traders"],
  "Low": ["hedge witches", "folk healers", "skeptical townsfolk"],
  "Moderate": ["wandering mages", "apprentices", "alchemists"],
  "High": ["wizards", "magical researchers", "enchanted item traders"],
  "Mythic": ["planar travelers", "arcane constructs", "reality-warped patrons"]
}
