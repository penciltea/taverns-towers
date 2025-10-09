import { GUILD_TYPES } from "@/constants/site/guild.options";
import { GuildSite, SiteGenerationInput } from "@/interfaces/site.interface";
import { getRandom, getRandomSubset } from "@/lib/util/randomValues";
import { createSiteGenerator } from "@/lib/util/siteHelpers";
import { SiteFormData } from "@/schemas/site.schema";
import { commonRules } from "../common/rules";
import { GuildMembershipByTypeMapping } from "./mappings/membershipByType";

export function isGuildSite(data: Partial<SiteFormData>): data is Partial<GuildSite> {
  return data.type === "guild";
}

export function applyGuildTypeRule(data: Partial<SiteFormData>) {
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

export function applyMembershipByTypeRule(data: Partial<SiteFormData>){
  if (!isGuildSite(data)) return data;

  if (
    !data.membershipRequirements || 
    data.membershipRequirements.length === 0 || 
    data.membershipRequirements.includes("random")
  ) {
    const guildType = data.guildType;
    if (!guildType) return data; // Can't proceed without guild type

    const result = GuildMembershipByTypeMapping[guildType] ?? [];

    data.membershipRequirements = getRandomSubset(result, { min: 1, max: 3 } )
  }

  return data;
}


const guildRules = [
  ...commonRules,
  applyGuildTypeRule,
  applyMembershipByTypeRule,
];

export async function generateGuildData(input: SiteGenerationInput): Promise<SiteFormData> {
  // Call the createSiteGenerator with the input object
  return await createSiteGenerator("guild", guildRules)(input);
}