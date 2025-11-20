import { GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";

export const nameGeneratorConfigs: Record<string, {
  subtypeKey?: keyof GeneratorSiteFragmentPlain;
  getSubtypeValues?: (filters: GenerateSiteNameOptions) => string[] | undefined;
  fallbackFormats: string[];
  allowedKeys?: string[];
}> = {
  entertainment: {
    subtypeKey: "venueType",
    getSubtypeValues: filters =>
      filters.venueType ??
      (filters.data?.type === "entertainment" && Array.isArray(filters.data.venueType)
        ? filters.data.venueType
        : undefined),
    fallbackFormats: ["The {{noun}} and the {{noun}}", "{{prefix}} Hall"],
    allowedKeys: ["prefix", "suffix", "noun", "person", "fullName", "siteTypeName", "siteTheme"],
  },
  government: {
    subtypeKey: "functionType",
    getSubtypeValues: filters =>
      filters.functionType ??
      (filters.data?.type === "government" && Array.isArray(filters.data.function)
        ? filters.data.function
        : undefined),
    fallbackFormats: ["The {{prefix}} {{siteTypeName}}", "The {{siteTypeName}}"],
    allowedKeys: ["prefix", "suffix", "noun", "siteTypeName", "siteTheme"],
  },
  shop: {
    subtypeKey: "shopType",
    getSubtypeValues: filters =>
      filters.shopType ??
      (filters.data?.type === "shop" && Array.isArray(filters.data.shopType)
        ? filters.data.shopType
        : undefined),
    fallbackFormats: ["{{person}}'s {{siteTypeName}}", "The {{siteTypeName}}"],
    allowedKeys: ["prefix", "noun", "suffix", "siteTypeName", "siteTheme"],
  },
  guild: {
    subtypeKey: "guildType",
    getSubtypeValues: filters =>
      filters.guildType ??
      (filters.data?.type === "guild" && Array.isArray(filters.data.guildType)
        ? filters.data.guildType
        : undefined),
    fallbackFormats: ["The {{siteTypeName}} Guildhall", "The {{prefix}} {{noun}}"],
    allowedKeys: ["prefix", "noun", "suffix", "siteTypeName", "siteTheme"],
  },
  temple: {
    subtypeKey: "domain",
    getSubtypeValues: filters =>
      filters.domains ??
      (filters.data?.type === "temple" && Array.isArray(filters.data.domains)
        ? filters.data.domains
        : undefined),
    fallbackFormats: ["{{siteTypeName}} of {{noun}}", "The {{prefix}} {{siteTypeName}}"],
    allowedKeys: ["prefix", "noun", "suffix", "descriptor", "siteTypeName", "siteTheme"],
  },
};
