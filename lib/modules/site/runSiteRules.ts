import { SiteFormData } from "@/schemas/site.schema";

export async function runSiteRules<T extends Partial<SiteFormData>>(
  data: T,
  rules: ((data: T) => Promise<T>)[]
): Promise<T> {
  let result = data;
  for (const rule of rules) {
    result = await rule(result);
  }
  return result;
}