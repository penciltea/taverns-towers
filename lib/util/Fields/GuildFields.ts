import { GUILD_TYPES } from '@/constants/site/guild.options';
import { GuildSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";
import { SITE_CONDITION, SITE_SIZE } from "@/constants/site/site.options";

export function getGuildypeLabel(value: string): string {
  for (const category of GUILD_TYPES) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export function getGuildSiteDetails(site: GuildSite){
    return [
        { label: "Guild Type", type: "text", value: getGuildypeLabel(site.guildType) },
        { label: "Guild Name", type: "text", value: site.guildName },
        { label: "Site Name", type: "text", value: site.name },
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Membership Requirements", type: "text", value: site.membershipRequirements?.join(", ") },
        { label: "Known Rivals", type: "text", value: site.knownRivals },
    ];
}

export function getGuildSiteDescriptions(site: GuildSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}