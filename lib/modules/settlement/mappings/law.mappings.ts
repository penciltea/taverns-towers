import { TagTypes } from "@/constants/environment.options";
import { SizeTypes, WealthLevel, WEALTH_LEVELS, CriminalActivityTypes, MilitaryPresenceTypes, MagicLevel, RulingType } from "@/constants/settlement.options";

export const WealthBySizeMapping: Record<SizeTypes, WealthLevel[]> = {
  Encampment: WEALTH_LEVELS.slice(0, 3),
  Thorp: WEALTH_LEVELS.slice(0, 3),
  Hamlet: WEALTH_LEVELS.slice(1, 5),
  Village: WEALTH_LEVELS.slice(1, 5),
  Town: WEALTH_LEVELS.slice(2, 6),
  City: WEALTH_LEVELS,
  Metropolis: WEALTH_LEVELS,
};


//setting mapping up for ruling style by settlement size
// weighting currently set by repeating options
export const RulingBySizeMapping: Record<SizeTypes, string[]> = {
  Encampment: ["Clan-based", "Clan-based", "Autocracy", "Military Rule", "Tyranny"],
  Thorp: ["Clan-based", "Autocracy", "Theocracy", "Council Rule"],
  Hamlet: ["Council Rule", "Clan-based", "Theocracy", "Autocracy"],
  Village: ["Council Rule", "Feudal", "Merchant Guild", "Theocracy", "Democracy"],
  Town: ["Feudal", "Merchant Guild", "Democracy", "Oligarchy", "Council Rule"],
  City: ["Oligarchy", "Monarchy", "Feudal", "Merchant Guild", "Democracy", "Military Rule"],
  Metropolis: ["Monarchy", "Oligarchy", "Theocracy", "Democracy", "Merchant Guild", "Military Rule"],
};


 export const CrimeByWealthMapping: Record<WealthLevel, CriminalActivityTypes[]> = {
   Impoverished: ["Petty Theft", "Pickpocketing Rings", "Widespread Lawlessness"],
   Struggling: ["Pickpocketing Rings", "Smuggling", "Illegal Gambling", "Corruption", "Slavery & Trafficking"],
   Modest: ["Petty Theft", "Pickpocketing Rings", "Smuggling", "Black Market"],
   Wealthy: ["Black Market", "Corruption", "Organized Crime", "Assassins' Guild", "Slavery & Trafficking"],
   Affluent: ["Illegal Gambling", "Black Market", "Corruption", "Organized Crime", "Assassins' Guild"],
 };
 
export const MilitarybySizeMapping: Record<SizeTypes, MilitaryPresenceTypes[]> = {
  "Encampment": ["None", "Local Militia"],
  "Thorp": ["None", "Local Militia", "Town Guard"],
  "Hamlet": ["None", "Local Militia", "Town Guard"],
  "Village": ["Local Militia", "Town Guard", "Garrisoned Soldiers"],
  "Town": ["Town Guard", "Garrisoned Soldiers", "Mounted Forces", "Mercenary Company"],
  "City": ["Town Guard", "Garrisoned Soldiers", "Knightly Order", "Mounted Forces", "Mercenary Company"],
  "Metropolis": ["Royal Troops", "Knightly Order", "Town Guard", "Magical Defenders", "Mounted Forces", "Mercenary Company"]
};

export const MilitaryByTagMapping: Record<TagTypes, MilitaryPresenceTypes[]> = {
  "Capital": ["Royal Troops", "Knightly Order", "Magical Defenders", "Mounted Forces"],
  "Fortress": ["Garrisoned Soldiers", "Military Outpost", "Mounted Forces"],
  "Military Outpost": ["Garrisoned Soldiers", "Military Outpost", "Border Patrol", "Mounted Forces"],
  "Border Post": ["Border Patrol", "Mounted Forces", "Military Outpost"],
  "Garrison": ["Garrisoned Soldiers", "Military Outpost", "Town Guard"],
  "Trade Hub": ["Town Guard", "Mercenary Company", "Mounted Forces"],
  "Prison Settlement": ["Town Guard", "Garrisoned Soldiers", "Mercenary Company"],
  "Sacred Site": ["Magical Defenders", "Town Guard"],
  "Arcane Nexus": ["Magical Defenders", "Town Guard"],
  "Criminal Hideout": ["None", "Local Militia", "Town Guard"],
  "Agricultural": ["Local Militia", "Town Guard"],
  "Fishing": ["Local Militia", "Town Guard"],
  "Nomadic": ["None", "Local Militia"],
  "Mining Camp": ["Local Militia", "Garrisoned Soldiers"],
  "Remote": ["None", "Local Militia"],
  "Hidden": ["None", "Local Militia"],
  "Infested": ["None", "Local Militia", "Town Guard"],
  "Overgrown": ["None", "Local Militia"],
  "Port": ["Town Guard", "Mounted Forces", "Mercenary Company"],
  "Druidic": ["Magical Defenders", "Local Militia"]
};


export const MilitaryByMagicMapping: Record<MagicLevel, MilitaryPresenceTypes[]> = {
  "None": [],
  "Low": ["Magical Defenders"],
  "Moderate": ["Magical Defenders"],
  "High": ["Magical Defenders"],
  "Mythic": ["Magical Defenders"]
};

export const MilitaryByWealthMapping: Record<WealthLevel, MilitaryPresenceTypes[]> = {
  "Impoverished": ["None", "Local Militia"],
  "Struggling": ["None", "Local Militia", "Town Guard"],
  "Modest": ["Town Guard", "Garrisoned Soldiers"],
  "Wealthy": ["Garrisoned Soldiers", "Town Guard", "Mounted Forces", "Mercenary Company"],
  "Affluent": ["Knightly Order", "Royal Troops", "Magical Defenders", "Mounted Forces", "Mercenary Company"]
};

export const MilitaryByRulingMapping: Record<RulingType, MilitaryPresenceTypes[]> = {
  "Autocracy": ["Garrisoned Soldiers", "Knightly Order", "Town Guard"],
  "Clan-based": ["Local Militia", "Town Guard"],
  "Council Rule": ["Town Guard", "Local Militia"],
  "Democracy": ["Town Guard", "Local Militia"],
  "Feudal": ["Knightly Order", "Garrisoned Soldiers", "Mounted Forces"],
  "Merchant Guild": ["Town Guard", "Mercenary Company"],
  "Military Rule": ["Garrisoned Soldiers", "Knightly Order", "Mounted Forces", "Town Guard", "Military Outpost"],
  "Monarchy": ["Royal Troops", "Knightly Order", "Mounted Forces"],
  "Oligarchy": ["Town Guard", "Mercenary Company", "Local Militia"],
  "Theocracy": ["Magical Defenders", "Town Guard", "Local Militia"],
  "Tyranny": ["Garrisoned Soldiers", "Town Guard", "Knightly Order", "Military Outpost"]
};