import { CommonInterface } from "@/interfaces/common.interface";

export type NormalizedCommonInput = Omit<CommonInterface, '_id' | 'createdAt' | 'updatedAt'>;

export function normalizeCommonInput(data: Partial<CommonInterface>): NormalizedCommonInput {
  return {
    name: data.name?.trim() || "Untitled",
    userId: data.userId || "",
    editors: data.editors ?? [],
    isPublic: data.isPublic ?? false,
    publicNotes: data.publicNotes?.trim() || "",
    gmNotes: data.gmNotes?.trim() || "",
  };
}

export const defaultCommonFields: NormalizedCommonInput = {
  name: "",
  userId: "",
  editors: [],
  isPublic: false,
  publicNotes: "",
  gmNotes: "",
};