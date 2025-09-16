export const SECRECY_LEVELS = [
  { value: "unknown", label: "Unknown (Unnoticed, not hidden)" },
  { value: "concealed", label: "Concealed (Blends into surroundings)" },
  { value: "guarded", label: "Guarded (Few know of it)" },
  { value: "encrypted", label: "Encrypted (Codes or riddles required)" },
  { value: "magically_hidden", label: "Magically Hidden (Arcane concealment)" },
  { value: "mythical", label: "Mythical (Believed to be legend)" }
];

export const KNOWN_TO = [
  { value: "adventurers", label: "Adventurers / Wanderers" },
  { value: "clergy", label: "Clergy / Religious Orders" },
  { value: "locals", label: "Local Population" },
  { value: "mages", label: "Mages / Arcane Orders" },
  { value: "merchants", label: "Merchants / Traders" },
  { value: "nobility", label: "Nobles / Royalty" },
  { value: "scholars", label: "Historians / Scholars" },
  { value: "military", label: "Military / Guards" },
  { value: "secret", label: "Secret Societies / Cults" },
  { value: "thievesGuild", label: "Thieves' Guild / Criminals" },
  { value: "other", label: "Other" }
];

export const DEFENSE = [
  { value: "alarms", label: "Alarms / Alerts" },
  { value: "beasts", label: "Trained Beasts / Pets" },
  { value: "doors", label: "Secret Doors / Hidden Entrances" },
  { value: "fortifications", label: "Walls / Barricades / Fortifications" },
  { value: "guards", label: "Guards / Watchmen" },
  { value: "magic", label: "Magical Wards / Enchantments" },
  { value: "monsters", label: "Monsters" },
  { value: "poison", label: "Poisonous or Hazardous Defenses" },
  { value: "traps", label: "Traps / Mechanical Defenses" },
  { value: "other", label: "Other" }
];

export const PURPOSE = [
  { value: "shrine", label: "Ancient / Forgotten Shrine" },
  { value: "research", label: "Arcane / Magical Research" },
  { value: "criminal", label: "Criminal Activity" },
  { value: "guild", label: "Guild / Organization Headquarters" },
  { value: "meeting", label: "Secret Meeting Place" },
  { value: "military", label: "Military / Strategic Outpost" },
  { value: "noble", label: "Noble / Aristocratic Residence" },
  { value: "occult", label: "Occult / Ritual Site" },
  { value: "treasure", label: "Treasure / Hoard Hiding" },
  { value: "worship", label: "Religious / Worship Site" },
  { value: "other", label: "Other" }
];

export type SiteSecrecyLevel = typeof SECRECY_LEVELS[number]["value"];
export type SiteKnownTo = typeof KNOWN_TO[number]["value"];
export type SiteDefense = typeof DEFENSE[number]["value"];
export type SitePurpose = typeof PURPOSE[number]["value"];