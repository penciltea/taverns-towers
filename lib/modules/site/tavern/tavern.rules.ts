import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { roomBaseCost, roomConditionModifier, roomSizeModifier } from "./mappings/room.mappings";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";
import { SiteGenerationContext, SiteGenerationInput } from "../types";


async function applyTavernClienteleRule(
  data: Partial<SiteFormData>
): Promise<Partial<SiteFormData>> {
  if (data.type === "tavern" && !data.clientele) {
    data.clientele = "Adventurers, locals, and travelers";
  }
  return data;
}

async function applyTavernRoomCostRule(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>> {
  if (
    data.type !== "tavern" ||
    !data.size ||
    !data.condition
  ) {
    return data;
  }

  const base = roomBaseCost[data.condition];
  const sizeMod = roomSizeModifier[data.size] ?? 0;
  const conditionMod = roomConditionModifier[data.condition] ?? 0;

  const totalMod = 1 + sizeMod + conditionMod;
  const costInCp = Math.round(base * totalMod);

  data.cost = formatCurrencyFromCp(costInCp);

  return data;
}


const tavernRules = [
  ...commonRules,
  applyTavernClienteleRule,
  applyTavernRoomCostRule,
];

export async function generateTavernData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Just call your createSiteGenerator with the input object
  return await createSiteGenerator("tavern", tavernRules)(input);
}