import { getRandom } from "@/lib/util/randomValues";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/siteOptions";
import type { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationInput } from "./types";

type NormalizedMiscellaneousInput = SiteFormData & {
  size: string;
  terrain: string[];
  tags: string[];
  climate: string;
};

function normalizeInput(data: SiteGenerationInput): NormalizedMiscellaneousInput {
  return {
    ...(data as SiteFormData),
    type: "miscellaneous",
    size: data.size && data.size !== "" ? data.size : "random",
    terrain: data.terrain && data.terrain.length > 0 ? data.terrain : ["random"],
    tags: data.tags && data.tags.length > 0 ? data.tags : ["random"],
    climate: data.climate && data.climate !== "" ? data.climate : "random",
    condition: data.condition && data.condition !== "" ? data.condition : "random",
  };
}

function applySizeRule(data: NormalizedMiscellaneousInput) {
  if (data.size === "random" || !data.size) {
    const randomOption = getRandom(SITE_SIZE);
    data.size = randomOption.value;
  }
  return data;
}

function applyConditionRule(data: NormalizedMiscellaneousInput) {
  if (data.condition === "random" || !data.condition) {
    const randomOption = getRandom(SITE_CONDITION);
    data.condition = randomOption.value;
  }
  return data;
}

export function generateMiscellaneousValues(input: SiteGenerationInput): SiteFormData {
    let data = normalizeInput(input);
    const rules = [
        applySizeRule,
        applyConditionRule,
    ];
    data = rules.reduce((acc, rule) => rule(acc), data);
    return data;
}