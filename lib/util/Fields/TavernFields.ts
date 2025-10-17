import { SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { TavernSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getTavernSiteDetails(site: TavernSite){
    return [
        { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
        { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
        { label: "Clientele", type: "text", value: site.clientele },
        { label: "Entertainment Offerings", type: "text", value: site.entertainment?.length ? site.entertainment.join(', ') : 'N/A' },
        { label: "Room Cost per Night", type: "text", value: site.cost },
    ]
}

export function getTavernSiteDescriptions(site: TavernSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}