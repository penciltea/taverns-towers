import { SECRECY_LEVELS, KNOWN_TO, DEFENSE, PURPOSE } from "@/constants/site/hidden.options";
import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { HiddenSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getHiddenSiteDetails(site: HiddenSite){
    return [
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Security", type: "text", value: site.secrecy?.length ? site.secrecy.map((value) => getLabelFromValue(SECRECY_LEVELS, value)).join(", ") : "N/A" },
        { label: "Known To", type: "text", value: site.knownTo?.length ? site.knownTo.map((value) => getLabelFromValue(KNOWN_TO, value)).join(", ") : "N/A" },
        { label: "Defense(s)", type: "text", value: site.defenses?.length ? site.defenses.map((value) => getLabelFromValue(DEFENSE, value)).join(", ") : "N/A" },
        { label: "Purpose", type: "text", value: site.purpose?.length ? site.purpose.map((value) => getLabelFromValue(PURPOSE, value)).join(", ") : "N/A" }
    ]
}

export function getHiddenSiteDescriptions(site: HiddenSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}