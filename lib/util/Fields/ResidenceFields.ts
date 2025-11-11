import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { ResidenceSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getResidenceSiteDetails(site: ResidenceSite){
    return [
        { label: "Theme", type: "chip", value: site.siteTheme ?? [] },
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Notable Features", type: "text", value: site.notableFeatures }
    ]
}

export function getResidenceSiteDescriptions(site: ResidenceSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}