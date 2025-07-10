import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { roomBaseCost, roomConditionModifier, roomSizeModifier } from "./mappings/room.mappings";
import { formatCurrencyFromCp } from "@/lib/util/convertCurrency";
import { ClienteleBySettlementSize, ClienteleBySettlementSizeModel } from "@/lib/models/generator/site/tavern/clienteleBySettlementSize.model";
import { ClienteleByWealth, ClienteleByWealthModel } from "@/lib/models/generator/site/tavern/clienteleByWealth.model";
import { ClienteleByTag, ClienteleByTagModel } from "@/lib/models/generator/site/tavern/clienteleByTag.model";
import { ClienteleByCrime, ClienteleByCrimeModel } from "@/lib/models/generator/site/tavern/clienteleByCrime.model";
import { ClienteleByMagic, ClienteleByMagicModel } from "@/lib/models/generator/site/tavern/clienteleByMagic.model";
import { ClienteleBySize, ClienteleBySizeModel } from "@/lib/models/generator/site/tavern/clienteleBySize.model";
import { ClienteleByCondition, ClienteleByConditionModel } from "@/lib/models/generator/site/tavern/clienteleByCondition.model";
import { BaseClienteleBySettlementSizeMapping, CLIENTELE_ALIASES, CLIENTELE_COUNT_BY_SETTLEMENT_SIZE, ClienteleByConditionMapping, ClienteleByCrimeMapping, ClienteleByMagicMapping, ClienteleBySiteSizeMapping, ClienteleByTagMapping, ClienteleByWealthMapping } from "./mappings/clientele.mappings";
import { getRandomSubset } from "@/lib/util/randomValues";
import { capitalizeFirstLetter } from "@/lib/util/stringFormats";
import { MagicLevel, SizeTypes, WealthLevel } from "@/constants/settlementOptions";
import { SiteCondition, SiteSize } from "@/constants/site/site.options";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";
import { EntertainmentBySize, EntertainmentBySizeModel } from "@/lib/models/generator/site/tavern/entertainmentBySize.model";
import { EntertainmentByCondition, EntertainmentByConditionModel } from "@/lib/models/generator/site/tavern/entertainmentByCondition.model";
import { EntertainmentByMagic, EntertainmentByMagicModel } from "@/lib/models/generator/site/tavern/entertainmentByMagic.model";
import { EntertainmentByTag, EntertainmentByTagModel } from "@/lib/models/generator/site/tavern/entertainmentByTag.model";
import { ENTERTAINMENT_COUNT_BY_SITE_CONDITION, EntertainmentByMagicLevelMapping, EntertainmentBySiteConditionMapping, EntertainmentBySiteSizeMapping, EntertainmentByTagMapping } from "./mappings/entertainment.mappings";
import { TavernSite, SiteGenerationContext, SiteGenerationInput } from "@/interfaces/site.interface";

export function isTavernSite(data: Partial<SiteFormData>): data is Partial<TavernSite> {
  return data.type === "tavern";
}

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

  if (!isTavernSite(data)) return data; // If type is somehow not "tavern" return early

  const {
    size: settlementSize,
    wealth: settlementWealth,
    tags: settlementTags = [],
    crime: settlementCrime = [],
    magic: settlementMagic,
  } = context;

  const { size: siteSize, condition: siteCondition } = data;

  // Make async DB calls for populating arrays
  const results = await Promise.allSettled([
    settlementSize ? ClienteleBySettlementSize.findOne({size: settlementSize}).lean<ClienteleBySettlementSizeModel | null>() : Promise.resolve(null),
    settlementWealth ? ClienteleByWealth.findOne({wealth: settlementWealth}).lean<ClienteleByWealthModel | null>() : Promise.resolve(null),
    ClienteleByTag.find({tag: settlementTags}).lean<ClienteleByTagModel[]>(),
    ClienteleByCrime.find({crime: settlementCrime}).lean<ClienteleByCrimeModel[]>(),
    settlementMagic ? ClienteleByMagic.findOne({magic: settlementMagic}).lean<ClienteleByMagicModel | null>() : Promise.resolve(null),
    siteSize ? ClienteleBySize.findOne({size: siteSize}).lean<ClienteleBySizeModel | null>() : Promise.resolve(null),
    siteCondition ? ClienteleByCondition.findOne({condition: siteCondition}).lean<ClienteleByConditionModel | null>() : Promise.resolve(null)
  ]);

  // Get results from above DB calls, extract them in order of the calls above, use fallback from mappings if it fails
  const settlementSizeClientele = extractArrayFromResult(
    results[0],
    (val) => val.clientele,
    BaseClienteleBySettlementSizeMapping[settlementSize as SizeTypes] ?? []
  );

  const settlementWealthClientele = extractArrayFromResult(
    results[1],
    (val) => val.clientele,
    ClienteleByWealthMapping[settlementWealth as WealthLevel] ?? []
  );
  
  const settlementTagsClientele = extractArrayFromResult(
    results[2],
    (doc) => doc.clientele,
    settlementTags.flatMap((tag) => ClienteleByTagMapping[tag] ?? [])
  );

  const settlementCrimeClientele = extractArrayFromResult(
        results[3],
        (doc) => doc.clientele,
        settlementCrime.flatMap(crime => ClienteleByCrimeMapping[crime] ?? [])
    );

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

  const selected = getRandomSubset(unique, { count: maxClientele });
  data.clientele = capitalizeFirstLetter(selected.join(", "));

  return data;
}

async function applyEntertainmentByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>> {
  if (!isTavernSite(data)) return data;

  // setting fields for generator factors
  const size = data.size;
  const condition = data.condition;
  const settlementMagic = context.magic;
  const settlementTags = context.tags ?? [];

  // DB calls for populating arrays
  const results = await Promise.allSettled([
    size ? EntertainmentBySize.findOne({ size }).lean<EntertainmentBySizeModel | null>() : Promise.resolve(null),
    condition ? EntertainmentByCondition.findOne({ condition }).lean<EntertainmentByConditionModel | null>() : Promise.resolve(null),
    settlementMagic ? EntertainmentByMagic.findOne({ magic: settlementMagic }).lean<EntertainmentByMagicModel | null>() : Promise.resolve(null),
    EntertainmentByTag.find({ tag: { $in: settlementTags } }).lean<EntertainmentByTagModel[]>()
  ]);

  const sizeEntertainment = extractArrayFromResult(
    results[0],
    (val) => val.entertainment,
    size ? EntertainmentBySiteSizeMapping[size] ?? [] : []
  );

  const conditionEntertainment = extractArrayFromResult(
    results[1],
    (val) => val.entertainment,
    condition ? EntertainmentBySiteConditionMapping[condition] ?? [] : []
  );

  const magicEntertainment = extractArrayFromResult(
    results[2],
    (val) => val.entertainment,
    settlementMagic ? EntertainmentByMagicLevelMapping[settlementMagic] ?? [] : []
  );

  const tagEntertainment = extractArrayFromResult(
    results[3],
    (val) => val.entertainment,
    settlementTags.flatMap((tag) => EntertainmentByTagMapping[tag] ?? [])
  );
  
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


async function applyTavernRoomCostRule(
  data: Partial<SiteFormData>
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
  applyEntertainmentByConditions,
  applyTavernRoomCostRule,
];

export async function generateTavernData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("tavern", tavernRules)(input);
}