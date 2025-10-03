import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { WealthBySizeMapping, CrimeByWealthMapping, RulingBySizeMapping, MilitarybySizeMapping, MilitaryByTagMapping, MilitaryByMagicMapping, MilitaryByWealthMapping, MilitaryByRulingMapping, MilitaryCountBySiteWealth } from "../mappings/law.mappings";
import { NormalizedSettlementInput } from "./normalize";


export function applyWealthBySizeRule(data: NormalizedSettlementInput) {
  if (
    data.size &&
    data.size !== "random" &&
    data.wealth === "random"
  ) {
    const results = WealthBySizeMapping[data.size] ?? [];

    data.wealth = getRandom(results);
  }

  return data;
}

export function applyCrimeByWealthRule(data: NormalizedSettlementInput) {
  if(
    data.crime &&
    data.crime.includes("random") &&
    typeof data.wealth === "string"
  ){
    const results = CrimeByWealthMapping[data.wealth] ?? [];

    data.crime = data.crime.flatMap((c) => 
      c === "random" ? [getRandom(results)] : [c]
    );
  }

  return data;
}

// Logic for applying ruling style by settlement size
export function applyRulingStyleBySizeRule(data: NormalizedSettlementInput) {
  if(
    data.size && 
    data.size !== "random" &&
    data.rulingStyle === "random"
  ){
    const results = RulingBySizeMapping[data.size] ?? [];

    data.rulingStyle = getRandom(results);
  }

  return data;
}

export function applyMilitaryByConditions(data: NormalizedSettlementInput) {
  const { military } = data;

  // If missing, just return input but remove "random" from tags
  if (!data.military) {
    return { ...data, military: military?.filter(m => m.trim().toLowerCase() !== "random") ?? [] };
  }

  // If user selected "random", derive military presence from conditions
  const hasRandom = military.some(m => m.trim().toLowerCase() === "random");
  if (!hasRandom) return data; // preserve user-selected tags
  
  const militaryBySize = MilitarybySizeMapping[data.size] ?? [];
  const militaryByTags = data.tags.flatMap((t) => MilitaryByTagMapping[t] ?? []);
  const militaryByMagic = MilitaryByMagicMapping[data.magic] ?? [];
  const militaryByWealth = MilitaryByWealthMapping[data.wealth] ?? [];
  const militaryByRuling = MilitaryByRulingMapping[data.rulingStyle] ?? [];

  const results = [
    ...militaryBySize,
    ...militaryByTags,
    ...militaryByMagic,
    ...militaryByWealth,
    ...militaryByRuling
  ];

  console.log("result: ", results);
    
  if(results.length > 0 ){
    const unique = Array.from(new Set(results));

    const [min, max] = MilitaryCountBySiteWealth[data.wealth ?? "modest"] ?? [3, 4];
    const subset = getRandomSubset(unique, { min, max} );

    // If "None" is present, exclude other options from array
    if(subset.includes("None")){
      data.military = ["None"];
      return data;
    }

    data.military = subset;
  }

  return data;
}