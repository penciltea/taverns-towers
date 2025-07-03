import { GUILD_TYPES } from "@/constants/siteOptions";
import { GuildSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { getRandom } from "@/lib/util/randomValues";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";

export function isGuildSite(data: Partial<SiteFormData>): data is Partial<GuildSite> {
  return data.type === "guild";
}

export async function applyGuildTypeRule(data: Partial<SiteFormData>): Promise<Partial<SiteFormData>> {
  if (!isGuildSite(data)) return data;

  if (!data.guildType || data.guildType === "random") {
    // Flatten all options' values into one array
    const allGuildTypes = GUILD_TYPES.flatMap(category =>
      category.options.map(option => option.value)
    );

    data.guildType = getRandom(allGuildTypes);
  }

  return data;
}


const guildRules = [
  ...commonRules,
  applyGuildTypeRule,
];

export async function generateGuildData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("guild", guildRules)(input);
}