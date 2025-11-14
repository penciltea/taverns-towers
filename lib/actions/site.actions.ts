'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { SiteType } from "@/interfaces/site.interface";
import { serializeSite } from "../util/serializers";
import { getCampaignPermissions } from "./campaign.actions";
import { canEdit } from "../auth/authPermissions";

type PartialSiteUpdate = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>> & { _id: string };

export async function getSites({
  userId,
  campaignId,
  settlementId,
  isPublic,
  page = 1,
  limit = 12,
  search = '',
  types,
  tone,
  favorite
}: {
  userId?: string;
  campaignId?: string;
  settlementId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  types?: string[];
  tone?: string[];
  favorite?: boolean;
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if(campaignId){
    query.campaignId = campaignId; // include sites in the campaign
  } else {
    query.campaignId = { $in: [null, undefined] };

    if (userId) {
      query.userId = userId; // fallback to personal sites
    }
  }

  if(settlementId === "wilderness"){
    query.settlementId = null;
  } else if(settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = settlementId;
  }
  

  if(typeof isPublic === 'boolean') query.isPublic = isPublic;

  if (search) query.name = { $regex: new RegExp(search, 'i') };
  if (types?.length) query.type = { $in: types };
  if (tone?.length) query.tone = { $all: tone };
  if (favorite) query.favorite = true;

  const total = await Site.countDocuments(query);
  const sites = await Site.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)

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

export async function getSitesBySettlement(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>,
  settlementId: string
) {
  const user = await requireUser();
  return getSites({ ...options, userId: user.id, settlementId });
}

export async function getCampaignSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>,
  campaignId: string,
  settlementId?: string
) {
  return getSites({...options, campaignId, settlementId: settlementId || undefined})
}

export async function getPublicSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>
) {
  return getSites({...options, isPublic: true})
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

export async function updateSite(data: SiteUpdateData, id: string, campaignId?: string) {
  await connectToDatabase();

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) throw new Error("Site not found");
  
  if(campaignId){
      const campaignPermissions = await getCampaignPermissions(campaignId);
      
      if (!canEdit(user?.id, { userId: data.userId ?? ""}, campaignPermissions ?? undefined)){
        throw new Error("Unauthorized");
      }
    } else if (existing.userId.toString() !== user.id) {
      throw new Error("Unauthorized");
    }



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
  if(existing.campaignId){
    const campaignPermissions = await getCampaignPermissions(existing.campaignId);
    if(!campaignPermissions || !campaignPermissions.isOwner) throw new Error("Unauthorized");

  } else if (existing.userId.toString() !== user.id) {
    throw new Error("Unauthorized");
  }

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



