'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import CampaignModel from "@/lib/models/campaign.model";
import { Campaign } from "@/interfaces/campaign.interface";
import { normalizePlayers } from "@/lib/util/normalize";
import { serializeCampaign } from "../util/serializers";

export async function getCampaigns({
    userId,
    isPublic,
    page = 1,
    limit = 12,
    search = '',
    tone = [],
}: {
    userId?: string;
    isPublic?: boolean;
    page?: number;
    limit?: number;
    search?: string;
    tone?: string[];
}) {
    await connectToDatabase();
    const query: Record<string, unknown> = {};

    if (userId) query.userId = userId;

    if (typeof isPublic === 'boolean') query.isPublic = isPublic;

    if (search) query.name = { $regex: new RegExp(search, 'i') };

    if (tone.length > 0) query.tone = { $all: tone };

    const total = await CampaignModel.countDocuments(query);
    const campaigns = await CampaignModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean<Campaign[]>();

    const serializedCampaigns = campaigns.map((campaign) => ({
        ...campaign,
        _id: campaign._id.toString(),
        userId: campaign.userId.toString(),
        players: campaign.players.map((player) => ({
            ...player,
            id: player.userId.toString(),
        })),
    }));

    return {
        success: true,
        campaigns: serializedCampaigns,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
}

export async function getOwnedCampaigns(
    options: Omit<Parameters<typeof getCampaigns>[0], 'userId'>
){
    const user = await requireUser();
    return getCampaigns({ ...options, userId: user.id });
}

export async function getPublicCampaigns(options: Omit<Parameters<typeof getCampaigns>[0], 'isPublic'>) {
  return getCampaigns({ ...options, isPublic: true });
}

export async function getCampaignById(id: string) {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new Error("Invalid campaign ID");

    const campaign = await CampaignModel.findById(id);
    if (!campaign) throw new Error("Campaign not found");

    return serializeCampaign(campaign);
}

export async function createCampaign(data: Partial<Campaign>) {
    await connectToDatabase();
      const user = await requireUser();
    
      if (!data.idempotencyKey) {
        throw new Error("Missing idempotency key for idempotent creation");
      }
    
      // Check if a campaign with this key already exists
      const existing = await CampaignModel.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
      if (existing) {
        return serializeCampaign(existing); // Return existing campaign instead of creating duplicate
      }
    
      // Normalize player ids
      const normalizedPlayers = normalizePlayers(data.players);
      
    
      const newCampaign = await CampaignModel.create({
        ...data,
        userId: new ObjectId(user.id),
        players: normalizedPlayers,
      });
    
      revalidatePath("/campaigns"); // ToDo: Update?
      return serializeCampaign(newCampaign);
}