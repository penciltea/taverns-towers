export const LOCATION_CATEGORIES = [
    { value: "tavern", label: "Taverns & Inns"},
    { value: "temple", label: "Temples & Shrines"},
    { value: "shop", label: "Shops & Services"},
    { value: "guild", label: "Guild Halls"},
    { value: "government", label: "Government & Infrastructure"},
    { value: "entertainment", label: "Entertainment"},
    { value: "hidden", label: "Hidden & Secret Locations"},
    { value: "residence", label: "Residence"},
    { value: "miscellaneous", label: "Miscellaneous"}
]

export const LOCATION_SIZE = [
    { value: "tiny", label: "Tiny (e.g., a single-room stall or shack)" },
    { value: "small", label: "Small (e.g., a modest cottage or kiosk)" },
    { value: "modest", label: "Modest (e.g., average-sized home or shop)" },
    { value: "spacious", label: "Spacious (e.g., multiple rooms or areas)" },
    { value: "large", label: "Large (e.g., a two-story inn or hall)" },
    { value: "grand", label: "Grand (e.g., large manor, cathedral, or guild hall)" },
    { value: "sprawling", label: "Sprawling (e.g., compound, campus, or market square)" },
]

export const LOCATION_CONDITION = [
    { value: "dilapidated", label: "Dilapidated (falling apart, crumbling)"},
    { value: "rundown", label: "Rundown (neglected but still functional)"},
    { value: "weathered", label: "Weathered (aged, exposed to elements)"},
    { value: "modest", label: "Modest (clean but plain)"},
    { value: "well-kept", label: "Well-kept (maintained with care)"},
    { value: "pristine", label: "Pristine (immaculately clean and orderly)"},
    { value: "renovated", label: "Newly Renovated (recently refurbished)"},
    { value: "opulent", label: "Opulent (lavishly maintained, luxurious)"}
]

export type LocationCategory = typeof LOCATION_CATEGORIES[number]["value"];
export type LocationSize = typeof LOCATION_SIZE[number]["value"];
export type LocationCondition = typeof LOCATION_CONDITION[number]["value"];