import { generateSiteNameFromFragments } from "./generateSiteNameFromFragments";
import { GenerateSiteNameOptions } from "@/interfaces/site.interface";
import { GeneratorSiteFragmentPlain } from "@/lib/models/generator/site/siteNameFragment.model";
import { nameGeneratorConfigs } from "./nameGenerator.configs";

export function dispatchSiteName(
  fragments: GeneratorSiteFragmentPlain[],
  options: GenerateSiteNameOptions
): string {
  const siteTypeKey = (options.siteType?.[0] ?? "").toLowerCase();
  const config = nameGeneratorConfigs[siteTypeKey];

  return generateSiteNameFromFragments({
    fragments,
    filters: options,
    ...(config ?? {
      fallbackFormats: ["{{prefix}} {{suffix}}"],
      allowedKeys: ["prefix", "suffix", "noun", "person"],
    }),
  });
}