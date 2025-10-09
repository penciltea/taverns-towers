import { HiddenSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { SECRECY_LEVELS, KNOWN_TO, DEFENSE, PURPOSE } from "@/constants/site/hidden.options";
import { getRandomSubset, shouldReplace } from "@/lib/util/randomValues";
import { createSiteGenerator } from "@/lib/util/siteHelpers";

export function isHiddenSite(data: Partial<SiteFormData>): data is Partial<HiddenSite> {
  return data.type === "hidden";
}

/**
 * Apply secrecy based on size, condition, and current knownTo / defenses
 */
export function applySecrecyByConditions(data: Partial<SiteFormData>) {
  if (!isHiddenSite(data)) return data;

  if (shouldReplace(data.secrecy)) {
    const secrecyValues = SECRECY_LEVELS.map((s) => s.value);

    // Base options by size (reuse previous mapping)
    const sizeMapping: Record<string, string[]> = {
      tiny: ["unknown", "concealed"],
      small: ["concealed", "guarded"],
      modest: ["guarded", "encrypted"],
      large: ["encrypted", "magically_hidden"],
      grand: ["magically_hidden", "mythical"],
      sprawling: ["magically_hidden", "mythical"],
    };
    const baseOptions = sizeMapping[data.size || "modest"] || ["guarded"];

    let minIndex = secrecyValues.indexOf(baseOptions[0]);
    let maxIndex = secrecyValues.indexOf(baseOptions[baseOptions.length - 1]);

    // Influence secrecy by defenses: stronger defenses -> higher secrecy more likely
    if (data.defenses?.length) maxIndex = Math.min(secrecyValues.length - 1, maxIndex + 1);

    // Influence secrecy by knownTo: more groups know -> lower secrecy
    if (data.knownTo?.length && data.knownTo.length > 2) minIndex = Math.max(0, minIndex - 1);

    const possibleOptions = secrecyValues.slice(minIndex, maxIndex + 1);
    data.secrecy = getRandomSubset(possibleOptions, { min: 1, max: possibleOptions.length });
  }

  return data;
}

/**
 * Populate Known To influenced by secrecy and purpose
 */
export function applyKnownTo(data: Partial<SiteFormData>) {
  if (!isHiddenSite(data)) return data;

  if (shouldReplace(data.knownTo)) {
    const min = 1;
    let max = 3;

    // More secret sites are known to fewer groups
    if (data.secrecy?.some((s) => ["magically_hidden", "mythical"].includes(s))) {
      max = 2;
    }

    // Criminal purpose likely known by thieves / locals
    const preferredValues = data.purpose?.includes("criminal")
      ? ["thievesGuild", "locals"]
      : KNOWN_TO.map((o) => o.value);

    data.knownTo = getRandomSubset(preferredValues, { min, max });
  }

  return data;
}

/**
 * Populate Defenses influenced by secrecy, size, and purpose
 */
export function applyDefenses(data: Partial<SiteFormData>) {
  if (!isHiddenSite(data)) return data;

  if (shouldReplace(data.defenses)) {
    const min = 1;
    let max = 3;

    // More secret or larger sites get more defenses
    if (data.secrecy?.some((s) => ["encrypted", "magically_hidden", "mythical"].includes(s))) max++;
    if (["grand", "sprawling"].includes(data.size || "")) max++;

    // Arcane / ritual purposes get more magical defenses
    const preferredValues = data.purpose?.some((p) => ["research", "occult"].includes(p))
      ? DEFENSE.map((d) => d.value)
      : DEFENSE.map((d) => d.value);

    data.defenses = getRandomSubset(preferredValues, { min, max });
  }

  return data;
}

/**
 * Populate Purpose influenced by secrecy and knownTo
 */
export function applyPurpose(data: Partial<SiteFormData>) {
  if (!isHiddenSite(data)) return data;

  if (shouldReplace(data.purpose)) {
    const min = 1;
    const max = 2;

    // Highly secret sites more likely to have high-stakes or occult purposes
    const highSecrecy = data.secrecy?.some((s) => ["magically_hidden", "mythical"].includes(s));
    const options = highSecrecy
      ? PURPOSE.map((p) => p.value)
      : PURPOSE.filter((p) => !["occult", "research"].includes(p.value)).map((p) => p.value);

    data.purpose = getRandomSubset(options, { min, max });
  }

  return data;
}

// Combine with common rules
export const hiddenRules = [
  ...commonRules,
  applySecrecyByConditions,
  applyKnownTo,
  applyDefenses,
  applyPurpose,
];

export async function generateHiddenData(input: SiteGenerationInput): Promise<SiteFormData> {
  return await createSiteGenerator("hidden", hiddenRules)(input);
}
