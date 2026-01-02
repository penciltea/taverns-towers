export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toTitleCase(str: string): string {
  return str.replace(/\b\w+/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
};

export function checkStringStartsWithVowel(value: string) {
  if (!value) return false;
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.some(vowel => value.toLowerCase().startsWith(vowel));
}

export function oxfordCommaList(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items[0] + ' and ' + items[1];
  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}