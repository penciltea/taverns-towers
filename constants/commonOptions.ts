export const pageSizeOptions = ["12", "24", "48", "96"];

export const sortOptions = [
  { label: 'Name (A–Z)', value: 'name-asc' },
  { label: 'Name (Z–A)', value: 'name-desc' },
  { label: 'Newest First', value: 'created-desc' },
  { label: 'Oldest First', value: 'created-asc' },
]

export type Flatten<T> = T extends Array<{ options: readonly any[] }>
  ? T[number]["options"][number]
  : never;