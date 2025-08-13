/**
 * Converts string ID arrays in an object to ObjectId arrays.
 *
 * @param data - The object containing fields with string IDs.
 * @param fields - Array of field names to convert.
 * @returns A new object with the specified fields converted to ObjectId[]
 */

import mongoose, { Types } from "mongoose";

export function mapStringFieldsToObjectIds<T extends Record<string, any>, K extends keyof T>(
  data: T,
  fields: K[]
): Omit<T, K> & Record<K, Types.ObjectId[]> {
  const result = { ...data } as any;

  fields.forEach((field) => {
    const values = result[field];
    // Always produce an array of ObjectId, even if empty or undefined
    result[field] = (Array.isArray(values) ? values : []).map((id: string) => new mongoose.Types.ObjectId(id));
  });

  return result;
}