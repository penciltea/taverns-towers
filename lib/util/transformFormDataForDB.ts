import { SiteFormData } from "@/schemas/site.schema";
import { SettlementFormData } from "@/schemas/settlement.schema";
import { NpcFormData } from "@/schemas/npc.schema";
import { Types } from "mongoose";

export function toObjectIdArray(ids?: string[]): Types.ObjectId[] | undefined {
  return ids?.map((id) => new Types.ObjectId(id));
}

export function transformSettlementFormData(data: SettlementFormData) {
  return {
    ...data,
    tags: data.tags ?? [],
    terrain: data.terrain ?? [],
    leader: data.leader ?? [],    // keeps string[] for UI
    crime: data.crime ?? [],
    map:
      typeof data.map === "string" && data.map.startsWith("http")
        ? data.map
        : undefined,
  };
}


export function transformSiteFormData(data: SiteFormData) {
  return {
    ...data,
    image:
      typeof data.image === "string" && data.image.startsWith("http")
        ? data.image
        : undefined,
  };
}

export function transformNpcFormData(data: NpcFormData) {
  return {
    ...data,
    image:
      typeof data.image === "string" && data.image.startsWith("http")
        ? data.image
        : undefined,
  };
}
