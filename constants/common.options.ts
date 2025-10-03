export const pageSizeOptions = ["12", "24", "48", "96"];

export const sortOptions = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Newest First', value: 'created-desc' },
  { label: 'Oldest First', value: 'created-asc' },
]

export const DOMAINS = [
  "Arts",
  "Beauty",
  "Chaos",
  "Cold",
  "Commerce",
  "Community",
  "Death",
  "Decay",
  "Dreams",
  "Earth",
  "Fate",
  "Fertility",
  "Forge",
  "Freedom",
  "Glory",
  "Grave",
  "Harvest",
  "Hunt",
  "Invention",
  "Judgment",
  "Knowledge",
  "Law",
  "Life",
  "Light",
  "Luck",
  "Magic",
  "Moon",
  "Nature",
  "Order",
  "Peace",
  "Protection",
  "Sea",
  "Secrets",
  "Shadow",
  "Storms",
  "Sun",
  "Time",
  "Travel",
  "Trickery",
  "Twilight",
  "Water",
  "War",
  "Other"
];


export const TONE = [
  "Test"
];


export type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;

export type DomainTypes = (typeof DOMAINS)[number]
export type ToneTypes = (typeof TONE)[number]