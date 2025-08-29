/**
 * Converts a domain model (with string IDs & ISO dates)
 * into its MongoDB persistence shape.
 */

import { ObjectId } from "mongodb";

export type DbShape<T extends { _id: string; userId: string; createdAt: string; updatedAt: string }> =
  Omit<T, "_id" | "userId" | "createdAt" | "updatedAt"> & {
    _id: ObjectId;
    userId: string | ObjectId | { _id: ObjectId };
    createdAt: Date;
    updatedAt: Date;
  };
