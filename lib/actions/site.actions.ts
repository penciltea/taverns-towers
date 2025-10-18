'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { SiteType } from "@/interfaces/site.interface";
import { serializeSite } from "../util/serializers";

type PartialSiteUpdate = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>> & { _id: string };

export async function createSite(data: SiteType, settlementId: string) {
  await connectToDatabase();
  const user = await requireUser();
  const model = Site.discriminators?.[data.type] || Site;

  const dbSettlementId = ObjectId.isValid(settlementId) ? new ObjectId(settlementId) : null;

  if (!data.idempotencyKey) {
    throw new Error("Missing idempotency key for idempotent creation");
  }

  // Check if an settlement with this key already exists
  const existing = await model.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
  if (existing) {
    return serializeSite(existing); // Return existing settlement instead of creating duplicate
  }

  const newSite = await model.create({
    ...data,
    settlementId: dbSettlementId,
    userId: new ObjectId(user.id),
  });


  if (dbSettlementId) {
    revalidatePath(`/settlement/${dbSettlementId.toString()}`);
  } else {
    revalidatePath(`/wilderness`);
  }
  
  return serializeSite(newSite);
}

export async function updateSite(data: SiteUpdateData, id: string) {
  await connectToDatabase();

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) throw new Error("Site not found");
  if (existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const model = Site.discriminators?.[existing.type] || Site;

  const updated = await model.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  if (updated?.settlementId) {
    revalidatePath(`/settlement/${updated.settlementId}`);
  }

  return serializeSite(updated);
}

export async function updateSitePartial(id: string, data: PartialSiteUpdate) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) throw new Error("Site not found");
  if (existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const model = Site.discriminators?.[existing.type] || Site;

  // Remove _id if it somehow got included in the data
  const { _id, ...updateData } = data;

  const updatedSite = await model.findByIdAndUpdate(
    id,
    { ...updateData },
    { new: true }
  );

  if (!updatedSite) throw new Error("Failed to update site");

  // Revalidate the settlement page if needed
  if (updatedSite.settlementId) {
    revalidatePath(`/settlement/${updatedSite.settlementId}`);
  }

  return serializeSite(updatedSite);
}



export async function deleteSite(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) {
    // already deleted – just return a success-like response
    return { success: true, message: "Already deleted" };
  }

  if (existing.userId.toString() !== user.id) {
    throw new Error("Unauthorized");
  }

  const deletedSite = await Site.findByIdAndDelete(id);
  if (!deletedSite) throw new Error("Site not found");

  if (deletedSite?.settlementId) revalidatePath(`/settlement/${deletedSite.settlementId}`);
  return { success: true };
}

export async function getPublicSitesPaginated({
  page = 1,
  limit = 12,
  name,
  types,
  tone,
}: {
  page?: number;
  limit?: number;
  name?: string;
  types?: string[];
  tone?: string[];
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = { isPublic: true };

  if (name) query.name = new RegExp(name, "i");
  if (types?.length) query.type = { $in: types };
  if (tone?.length) query.tone = { $all: tone };

  const skip = (page - 1) * limit;
  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  return {
    success: true,
    sites: sites.map(serializeSite),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getOwnedSitesPaginated({
  page = 1,
  limit = 12,
  name,
  types,
  tone,
  favorite,
}: {
  page?: number;
  limit?: number;
  name?: string;
  types?: string[];
  tone?: string[];
  favorite?: boolean;
}) {
  await connectToDatabase();
  const user = await requireUser();

  const query: Record<string, unknown> = { userId: new ObjectId(user.id) };
  if (name) query.name = new RegExp(name, "i");
  if (types?.length) query.type = { $in: types };
  if (tone?.length) query.tone = { $all: tone };
  if (favorite) query.favorite = true;

  const skip = (page - 1) * limit;
  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  return {
    success: true,
    sites: sites.map(serializeSite),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getSitesBySettlementPaginated({
  settlementId,
  page = 1,
  limit = 12,
  name,
  types,
  tone,
  favorite,
}: {
  settlementId: string | null;
  page?: number;
  limit?: number;
  name?: string;
  types?: string[];
  tone?: string[];
  favorite?: boolean;
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (settlementId === "wilderness") {
    query.settlementId = null;
  } else if (settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = new ObjectId(settlementId);
  } else {
    throw new Error("Invalid settlementId provided");
  }

  if (name) query.name = new RegExp(name, "i");
  if (types?.length) query.type = { $in: types };
  if (tone?.length) query.tone = { $all: tone };
  if (favorite) query.favorite = true;

  const skip = (page - 1) * limit;
  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  return {
    success: true,
    sites: sites.map(serializeSite),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getSiteById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const site = await Site.findById(id);
  if (!site) throw new Error("Site not found");
  return serializeSite(site);
}

type SiteUpdateData = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>>;



