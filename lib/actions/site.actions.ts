'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { SiteType } from "@/interfaces/site.interface";
import { serializeSite } from "../util/serializers";

export async function createSite(data: SiteType, settlementId: string) {
  await connectToDatabase();
  const user = await requireUser();
  const model = Site.discriminators?.[data.type] || Site;

  const dbSettlementId = ObjectId.isValid(settlementId) ? new ObjectId(settlementId) : null;

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



export async function getSitesPaginated(
  settlementId: string | null,
  page: number = 1,
  limit: number = 12,
  name: string,
  types?: string[],
  userId?: string,
) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};
  
  if (settlementId === 'wilderness') {
    query.settlementId = null; // Query for wilderness sites
  } else if (settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = new ObjectId(settlementId);
  } else if (settlementId && settlementId !== 'wilderness') {
    throw new Error("Invalid settlementId passed to getSitesPaginated");
  }

  if (types && types.length > 0) {
    query.type = { $in: types };
  }
  if (name) {
    query.name = new RegExp(name, "i");
  }

  if (userId) {
    query.userId = new ObjectId(userId);
  }

  const skip = (page - 1) * limit;

  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    sites: sites.map(serializeSite),
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getSites({
  userId,
  isPublic,
  settlementId,
  page = 1,
  limit = 12,
  name,
  types = [],
}: {
  userId?: string;
  isPublic?: boolean;
  settlementId?: string | null;
  page?: number;
  limit?: number;
  name?: string;
  types?: string[];
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (userId) query.userId = new ObjectId(userId);
  if (typeof isPublic === 'boolean') query.isPublic = isPublic;

  if (settlementId === 'wilderness') {
    query.settlementId = null;
  } else if (settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = new ObjectId(settlementId);
  }

  if (name) {
    query.name = new RegExp(name, 'i');
  }

  if (types.length > 0) {
    query.type = { $in: types };
  }

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

export async function getOwnedSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>
) {
  const user = await requireUser();
  return getSites({ ...options, userId: user.id });
}

export async function getPublicSites(
  options: Omit<Parameters<typeof getSites>[0], 'isPublic'>
) {
  return getSites({ ...options, isPublic: true });
}


export async function getSiteById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const site = await Site.findById(id);
  if (!site) throw new Error("Site not found");
  return serializeSite(site);
}

type SiteUpdateData = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>>;



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