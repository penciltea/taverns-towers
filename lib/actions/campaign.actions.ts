'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import CampaignModel from "@/lib/models/campaign.model";
import { CampaignForClient, CampaignForDB, CampaignPermissions, PlayerForClient, PlayerForDB } from "@/interfaces/campaign.interface";
import { serializeCampaign } from "../util/serializers";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { resolveUserId } from "./user.actions";
import { CAMPAIGN_PERMISSIONS, CampaignRole } from "@/constants/campaign.options";

export async function transformCampaignFormData(
  data: CampaignFormData
): Promise<Omit<CampaignFormData, "players"> & { players: PlayerForDB[] }> {
  const base: Omit<CampaignFormData, "players"> & { players: PlayerForDB[] } = {
    ...data,
    tone: data.tone ?? [],
    genre: data.genre ?? [],
    players: [],
  };

  if (Array.isArray(data.players)) {
    const transformedPlayers: PlayerForDB[] = (
      await Promise.all(
        data.players.map(async (player): Promise<PlayerForDB | null> => {
          if (!player.identifier) return null;

          const userId = await resolveUserId(player.identifier);

          if (userId) {
            return {
              user: new ObjectId(userId).toString(),
              roles: player.roles,
              placeholder: false,
            };
          } else {
            return {
              user: undefined,
              identifier: player.identifier,
              roles: player.roles,
              placeholder: true,
            };
          }
        })
      )
    ).filter((p): p is PlayerForDB => p !== null);

    base.players = transformedPlayers;
  }

  return base;
}

export async function getCampaigns({
  userId,
  isPublic,
  page = 1,
  limit = 12,
  search = '',
  tone = [],
  genre = [],
}: {
  userId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  tone?: string[];
  genre?: string[];
}) {
  await connectToDatabase();
  const query: Record<string, unknown> = {};

  if (userId) query.userId = userId;

  if (typeof isPublic === 'boolean') query.isPublic = isPublic;

  if (search) query.name = { $regex: new RegExp(search, 'i') };

  if (tone.length > 0) query.tone = { $all: tone };

  if (genre.length > 0) query.genre = { $all: genre };

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
          user: player.user?.toString(),
          _id: player?._id ? player?._id.toString() : ""
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

  const campaign = await CampaignModel.findById(id)
    .populate<{ players: { user: { username?: string; email?: string } | ObjectId; roles: string[]; placeholder?: boolean; identifier?: string }[] }>({
      path: "players.user",
      select: "username email _id",
    })
    .lean<CampaignForClient>();

  if (!campaign) throw new Error("Campaign not found");

  const serialized: CampaignForClient = {
    ...campaign,
    _id: campaign._id.toString(),
    userId: campaign.userId.toString(),
    players: campaign.players.map<PlayerForClient>((player) => {
      if (player.placeholder) {
        // Placeholder user
        return {
          _id: player._id.toString(),
          roles: player.roles ?? [],
          user: {
            username: player.identifier ?? "",
            email: "",
            id: "",
          },
        };
      }

      // Existing user
      return {
        _id: player._id.toString(),
        roles: player.roles ?? [],
        user: player.user && typeof player.user !== "string"
          ? {
              username: player.user.username,
              email: player.user.email,
              id: player.user._id?.toString(),
            }
          : {
              username: "",
              email: "",
              id: "",
            },
      };
    }),
  };

  return serialized;
}



export async function createCampaign(data: Partial<CampaignForDB>) {
    await connectToDatabase();
    const user = await requireUser();
    
    if(user.tier !== "Artisan" && user.tier !== "Architect") {
      throw new Error("Your membership tier does not have access to create this content. Upgrade your membership today to gain access!");
    } 
  
    if (!data.idempotencyKey) {
      throw new Error("Missing idempotency key for idempotent creation");
    }
  
    // Check if a campaign with this key already exists
    const existing = await CampaignModel.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
    if (existing) {
      return serializeCampaign(existing);
    }

      const players = (data.players ?? []).map(player => ({
          ...player,
          user: new ObjectId(player.user)
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
  await connectToDatabase();
  
  if (!ObjectId.isValid(id)) throw new Error("Invalid campaign ID");

  const user = await requireUser();

  if(user.tier !== "Artisan" && user.tier !== "Architect") {
    throw new Error("Your membership tier does not have access to create this content. Upgrade your membership today to gain access!");
  }

  const existing = await CampaignModel.findById(id);

  if (!existing) {
      throw new Error("Campaign not found");
  }
  if (existing.userId.toString() !== user.id) {
      throw new Error("Unauthorized to delete this campaign");
  }

  const deletedCampaign = await CampaignModel.findByIdAndDelete(id);
  if(!deletedCampaign) throw new Error("Campaign not found");

  revalidatePath("/campaigns");
  return { message: "Campaign deleted successfully" };
}


export async function getAssignedCampaigns(userId: string): Promise<CampaignForClient[]> {
  await connectToDatabase();
  
  // Fetch campaigns where the user is owner or collaborator
  const campaigns = await CampaignModel.find({
    $or: [
      { userId: new ObjectId(userId) },
      { 'players.user': new ObjectId(userId) },
    ],
  })
  .select('_id name userId players')
  .lean<CampaignForDB[]>(); // Type as DB shape

  // Convert DB campaigns to client-ready shape
  const serialized: CampaignForClient[] = campaigns.map((campaign) => ({
    ...campaign,
    _id: campaign._id.toString(),
    userId: campaign.userId.toString(),
    players: campaign.players.map((player: PlayerForDB) => {
      if (player.placeholder) {
        // Placeholder user
        return {
          _id: player._id?.toString() || '',
          roles: player.roles ?? [],
          user: {
            username: player.identifier ?? '',
            _id: '',
            email: '',
          },
          placeholder: true,
          identifier: player.identifier,
        } as PlayerForClient;
      }

      // Real user
      return {
        _id: player._id?.toString() || '',
        roles: player.roles ?? [],
        user: {
          username: player.user?.toString() || '',
          _id: player.user?.toString() || '',
          email: '',
        },
      } as PlayerForClient;
    }),
  }));

  return serialized;
}


export async function getCampaignPermissions(campaignId: string) {
  await connectToDatabase();
  const user = await requireUser();

  if (!ObjectId.isValid(campaignId)) throw new Error("Invalid campaign ID");

  const campaign = await CampaignModel.findById(campaignId).lean<CampaignForClient>();
  if (!campaign) return null;

  // Campaign creator always has full rights
  if (campaign.userId.toString() === user.id.toString()) {
    return {
      canView: true,
      canCreateContent: true,
      canEditOwnContent: true,
      canEditAllContent: true,
      canManageCampaign: true,
      isOwner: true,
    };
  }

  // Find the user in the campaign player list
  const player = campaign.players.find(
    (p: PlayerForClient) => p.user?.toString() === user.id.toString()
  );

  if (!player) return null;

  // Start with all false
  const combinedPermissions = {
    canView: false,
    canCreateContent: false,
    canEditOwnContent: false,
    canEditAllContent: false,
    canManageCampaign: false,
    isOwner: false,
  };

  // Merge permissions from all roles the user has
  for (const role of player.roles as CampaignRole[]) {
    const rolePerms = CAMPAIGN_PERMISSIONS[role];
    if (!rolePerms) continue;

    for (const key of Object.keys(rolePerms) as Array<keyof typeof rolePerms>) {
      if (rolePerms[key]) {
        combinedPermissions[key] = true;
      }
    }
  }

  return combinedPermissions;
}