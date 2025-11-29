'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { SiteResponse, SiteType } from "@/interfaces/site.interface";
import { serializeSite } from "../util/serializers";
import { getCampaignPermissions } from "./campaign.actions";
import { canEdit } from "../auth/authPermissions";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";
import { handleActionResult } from "@/hooks/queryHook.util";
import { generateIdempotencyKey } from "../util/generateIdempotencyKey";

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
}): Promise<ActionResult<SiteResponse>> {
  return safeServerAction(async () => {
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
  })
}

export async function getOwnedSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>
): Promise<ActionResult<SiteResponse>> {
  const user = await requireUser();
  return getSites({ ...options, userId: user.id });
}

export async function getSitesBySettlement(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>,
  settlementId: string
): Promise<ActionResult<SiteResponse>> {
  const user = await requireUser();
  return getSites({ ...options, userId: user.id, settlementId });
}

export async function getCampaignSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>,
  campaignId: string,
  settlementId?: string
): Promise<ActionResult<SiteResponse>> {
  return getSites({...options, campaignId, settlementId: settlementId || undefined})
}

export async function getPublicSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>
): Promise<ActionResult<SiteResponse>> {
  return getSites({...options, isPublic: true})
}


export async function getSiteById(id: string): Promise<ActionResult<SiteType>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    if (!ObjectId.isValid(id)) throw new AppError("Invalid site ID", 400);

    const site = await Site.findById(id);
    if (!site) throw new AppError("Site not found", 404);

    return serializeSite(site);
  })
}



export async function createSite(data: SiteType, settlementId: string): Promise<ActionResult<SiteType>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();
    const model = Site.discriminators?.[data.type] || Site;

    const dbSettlementId = ObjectId.isValid(settlementId) ? new ObjectId(settlementId) : null;

    if (!data.idempotencyKey) {
      throw new AppError("Missing magic keys for item creation", 400);
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
  })
}

export async function updateSite(data: SiteUpdateData, id: string, campaignId?: string): Promise<ActionResult<SiteType>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const user = await requireUser();
    const existing = await Site.findById(id);

    if (!existing) throw new AppError("Site not found", 404);
    
    if(campaignId){
      const campaignPermissions = handleActionResult(
        await getCampaignPermissions(campaignId)
      );
      
      if (!canEdit(user?.id, { userId: data.userId ?? ""}, campaignPermissions ?? undefined)){
        throw new AppError("Unauthorized", 403);
      }
    } else if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
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
  })
}

export async function updateSitePartial(id: string, data: PartialSiteUpdate): Promise<ActionResult<SiteType>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid site ID", 400);

    const user = await requireUser();
    const existing = await Site.findById(id);

    if (!existing) throw new AppError("Site not found", 404);
    if(existing.campaignId){
      const campaignPermissions = handleActionResult(
        await getCampaignPermissions(existing.campaignId)
      );
      if(!campaignPermissions || !campaignPermissions.isOwner) throw new AppError("Unauthorized", 403);

    } else if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
    }

    const model = Site.discriminators?.[existing.type] || Site;

    const updatedSite = await model.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    );

    if (!updatedSite) throw new AppError("Failed to update site", 400);

    // Revalidate the settlement page if needed
    if (updatedSite.settlementId) {
      revalidatePath(`/settlements/${updatedSite.settlementId}`);
    }

    return serializeSite(updatedSite);
  });
}



export async function deleteSite(id: string): Promise<ActionResult<{ message: string, status: number}>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid site ID", 400);

    const user = await requireUser();
    const existing = await Site.findById(id);

    if (!existing) throw new AppError("Site not found", 404);

    if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
    }

    const deletedSite = await Site.findByIdAndDelete(id);
    if (!deletedSite) throw new AppError("Site not found", 404);

    if (deletedSite?.settlementId) revalidatePath(`/settlement/${deletedSite.settlementId}`);
    return { message: "Site successfully deleted", status: 200};
  })
}

type SiteUpdateData = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>>;



export async function copySite(id: string): Promise<ActionResult<SiteType>>{
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid site ID", 404);

    const user = await requireUser();
    const original = await Site.findById(id);

    if(!original) throw new AppError("Cannot find the original site", 404);

    if(!user) throw new AppError("Sorry, you must be logged in to perform this action.", 500);

    const {
      _id,
      createdAt,
      updatedAt,
      idempotencyKey,
      ...rest
    } = original;

    console.log("original: ", original);
    const model = Site.discriminators?.[original.type] || Site;

    const duplicatedSite = {
      ...rest,
      name: `${original.name} (Copy)`,
      userId: new ObjectId(user.id),
      campaignId: original.campaignId ? new ObjectId(original.campaignId.toString()) : undefined,
      settlementId: original.settlementId ? new ObjectId(original.settlementId.toString()) : undefined,
      idempotencyKey: generateIdempotencyKey()
    }

    console.log("duplicated site: ", duplicatedSite);

    if (!duplicatedSite.idempotencyKey) {
        throw new AppError("Missing magic keys for item creation", 400);
    }

    const newSiteDoc = await model.create(duplicatedSite);

    return serializeSite(newSiteDoc);
  })
}