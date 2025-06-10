import { getRandom } from "@/lib/util/randomValues";
import { MagicByWealthMapping } from "../mappings/magic.mappings";
import { NormalizedSettlementInput } from "./normalize";
import { MagicByWealth, MagicByWealthModel } from "@/lib/models/generator/settlement/magicByWealth.model";

// Logic for setting Magic use/levels based off settlement wealth
export async function applyMagicByWealthRule(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput>{
  try {
      if (
        data.wealth &&
        data.wealth !== "random" &&
        data.magic === "random"
      ) {
        const entry = await MagicByWealth
          .findOne({ wealth: data.wealth })
          .lean<MagicByWealthModel>();
  
        const validMagic =
          entry?.magic ?? MagicByWealthMapping[data.size] ?? [];
  
        data.magic = getRandom(validMagic);
      }
    } catch (err) {
      console.warn("applyMagicByWealthRule failed, using local fallback:", err);
  
      const fallback = MagicByWealthMapping[data.size] ?? [];
      data.wealth = getRandom(fallback);
    }
    return data;
}