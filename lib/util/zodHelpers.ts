import { z } from "zod";
import { AppError } from "../errors/app-error";

/**
 * Creates an optional Zod enum that allows either a value from the provided array or undefined/empty string.
 * Useful for form inputs where the field is not required but must match a known set if present.
 */

export function extractValues<T extends readonly { value: string }[]>(
  arr: T
): [string, ...string[]] {
  const values = arr.map((item) => item.value);
  if (values.length === 0) {
    throw new AppError("Cannot create enum from empty array", 500);
  }
  return values as [string, ...string[]];
}

export function optionalEnum<T extends [string, ...string[]]>(allowed: T, errorMessage = "Invalid value") {
  return z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => val === undefined || allowed.includes(val as T[number]), {
      message: errorMessage,
    });
}

export function optionalEnumArray<T extends readonly string[]>(allowed: T, errorMessage = "Invalid value") {
  return z
    .array(z.string())
    .optional()
    .transform((arr) => (!arr || arr.length === 0 ? undefined : arr))
    .refine(
      (arr) => arr === undefined || arr.every((val) => allowed.includes(val as T[number])),
      { message: errorMessage }
    );
}