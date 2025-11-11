import { ENTERTAINMENT_VENUE_TYPES, SITE_SIZE, SITE_CONDITION } from "@/constants/site/site.options";
import { EntertainmentSite } from "@/interfaces/site.interface";
import { getLabelFromValue } from "../getLabelFromValue";

export function getEntertainmentSiteDetails(site: EntertainmentSite) {
  return [
    { label: "Venue Type", type: "text", value: getLabelFromValue(ENTERTAINMENT_VENUE_TYPES, site.venueType) },
    { label: "Theme", type: "chip", value: site.siteTheme ?? [] },
    { label: "Size", type: "text", value: getLabelFromValue(SITE_SIZE, site.size) },
    { label: "Condition", type: "text", value: getLabelFromValue(SITE_CONDITION, site.condition) },
    { label: "Cost", type: "text", value: site.cost },   
  ];
}

export function getEntertainmentDescriptions(site: EntertainmentSite){
    return [
        { label: "Public Notes", type: "text", value: site.publicNotes },
        { label: "GM Notes", type: "text", value: site.gmNotes, restricted: true },
    ]
}
