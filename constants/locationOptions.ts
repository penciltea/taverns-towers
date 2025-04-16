export const LOCATION_CATEGORIES = [
    { value: "tavern", label: "Taverns & Inns"},
    { value: "temple", label: "Temples & Shrines"},
    { value: "shop", label: "Shops"},
    { value: "guild", label: "Guild Hall"},
    { value: "service", label: "Crafting & Services"},
    { value: "government", label: "Government & Infrastructure"},
    { value: "entertainment", label: "Entertainment"},
    { value: "hidden", label: "Hidden & Secret Locations"},
    { value: "residence", label: "Residence"},
    { value: "miscellaneous", label: "Miscellaneous"}
]

export type LocationCategory = typeof LOCATION_CATEGORIES[number]["value"];