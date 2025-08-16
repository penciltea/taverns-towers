import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { TempleSite, SiteGenerationInput, SiteGenerationContext } from "@/interfaces/site.interface";
import { RelicByDomain, RelicByDomainModel } from "@/lib/models/generator/site/temple/relicsByDomain.model";
import { RelicBySize, RelicBySizeModel } from "@/lib/models/generator/site/temple/relicBySize.model";
import { RelicByCondition, RelicByConditionModel } from "@/lib/models/generator/site/temple/relicsByCondition.model";
import { extractArrayFromResult } from "@/lib/util/extractArrayFromResult";
import { RELICS_BY_CONDITION_MAPPING, RELICS_BY_DOMAIN_MAPPING, RELICS_BY_SIZE_MAPPING } from "./mappings/relics.mappings";
import { SiteCondition, SiteSize } from "@/constants/site/site.options";
import { getRandomSubset } from "@/lib/util/randomValues";
import { getDomainsByEnvironment } from "../../common/domains/getDomainsByEnvironment.rules";
import { domainCountBySiteSize } from "./mappings/domains.mappings";
import { DOMAINS } from "@/constants/settlementOptions";

export function isTempleSite(data: Partial<SiteFormData>): data is Partial<TempleSite> {
  return data.type === "temple";
}

export async function applyTempleDomainsByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>>{
  if(!isTempleSite(data)) return data; // If type is somehow not "temple", return early

  const settlementDomains = context.domains ?? [];
  
  const domainPool = await getDomainsByEnvironment({
    tags: context.tags,
    terrain: context.terrain,
    climate: context.climate,
  });
  
  // Apply weighting by duplicating settlement-aligned domains
  const weightedPool = [
    ...domainPool,
    ...settlementDomains.flatMap((domain) =>
      domainPool.includes(domain) ? Array(2).fill(domain) : []
    ),
  ];

  // Pick based on site size
  const [min, max] = domainCountBySiteSize[data.size ?? "modest"] ?? [1, 2];

  if(weightedPool.length = 0){
    data.domains = getRandomSubset(domainPool, { min, max });
  } else {
    data.domains = getRandomSubset(DOMAINS, { min, max }); // fallback if environmental or settlement context gives no pool of results, choose any domains from constants
  }

  return data;
}

export async function applyRelicsByConditions(
  data: Partial<SiteFormData>,
  context: SiteGenerationContext
): Promise<Partial<SiteFormData>>{

  if(!isTempleSite(data)) return data; // If type is somehow not "temple", return early

  const { 
    domains: domains = [] 
  } = context;

  const {
    size: siteSize, 
    condition: siteCondition
  } = data;

  // Make async DB calls for populating arrays

  const results = await Promise.allSettled([
    RelicByDomain.find({ domain: domains }).lean<RelicByDomainModel[]>(),
    siteSize ? RelicBySize.findOne({ size: siteSize }).lean<RelicBySizeModel | null>() : Promise.resolve(null),
    siteCondition ? RelicByCondition.findOne({ condition: siteCondition }).lean<RelicByConditionModel | null>() : Promise.resolve(null)
  ]);


  // Get results from above DB calls, extract them in that order, and use fallback mappings if any fail
  const settlementDomainsRelic = extractArrayFromResult(
    results[0], 
    (doc) => doc.relics,
    domains.flatMap((domain) => RELICS_BY_DOMAIN_MAPPING[domain] ?? [])
  );

  const siteSizeRelic =
    results[1].status === "fulfilled" && results[1].value !== null && results[1].value.relics.length > 0
      ? results[1].value.relics
      : RELICS_BY_SIZE_MAPPING[siteSize as SiteSize] ?? [];

  const siteConditionRelic =
    results[2].status === "fulfilled" && results[2].value !== null && results[2].value.relics.length > 0
      ? results[2].value.relics
      : RELICS_BY_CONDITION_MAPPING[siteCondition as SiteCondition] ?? [];


  // Combining results into one array to pull final results from
  const combined = [
    ...settlementDomainsRelic,
    ...siteSizeRelic,
    ...siteConditionRelic
  ];


  // Determining number of relics based off site size
  // Smaller sized sites should have fewer relics; larger sized sites should have more

  let sizeMin = 0;
  let sizeMax = 0;

  // Site size values taken from constants
  switch(siteSize){
    case("tiny"):
      sizeMin = 1,
      sizeMax = 1;
    break;

    case("small"): 
      sizeMin = 1;
      sizeMax = 2;
    break;

    case("modest"):
      sizeMin = 1;
      sizeMax = 3;
    break;

    case("large"):
      sizeMin = 2;
      sizeMax = 4;
    break;

    case("grand"):
      sizeMin = 3;
      sizeMax = 5;
    break;

    case("sprawling"):
      sizeMin = 4;
      sizeMax = 6;
    break;

    default:
      sizeMin = 1;
      sizeMax = 3;
    break;
  }

  // Setting final amount of relics based off the site size's values
  const selected = getRandomSubset(combined, { min: sizeMin, max: sizeMax });

  // Adding check to see if adding line breaks is necessary
  if (selected.length > 0) {
    data.relics = selected.join("\n");
  }

  return data;
}


const templeRules = [
  ...commonRules,
  applyTempleDomainsByConditions,
  applyRelicsByConditions
];

export async function generateTempleData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("temple", templeRules)(input);
}