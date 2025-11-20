import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { TempleSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getTempleSiteDetails(site: TempleSite){
    return [
        { label: "Theme", type: "chip", value: site.siteTheme ?? [] },
        { label: "Worshipped Domain(s)", type: "text", value: site.domains?.length ? site.domains.join(', ') : 'N/A' },
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Relics", type: "text", value: site.relics },
    ]
}

export function getTempleSiteDescriptions(site: TempleSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}