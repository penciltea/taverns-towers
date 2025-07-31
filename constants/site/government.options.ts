import { Flatten } from "../commonOptions";

export const GOVERNMENT_FUNCTIONS = [
    {
        label: "Administrative",
        options: [
            { label: "Archives & Records Hall", value: "archive" },
            { label: "Census Office", value: "census" },
            { label: "Customs Office", value: "customs" },
            { label: "Mayor's Office", value: "mayor" },
            { label: "Permits & Licensing Office", value: "permit" },
            { label: "Tax Office", value: "tax" },
            { label: "Town Hall", value: "townHall" }
        ]
    },
    {
        label: "Legal & Enforcement",
        options: [
            { label: "Barracks", value: "barracks" },
            { label: "Bounty Office", value: "bounty" },
            { label: "Courthouse", value: "courthouse" },
            { label: "Drill Yard", value: "drillYard" },
            { label: "Garrison", value: "garrison" },
            { label: "Guardhouse", value: "guardhouse" },
            { label: "Military Command Post", value: "command" },
            { label: "Prison", value: "prison" },
            { label: "Recruitment Office", value: "recruit" },
            { label: "Quartermaster's Station", value: "quartermaster" },
            { label: "Watch / Signal Tower", value: "watch" },
        ]
    },
    {
        label: "Diplomacy & Public Service",
        options: [
            { label: "Embassy", value: "embassy" },
            { label: "Employment Office", value: "employment" },
            { label: "Post Office", value: "postOffice" },
            { label: "Public Works Bureau", value: "publicWork" },
        ]
    },
    { 
        label: "Other", 
        options: [
            { label: "Other", value: "other" }
        ]
    }
]


export const SECURITY_LEVELS = [
  { value: "none", label: "None" },
  { value: "low", label: "Low (Basic patrols)" },
  { value: "moderate", label: "Moderate (Watch presence, restricted access)" },
  { value: "high", label: "High (Trained guards, checkpoints)" },
  { value: "very_high", label: "Very High (Wards, elite protection)" },
  { value: "top_secret", label: "Top Secret (Highest clearance only)" }
];

export type SiteSecurityLevel = typeof SECURITY_LEVELS[number]["value"];
export type SiteGovernmentFunctionType = Flatten<typeof GOVERNMENT_FUNCTIONS>["value"];