import { SizeTypes, WealthLevel, WEALTH_LEVELS, CriminalActivityTypes } from "@/constants/settlementOptions";

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
 