import { getRandom } from "@/lib/util/randomValues";
import { WealthBySizeMapping, CrimeByWealthMapping, RulingBySizeMapping } from "../mappings/law.mappings";
import { NormalizedSettlementInput } from "./normalize";
import { RulingStyleBySize, RulingStyleBySizeModel } from "@/lib/models/generator/settlement/rulingStyleBySize.model";
import { WealthBySize, WealthBySizeModel } from "@/lib/models/generator/settlement/wealthByRule.model";
import { CrimeByWealth, CrimeByWealthModel } from "@/lib/models/generator/settlement/crimeByWealth.model";


export async function applyWealthBySizeRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput>{
   try {
    if (
      data.size &&
      data.size !== "random" &&
      data.wealth === "random"
    ) {
      const entry = await WealthBySize
        .findOne({ size: data.size })
        .lean<WealthBySizeModel>();

      const validWealth =
        entry?.wealth ?? WealthBySizeMapping[data.size] ?? [];

      data.wealth = getRandom(validWealth);
    }
  } catch (err) {
    console.warn("applyWealthBySizeRule failed, using local fallback:", err);

    const fallback = WealthBySizeMapping[data.size] ?? [];
    data.wealth = getRandom(fallback);
  }
  return data;
}

export async function applyCrimeByWealthRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try {
    if( 
      data.crime &&
      data.crime.includes("random") &&
      typeof data.wealth === "string"
    ) {
      const entry = await CrimeByWealth
        .findOne({ wealth: data.wealth })
        .lean<CrimeByWealthModel>();

      const crimesList = entry?.crime
        ?? CrimeByWealthMapping[data.wealth]
        ?? [];

      // Use crimesList directly
      data.crime = data.crime.flatMap((c) => 
        c === "random" ? [getRandom(crimesList)] : [c]
      );
    }
  } catch (err) {
    console.warn("applyCrimeByWealthRule failed, using local fallback:", err);
    
    const fallbackCrimeList = CrimeByWealthMapping[data.wealth] ?? [];

    data.crime = data.crime.map((c) =>
      c === "random" ? getRandom(fallbackCrimeList) : c
    );
  }

  return data;
}

// Logic for applying ruling style by settlement size
export async function applyRulingStyleBySizeRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  try{
    if(
      data.size && 
      data.size !== "random" &&
      data.rulingStyle === "random"
    ) {
      const entry = await RulingStyleBySize.findOne({ size: data.size }).lean<RulingStyleBySizeModel>();

      const validRulingStyle = 
        entry?.rulingStyle ?? RulingBySizeMapping[data.size] ?? [];

      data.rulingStyle = getRandom(validRulingStyle);
    }
  } catch (err) {
    console.warn("applyRulingStyleBySizeRule failed, using local fallback:", err);

    const fallback = RulingBySizeMapping[data.size] ?? [];
    data.rulingStyle = getRandom(fallback);
  }

  return data;
}