export const getRandomFromArray = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};


type SubsetOptions =
  | { count: number }
  | { min: number; max: number };

export function getRandomSubset<T>(arr: T[], options: SubsetOptions): T[] {
  if (!arr.length) return [];

  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  const unique = Array.from(new Set(shuffled));

  if ("count" in options) {
    const count = Math.max(0, Math.min(options.count, unique.length));
    return unique.slice(0, count);
  }

  const { min, max } = options;
  const boundedMin = Math.max(0, min);
  const boundedMax = Math.min(max, unique.length);
  const randomCount = Math.floor(Math.random() * (boundedMax - boundedMin + 1)) + boundedMin;

  return unique.slice(0, randomCount);
}

/**
 * Utility to randomly pick a single item from an array.
 */
export function getRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}


/**
 * A utility function to pick value(s) based on weights
 */

export function weightedRandom<T extends { value: string; weight?: number }>(items: T[]): T | undefined {
  const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item));
  return weightedList.length > 0
    ? weightedList[Math.floor(Math.random() * weightedList.length)]
    : undefined;
}

/**
 * A util function that determines if a field should be replaced or not
 * Looks for empty or "random" values
 * @param value 
 * @returns 
 */

export function shouldReplace(value: unknown): boolean {
  if (value === undefined || value === null || value === "") return true;

  if (Array.isArray(value)) {
    // Replace if array is empty or includes "random"
    return (
      value.length === 0 ||
      value.some(v => typeof v === "string" && v.toLowerCase() === "random")
    );
  }

  if (typeof value === "string") {
    return value.toLowerCase() === "random";
  }

  return false;
}