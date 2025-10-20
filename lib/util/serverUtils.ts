import { Types } from "mongoose";

export function toObjectIdArray(ids?: string[]): Types.ObjectId[] | undefined {
  return ids?.map((id) => new Types.ObjectId(id));
}