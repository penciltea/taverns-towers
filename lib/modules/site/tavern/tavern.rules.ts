import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { roomBaseCost, roomConditionModifier, roomSizeModifier } from "./mappings/room.mappings";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";
import { SiteGenerationContext, SiteGenerationInput } from "../types";
import { ClienteleBySettlementSize } from "@/lib/models/generator/site/tavern/clienteleBySettlementSize.model";
import { ClienteleByWealth } from "@/lib/models/generator/site/tavern/clienteleByWealth.model";
import { ClienteleByTag } from "@/lib/models/generator/site/tavern/clienteleByTag.model";
import { ClienteleByCrime } from "@/lib/models/generator/site/tavern/clienteleByCrime.model";
import { ClienteleByMagic } from "@/lib/models/generator/site/tavern/clienteleByMagic.model";
import { ClienteleBySize } from "@/lib/models/generator/site/tavern/clienteleBySize.model";
import { ClienteleByCondition } from "@/lib/models/generator/site/tavern/clienteleByCondition.model";
import { BaseClienteleBySettlementSizeMapping, CLIENTELE_ALIASES, CLIENTELE_COUNT_BY_SETTLEMENT_SIZE, ClienteleByConditionMapping, ClienteleByCrimeMapping, ClienteleByMagicMapping, ClienteleBySiteSizeMapping, ClienteleByTagMapping, ClienteleByWealthMapping } from "./mappings/clientele.mappings";
import { getRandomSubset } from "@/lib/util/randomValues";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { MagicLevel, SizeTypes, WealthLevel } from "@/constants/settlementOptions";
import { SiteCondition, SiteSize } from "@/constants/siteOptions";

function normalizeClientele(clientele: string[]): string[] {
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

async function applyTavernClienteleByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>> {

  if(data.type !== "tavern") return data; // If type is somehow not "tavern" return early

  const {
    size: settlementSize,
    wealth: settlementWealth,
    tags: settlementTags = [],
    crime: settlementCrime = [],
    magic: settlementMagic,
  } = context;

  const { size: siteSize, condition: siteCondition } = data;

  // Kick off all async DB calls concurrently
  const results = await Promise.allSettled([
    ClienteleBySettlementSize.findOne({size: settlementSize}).lean(),
    ClienteleByWealth.findOne({wealth: settlementWealth}).lean(),
    ClienteleByTag.find({tag: settlementTags}).lean(),
    ClienteleByCrime.find({crime: settlementCrime}).lean(),
    ClienteleByMagic.findOne({magic: settlementMagic}).lean(),
    ClienteleBySize.findOne({size: data.size}).lean(),
    ClienteleByCondition.findOne({condition: data.condition}).lean(),
  ]);

  // Unpack results with fallback to constants
  const settlementSizeClientele =
    results[0].status === "fulfilled" && results[0].value !== null && results[0].value.clientele.length > 0
      ? results[0].value.clientele
      : BaseClienteleBySettlementSizeMapping[settlementSize as SizeTypes] ?? [];

  const settlementWealthClientele =
    results[1].status === "fulfilled" && results[1].value !== null && results[1].value.clientele.length > 0
      ? results[1].value.clientele
      : ClienteleByWealthMapping[settlementWealth as WealthLevel] ?? [];

  const settlementTagsClientele =
    results[2].status === "fulfilled" && results[2].value.length > 0
      ? results[2].value.flatMap(doc => doc.clientele)
      : settlementTags.flatMap(tag => ClienteleByTagMapping[tag] ?? []);

  const settlementCrimeClientele =
    results[3].status === "fulfilled" && results[3].value.length > 0
      ? results[3].value.flatMap(doc => doc.clientele)
      : settlementCrime.flatMap(crime => ClienteleByCrimeMapping[crime] ?? []);

  const settlementMagicClientele =
    results[4].status === "fulfilled" && results[4].value !== null && results[4].value.clientele.length > 0
      ? results[4].value.clientele
      : ClienteleByMagicMapping[settlementMagic as MagicLevel] ?? [];

  const siteSizeClientele =
    results[5].status === "fulfilled" && results[5].value !== null && results[5].value.clientele.length > 0
      ? results[5].value.clientele
      : ClienteleBySiteSizeMapping[siteSize as SiteSize] ?? [];

  const siteConditionClientele =
    results[6].status === "fulfilled" && results[6].value !== null &&  results[6].value.clientele.length > 0
      ? results[6].value.clientele
      : ClienteleByConditionMapping[siteCondition as SiteCondition] ?? [];

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

  const unique = normalizeClientele(combined);

  const maxClientele =
    settlementSize && CLIENTELE_COUNT_BY_SETTLEMENT_SIZE[settlementSize]
      ? CLIENTELE_COUNT_BY_SETTLEMENT_SIZE[settlementSize]
      : 4; // Default fallback

  const selected = getRandomSubset(unique, maxClientele);
  data.clientele = capitalizeFirstLetter(selected.join(", "));

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
  applyTavernClienteleByConditions,
  applyTavernRoomCostRule,
];

export async function generateTavernData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Just call your createSiteGenerator with the input object
  return await createSiteGenerator("tavern", tavernRules)(input);
}