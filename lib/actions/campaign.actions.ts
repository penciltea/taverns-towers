'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import CampaignModel from "@/lib/models/campaign.model";
import { CampaignForDB, PlayerForDB } from "@/interfaces/campaign.interface";
import { serializeCampaign } from "../util/serializers";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { resolveUserId } from "./user.actions";
import { Types } from "mongoose";

export async function transformCampaignFormData(
  data: CampaignFormData
): Promise<Omit<CampaignFormData, "players"> & { players: PlayerForDB[] }> {

  const base: Omit<CampaignFormData, "players"> & { players: PlayerForDB[] } = {
    ...data,
    tone: data.tone ?? [],
    genre: data.genre ?? [],
    players: [], // explicitly typed
  };

  if (Array.isArray(data.players)) {
    const transformedPlayers: PlayerForDB[] = (
      await Promise.all(
        data.players.map(async (player) => {
          if (player.identifier) {
            try {
              const userId = new ObjectId(await resolveUserId(player.identifier)).toString();
              return { userId, roles: player.roles }; // PlayerForDB type
            } catch {
              console.warn(`Skipping unresolved player: ${player.identifier}`);
              return null;
            }
          }
          return null;
        })
      )
    ).filter((p): p is PlayerForDB => p !== null);

    base.players = transformedPlayers;
  }
  console.log("action: " , base);
  return base;
}

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
        .lean<CampaignForDB[]>();

    const serializedCampaigns = campaigns.map((campaign) => ({
        ...campaign,
        _id: campaign._id.toString(),
        userId: campaign.userId.toString(),
        players: campaign.players.map((player) => ({
            ...player,
            userId: player.userId.toString(),
        }))
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

export async function createCampaign(data: Partial<CampaignForDB>) {
    await connectToDatabase();
      const user = await requireUser();
      
      console.log("action data: " , data);
    
      if (!data.idempotencyKey) {
        throw new Error("Missing idempotency key for idempotent creation");
      }
    
      // Check if a campaign with this key already exists
      const existing = await CampaignModel.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
      if (existing) {
        return serializeCampaign(existing); // Return existing campaign instead of creating duplicate
      }

        const players = (data.players ?? []).map(player => ({
            ...player,
            userId: new ObjectId(player.userId)
        }));
      
      const newCampaign = await CampaignModel.create({
        ...data,
        players,
        userId: new ObjectId(user.id)
      });
    
      revalidatePath("/campaigns"); // ToDo: Update?
      return serializeCampaign(newCampaign);
}

export async function updateCampaign(id: string, data: Partial<CampaignForDB>) {
    await connectToDatabase();
    const user = await requireUser();
    const campaign = await CampaignModel.findById(id);

    if (!campaign) {
        throw new Error("Campaign not found");
    }

    if (campaign.userId.toString() !== user.id) {
        throw new Error("Unauthorized to update this campaign");
    }

    Object.assign(campaign, { ...data });
    await campaign.save();

    revalidatePath("/campaigns");
    return serializeCampaign(campaign);
}

export async function deleteCampaign(id: string) {
    return (async () => {
        await connectToDatabase();
        const user = await requireUser();
        const campaign = await CampaignModel.findById(id);

        if (!campaign) {
            throw new Error("Campaign not found");
        }
        if (campaign.userId.toString() !== user.id) {
            throw new Error("Unauthorized to delete this campaign");
        }

        await CampaignModel.deleteOne({ _id: id });
        revalidatePath("/campaigns");
        return { success: true };
    })
}