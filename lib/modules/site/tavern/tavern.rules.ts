import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { roomBaseCost, roomConditionModifier, roomSizeModifier } from "./mappings/room.mappings";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";
import { BaseClienteleBySettlementSizeMapping, CLIENTELE_ALIASES, CLIENTELE_COUNT_BY_SETTLEMENT_SIZE, ClienteleByConditionMapping, ClienteleByCrimeMapping, ClienteleByMagicMapping, ClienteleBySiteSizeMapping, ClienteleByTagMapping, ClienteleByWealthMapping } from "./mappings/clientele.mappings";
import { getRandomSubset } from "@/lib/util/randomValues";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { MagicLevel, SizeTypes, WealthLevel } from "@/constants/settlement.options";
import { SiteCondition, SiteSize } from "@/constants/site/site.options";
import { ENTERTAINMENT_COUNT_BY_SITE_CONDITION, EntertainmentByMagicLevelMapping, EntertainmentBySiteConditionMapping, EntertainmentBySiteSizeMapping, EntertainmentByTagMapping } from "./mappings/entertainment.mappings";
import { TavernSite, SiteGenerationContext, SiteGenerationInput } from "@/interfaces/site.interface";

export function isTavernSite(data: Partial<SiteFormData>): data is Partial<TavernSite> {
  return data.type === "tavern";
}

export function normalizeClientele(clientele: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const person of clientele) {
    const canonical = CLIENTELE_ALIASES[person] || person;
    if (!seen.has(canonical)) {
      seen.add(canonical);
      result.push(person); // Preserve the original label, even if it maps to an alias
    }
  }

  return result;
}

export function applyTavernClienteleByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
) {

  if (!isTavernSite(data)) return data; // If type is somehow not "tavern" return early

  const {
    size: settlementSize,
    wealth: settlementWealth,
    tags: settlementTags = [],
    crime: settlementCrime = [],
    magic: settlementMagic,
  } = context;

  const { size: siteSize, condition: siteCondition } = data;

  const settlementSizeClientele = BaseClienteleBySettlementSizeMapping[settlementSize as SizeTypes] ?? [];
  const settlementWealthClientele = ClienteleByWealthMapping[settlementWealth as WealthLevel] ?? [];
  const settlementTagsClientele = settlementTags.flatMap((tag) => ClienteleByTagMapping[tag] ?? []);
  const settlementCrimeClientele = settlementCrime.flatMap(crime => ClienteleByCrimeMapping[crime] ?? []);
  const settlementMagicClientele = ClienteleByMagicMapping[settlementMagic as MagicLevel] ?? [];
  const siteSizeClientele = ClienteleBySiteSizeMapping[siteSize as SiteSize] ?? [];
  const siteConditionClientele = ClienteleByConditionMapping[siteCondition as SiteCondition] ?? [];

  // Combine all clientele arrays and normalize to unique values
  const combined = [
    ...settlementSizeClientele,
    ...settlementWealthClientele,
    ...settlementTagsClientele,
    ...settlementCrimeClientele,
    ...settlementMagicClientele,
    ...siteSizeClientele,
    ...siteConditionClientele,
  ];

  console.log("combined: ", combined);

  const unique = normalizeClientele(combined);

  const maxClientele =
    settlementSize && CLIENTELE_COUNT_BY_SETTLEMENT_SIZE[settlementSize]
      ? CLIENTELE_COUNT_BY_SETTLEMENT_SIZE[settlementSize]
      : 4; // Default fallback

  const selected = getRandomSubset(unique, { count: maxClientele });
  data.clientele = capitalizeFirstLetter(selected.join(", "));

  return data;
}

export function applyEntertainmentByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
) {
  if (!isTavernSite(data)) return data;

  // setting fields for generator factors
  const size = data.size;
  const condition = data.condition;
  const settlementMagic = context.magic;
  const settlementTags = context.tags ?? [];

  const sizeEntertainment =  size ? EntertainmentBySiteSizeMapping[size] ?? [] : [];
  const conditionEntertainment = condition ? EntertainmentBySiteConditionMapping[condition] ?? [] : [];
  const magicEntertainment = settlementMagic ? EntertainmentByMagicLevelMapping[settlementMagic] ?? [] : [];
  const tagEntertainment = settlementTags.flatMap((tag) => EntertainmentByTagMapping[tag] ?? []);
  
  const combined = [
    ...sizeEntertainment,
    ...conditionEntertainment,
    ...magicEntertainment,
    ...tagEntertainment
  ];

  const unique = Array.from(new Set(combined));

  const [min, max] = ENTERTAINMENT_COUNT_BY_SITE_CONDITION[data.condition ?? "average"] ?? [3, 4];
  data.entertainment = getRandomSubset(unique, { min, max });

  return data;
}


export function applyTavernRoomCostRule(data: Partial<SiteFormData>) {
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
  applyTavernClienteleByConditions,
  applyEntertainmentByConditions,
  applyTavernRoomCostRule,
];

export async function generateTavernData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("tavern", tavernRules)(input);
}