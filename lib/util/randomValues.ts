export const getRandomFromArray = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomSubset = <T,>(arr: T[], min = 1, max = 3): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

/**
 * Utility to randomly pick a single item from an array.
 */
export function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}