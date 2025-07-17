import { getRandomSubset } from "@/lib/util/randomValues";
import { NormalizedSettlementInput } from "./normalize";
import { getDomainsByEnvironment } from "../../common/domains/getDomainsByEnvironment.rules";
import { domainCountBySize } from "../mappings/domain.mappings";

export async function applyDomainsByConditions(data: NormalizedSettlementInput): Promise<NormalizedSettlementInput> {
  const shouldGenerate = !data.domains || data.domains.includes("random")
  if (!shouldGenerate) return data; 
  
  const domainPool = await getDomainsByEnvironment({
    tags: data.tags,
    terrain: data.terrain,
    climate: data.climate,
  });


  const [min, max] = domainCountBySize[data.size ?? "Town"] ?? [3, 4]; // set a number of domains as determined by the settlement's size, defaulting to "town" if unavailalble
  data.domains = getRandomSubset(domainPool, {min, max});  // get a random assortment of domains based off the settlement number of domains


  return data;
}