import { getRandomSubset } from "@/lib/util/randomValues";
import { NormalizedSettlementInput } from "./normalize";
import { getDomainsByEnvironment } from "@/lib/modules/common/domains/getDomainsByEnvironment.rules";
import { domainCountBySize } from "../mappings/domain.mappings";
import { DOMAINS, DomainTypes } from "@/constants/common.options";

export async function applyDomainsByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = !data.domains || data.domains.includes("random")
  if (!shouldGenerate) return data; 
  
  const domainPool = await getDomainsByEnvironment({
    tags: data.tags,
    terrain: data.terrain,
    climate: data.climate,
  });


  const [min, max] = domainCountBySize[data.size ?? "Town"] ?? [3, 4]; // set a number of domains as determined by the settlement's size, defaulting to "town" if unavailalble

  const validPool: DomainTypes[] = domainPool.filter(
    (d): d is DomainTypes => DOMAINS.includes(d as DomainTypes)
  );

  data.domains = getRandomSubset(validPool, { min, max }); // get a random assortment of domains based off the settlement number of domains

  return data;
}