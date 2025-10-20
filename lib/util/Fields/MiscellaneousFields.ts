import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { MiscellaneousSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getMiscellaneousSiteDetails(site: MiscellaneousSite){
    return [
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Features",type: "text",  value: site.features },
        { label: "Use", type: "text", value: site.use }
    ]
}
export function getMiscellaneousSiteDescriptions(site: MiscellaneousSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}