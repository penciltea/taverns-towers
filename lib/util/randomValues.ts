export const getRandomFromArray = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};


type SubsetOptions =
  | { count: number }
  | { min: number; max: number };

export function getRandomSubset<T>(arr: T[], options: SubsetOptions): T[] {
  if (!arr.length) return [];

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  if ("count" in options) {
    const count = Math.max(0, Math.min(options.count, arr.length));
    return shuffled.slice(0, count);
  }

  const { min, max } = options;
  const boundedMin = Math.max(0, min);
  const boundedMax = Math.min(max, arr.length);
  const randomCount = Math.floor(Math.random() * (boundedMax - boundedMin + 1)) + boundedMin;

  return shuffled.slice(0, randomCount);
}

/**
 * Utility to randomly pick a single item from an array.
 */
export function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}