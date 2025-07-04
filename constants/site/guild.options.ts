/* For Guild site type form */
export const GUILD_TYPES = [
  {
    label: "Adventuring & Combat",
    options: [
      { label: "Adventurers' Guild", value: "adventurer" },
      { label: "Assassins' Guild", value: "assassin" },
      { label: "Beast Tamers' Guild", value: "beastTamer" },
      { label: "Hunters' Guild", value: "hunter" },
      { label: "Monster Hunters' Guild", value: "monsterHunter" },
      { label: "Spy Network (Front Guild)", value: "spy" },
      { label: "Thieves' Guild", value: "thief" }
    ]
  },
  {
    label: "Craft & Trade",
    options: [
      { label: "Alchemists' Guild", value: "alchemist" },
      { label: "Cartographers' Guild", value: "cartographer" },
      { label: "Fletchers' Guild", value: "fletcher" },
      { label: "Glassblowers' Guild", value: "glassblower" },
      { label: "Jeweler's Guild", value: "jeweler" }, 
      { label: "Leatherworkers' Guild", value: "leatherworker" },
      { label: "Scribes' Guild", value: "scribe" },
      { label: "Smiths' Guild", value: "smith" },
      { label: "Stonecutters' Guild", value: "stoneCutter" }, 
      { label: "Tailors' Guild", value: "tailor" },
      { label: "Tinkers' Guild", value: "tinker" },
      { label: "Woodworkers' Guild", value: "woodworker" }, 
      { label: "Artisans' Guild", value: "artisan" }
    ]
  },
  {
    label: "Arcane & Esoteric",
    options: [
      { label: "Druids' Guild", value: "druid" }, 
      { label: "Mages' Guild", value: "mage" },
      { label: "Healers' Guild", value: "healer" },
      { label: "Scholars' Guild", value: "scholar" }     
    ]
  },
  {
    label: "Exploration & Industry",
    options: [
      { label: "Couriers' Guild", value: "courier" },
      { label: "Dockworkers' Guild", value: "dockworker" },
      { label: "Foresters' Guild", value: "forester" },
      { label: "Laborers' Guild", value: "laborer" },
      { label: "Miners' Guild", value: "miner" },
      { label: "Seafarers' Guild", value: "seafarer" },
      { label: "Explorers' Guild", value: "explorer" }
    ]
  },
  {
    label: "Commerce & Culture",
    options: [
      { label: "Artists' Guild", value: "artist" },
      { label: "Auctioneers' Guild", value: "auctioneer" },
      { label: "Bankers' Guild", value: "banker"},
      { label: "Courtiers' Guild", value: "courtier" },
      { label: "Entertainers' Guild", value: "entertainer" },
      { label: "Information Brokers' Guild", value: "broker" },
      { label: "Merchants' Guild", value: "merchant" }
    ]
  },
  {
    label: "Other",
    options: [
      { label: "Other", value: "other" }
    ]
  }
];

export const GUILD_MEMBERSHIP_REQUIREMENTS = [
  {
    label: "Standard Requirements",
    options: [
      { label: "Monthly Dues", value: "monthlyDues" },
      { label: "Entrance Fee", value: "entranceFee" },
      { label: "Recommendation from Member", value: "recommendation" },
      { label: "Probationary Period", value: "probationPeriod" },
    ],
  },
  {
    label: "Skill or Experience",
    options: [
      { label: "Demonstrated Skill in Trade", value: "skillTest" },
      { label: "Amount of Experience", value: "experience" },
      { label: "Completion of Trial Task", value: "trialTask" },
      { label: "Passing a Test or Examination", value: "testPass" },
    ],
  },
  {
    label: "Social or Political",
    options: [
      { label: "Noble Lineage or Title", value: "nobleLineage" },
      { label: "Political Allegiance", value: "politicalAllegiance" },
      { label: "Guild Sponsorship", value: "sponsorship" },
    ],
  },
  {
    label: "Arcane or Esoteric",
    options: [
      { label: "Arcane Aptitude", value: "arcaneAptitude" },
      { label: "Divine Calling", value: "divineCalling" },
      { label: "Bloodline Requirement", value: "bloodline" },
    ],
  },
  {
    label: "Other / Unusual",
    options: [
      { label: "Unknown to Public", value: "secret" },
      { label: "No Requirements (Open to All)", value: "openMembership" },
      { label: "Must Defeat a Member in a Duel", value: "duelChallenge" },
    ],
  },
];


type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;


export type SiteGuildType = Flatten<typeof GUILD_TYPES>["value"];
export type SiteGuildMembershipType = Flatten<typeof GUILD_MEMBERSHIP_REQUIREMENTS>["value"];