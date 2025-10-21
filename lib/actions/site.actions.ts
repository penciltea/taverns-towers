'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { PaginatedQueryParams, PaginatedQueryResponse, SiteType } from "@/interfaces/site.interface";
import { serializeSite } from "../util/serializers";

type PartialSiteUpdate = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>> & { _id: string };

function getPagination(page?: number, limit?: number) {
  const safePage = Math.max(Number(page) || 1, 1);
  const safeLimit = Math.min(Math.max(Number(limit) || 12, 1), 100);
  return { skip: (safePage - 1) * safeLimit, limit: safeLimit, page: safePage };
}

export async function getPublicSitesPaginated({
  page,
  limit,
  search,
  types,
  tone,
}: PaginatedQueryParams): Promise<PaginatedQueryResponse<SiteType>> {
  await connectToDatabase();

  try {
    const query: Record<string, unknown> = { isPublic: true };
    if (typeof search === "string" && search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }
    if (types?.length) query.type = { $in: types };
    if (tone?.length) query.tone = { $all: tone };

    const { skip, limit: safeLimit, page: safePage } = getPagination(page, limit);

    const [sites, total] = await Promise.all([
      Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      Site.countDocuments(query),
    ]);

    return {
      success: true,
      sites: sites.map(serializeSite),
      total,
      currentPage: safePage,
      totalPages: Math.ceil(total / safeLimit),
    };
  } catch (error) {
    return {
      success: false,
      sites: [],
      total: 0,
      currentPage: 1,
      totalPages: 1,
      error: (error as Error).message,
    };
  }
}

export async function getOwnedSitesPaginated({
  page,
  limit,
  search,
  types,
  tone,
  favorite,
}: PaginatedQueryParams): Promise<PaginatedQueryResponse<SiteType>> {
  await connectToDatabase();

  try {
    const user = await requireUser();
    const query: Record<string, unknown> = { userId: new ObjectId(user.id) };

    if (typeof search === "string" && search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }
    if (types?.length) query.type = { $in: types };
    if (tone?.length) query.tone = { $all: tone };
    if (favorite) query.favorite = true;

    const { skip, limit: safeLimit, page: safePage } = getPagination(page, limit);

    const [sites, total] = await Promise.all([
      Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      Site.countDocuments(query),
    ]);

    return {
      success: true,
      sites: sites.map(serializeSite),
      total,
      currentPage: safePage,
      totalPages: Math.ceil(total / safeLimit),
    };
  } catch (error) {
    return {
      success: false,
      sites: [],
      total: 0,
      currentPage: 1,
      totalPages: 1,
      error: (error as Error).message,
    };
  }
}

export async function getSitesBySettlementPaginated({
  settlementId,
  page,
  limit,
  search,
  types,
  tone,
  favorite,
}: PaginatedQueryParams & { settlementId: string | null }): Promise<PaginatedQueryResponse<SiteType>> {
  await connectToDatabase();

  try {
    const query: Record<string, unknown> = {};

    if (settlementId === "wilderness") {
      query.settlementId = null;
    } else if (settlementId && ObjectId.isValid(settlementId)) {
      query.settlementId = new ObjectId(settlementId);
    } else {
      return {
        success: false,
        sites: [],
        total: 0,
        currentPage: 1,
        totalPages: 1,
        error: "Invalid settlementId provided",
      };
    }

    if (typeof search === "string" && search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }
    if (types?.length) query.type = { $in: types };
    if (tone?.length) query.tone = { $all: tone };
    if (favorite) query.favorite = true;

    const { skip, limit: safeLimit, page: safePage } = getPagination(page, limit);

    const [sites, total] = await Promise.all([
      Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(safeLimit),
      Site.countDocuments(query),
    ]);

    return {
      success: true,
      sites: sites.map(serializeSite),
      total,
      currentPage: safePage,
      totalPages: Math.ceil(total / safeLimit),
    };
  } catch (error) {
    return {
      success: false,
      sites: [],
      total: 0,
      currentPage: 1,
      totalPages: 1,
      error: (error as Error).message,
    };
  }
}

export async function getSiteById(id: string) {
  await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return { success: false, error: "Invalid site ID" };
  }

  const site = await Site.findById(id);
  if (!site) {
    return { success: false, error: "Site not found" };
  }

  return { success: true, site: serializeSite(site) };
}



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
    revalidatePath(`/settlements/${dbSettlementId.toString()}`);
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
    revalidatePath(`/settlements/${updated.settlementId}`);
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

  const updatedSite = await model.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  if (!updatedSite) throw new Error("Failed to update site");

  // Revalidate the settlement page if needed
  if (updatedSite.settlementId) {
    revalidatePath(`/settlements/${updatedSite.settlementId}`);
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

type SiteUpdateData = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>>;



