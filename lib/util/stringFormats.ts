export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toTitleCase(str: string): string {
  return str.replace(/\b\w+/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
};