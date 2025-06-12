import { SiteFormData } from "@/schemas/site.schema";
import { SiteGenerationContext } from "./types";

export type SiteRuleInput = Partial<SiteFormData> & SiteGenerationContext;

export async function runSiteRules<T extends SiteRuleInput>(
  data: T,
  rules: ((data: T) => Promise<Partial<T>>)[]
): Promise<T> {
  let result = data;
  for (const rule of rules) {
    const update = await rule(result);
    result = {
      ...result,
      ...update,
    };
  }
  return result;
}