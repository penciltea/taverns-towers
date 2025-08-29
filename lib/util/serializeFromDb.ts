import { ObjectId } from "mongodb";

// Handles Mongoose-style documents with possible toObject() methods
type DbDocument<T> = T & { toObject?: () => T };

type Serializable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | ObjectId
  | SerializableObject
  | Array<Serializable>;

interface SerializableObject {
  [key: string]: Serializable;
}

/**
 * Recursively serializes an object to plain JSON-compatible data.
 * Converts ObjectId to string, Dates to ISO strings, and handles nested arrays/objects.
 */
export function serializeFromDb<T extends Record<string, unknown>>(obj: T | DbDocument<T>): Serializable {
  const plain: Record<string, unknown> =
    "toObject" in obj && typeof obj.toObject === "function" ? obj.toObject() : { ...obj };

  const serializeValue = (val: unknown): Serializable => {
    if (val instanceof ObjectId) return val.toString();
    if (val instanceof Date) return val.toISOString();
    if (Array.isArray(val)) return val.map(serializeValue);
    if (val && typeof val === "object") return serializeFromDb(val as Record<string, unknown>);
    return val as Serializable;
  };

  const result: Record<string, unknown> = {};

  for (const key in plain) {
    if (!Object.prototype.hasOwnProperty.call(plain, key)) continue;

    const value = plain[key];

    // Normalize common user reference fields
    if (key === "userId") {
      result[key] =
        typeof value === "string"
          ? value
          : value instanceof ObjectId
          ? value.toString()
          : typeof value === "object" && value !== null && "_id" in value
          ? String((value as { _id: ObjectId })._id)
          : "";
    } else if (key === "editors" && Array.isArray(value)) {
      result[key] = value.map((editor) =>
        typeof editor === "string"
          ? editor
          : editor instanceof ObjectId
          ? editor.toString()
          : typeof editor === "object" && editor !== null && "_id" in editor
          ? String((editor as { _id: ObjectId })._id)
          : ""
      );
    } else {
      result[key] = serializeValue(value as Serializable);
    }
  }

  // Always ensure _id exists and is a string
  result._id =
    plain._id instanceof ObjectId ? plain._id.toString() : plain._id;

  return result as Serializable;
}