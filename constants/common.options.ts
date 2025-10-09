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
  "Chaotic",
  "Corrupt",
  "Dark / Gritty",
  "Decadent",
  "Dystopian",
  "Eerie",
  "Fantastical",
  "Festive",
  "Hopeful",
  "Melancholy",
  "Mystical",
  "Noble / Regal",
  "Oppressive",
  "Rustic",
  "Sacred / Reverent",
  "Somber",
  "Whimsical",
  "Other"
];

export const THEME = [
  {
    label: "Fantasy Inspired",
    options: [
      { label: "Dark Elven-Inspired", value: "Dark Elven-Inspired"},
      { label: "Dwarven-Inspired", value: "Dwarven-Inspired" },
      { label: "Elven-Inspired", value: "Elven-Inspired" },
    ]
  }
]


export type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;

export type DomainTypes = (typeof DOMAINS)[number];
export type ToneTypes = (typeof TONE)[number];
export type ThemeTypes = Flatten<typeof THEME>["value"];