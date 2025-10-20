import { GOVERNMENT_FUNCTIONS } from '@/constants/site/government.options';import { SECURITY_LEVELS } from "@/constants/site/government.options";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { GovernmentSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";


export function getGovernmentTypeLabel(value: string): string {
  for (const category of GOVERNMENT_FUNCTIONS) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export function getGovernmentSiteDetails(site: GovernmentSite){
    return [
        { label: "Function", type: "text", value: site.function ? getGovernmentTypeLabel(site.function) : "N/A" },
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Security", type: "text", value: getLabelFromValue(SECURITY_LEVELS, site.security) }
    ]
}

export function getGovernmentDescriptions(site: GovernmentSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ];
}