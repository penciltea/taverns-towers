/**
 * Converts string ID arrays in an object to ObjectId arrays.
 *
 * @param data - The object containing fields with string ID arrays.
 * @param fields - Array of field names to convert.
 * @returns A new object with the specified fields converted to ObjectId[]
 */

import { Types } from "mongoose";

export function mapStringFieldsToObjectIds<
  T extends Record<string, unknown>,
  K extends keyof T
>(
  data: T,
  fields: readonly K[]
): Omit<T, K> & { [P in K]: Types.ObjectId[] } {
  const result = {} as Omit<T, K> & { [P in K]: Types.ObjectId[] };

  for (const key in data) {
    // Narrow key type
    const typedKey = key as keyof T;

    if (fields.includes(typedKey as K)) {
      const value = data[typedKey];
      // Explicit cast ensures TS understands this assignment is safe
      (result as { [P in K]: Types.ObjectId[] })[typedKey as K] = Array.isArray(value)
        ? value.map((id) => new Types.ObjectId(String(id)))
        : [];
    } else {
      // Copy non-converted fields
      (result as Omit<T, K>)[typedKey as Exclude<keyof T, K>] = data[typedKey] as T[Exclude<keyof T, K>];
    }
  }

  return result;
}