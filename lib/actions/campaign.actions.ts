'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import CampaignModel from "@/lib/models/campaign.model";
import { CampaignForClient, CampaignForDB, PlayerForClient, PlayerForDB } from "@/interfaces/campaign.interface";
import { serializeCampaign, serializeNpc, serializeSettlement, serializeSite } from "../util/serializers";
import { CampaignFormData } from "@/schemas/campaign.schema";
import { resolveUserId } from "./user.actions";
import { CAMPAIGN_PERMISSIONS, CampaignRole } from "@/constants/campaign.options";
import NpcModel from "@/lib/models/npc.model";
import Site from "@/lib/models/site.model";
import SettlementModel from "@/lib/models/settlement.model";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";
import { ContentType } from "@/constants/common.options";

export async function transformCampaignFormData(
  data: CampaignFormData
): Promise<ActionResult<Omit<CampaignFormData, "players"> & { players: PlayerForDB[] }>> {
  return safeServerAction(async () => {
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
            if (!player.identifier && !player.userId) return null;

            const userId = player.userId ?? await resolveUserId(player.identifier);

            if (userId) {
              return {
                user: new ObjectId(userId).toString(),
                roles: player.roles,
                placeholder: false,
              };
            } else {
              return {
                user: undefined,
                identifier: player.identifier!,
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
  });
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
}): Promise<ActionResult<{
  campaigns: CampaignForClient[];
  total: number;
  currentPage: number;
  totalPages: number;
}>> {
  return safeServerAction(async () => {
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
        campaigns: serializedCampaigns as CampaignForClient[],
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
    };
  })
}


export async function getOwnedCampaigns(
  options: Omit<Parameters<typeof getCampaigns>[0], 'userId'>
): Promise<ActionResult<{
  campaigns: CampaignForClient[];
  total: number;
  currentPage: number;
  totalPages: number;
}>> {
  const user = await requireUser();
  return getCampaigns({ ...options, userId: user.id });
}



export async function getPublicCampaigns(options: Omit<Parameters<typeof getCampaigns>[0], 'isPublic'>): Promise<ActionResult<{
  campaigns: CampaignForClient[];
  total: number;
  currentPage: number;
  totalPages: number;
}>> {
  return getCampaigns({ ...options, isPublic: true });
}



export async function getCampaignById(id: string): Promise<ActionResult<CampaignForClient>> {
  return safeServerAction(async () => {
  
    await connectToDatabase();

    if (!ObjectId.isValid(id)) throw new AppError("Invalid Campaign ID", 400);

    const campaign = await CampaignModel.findById(id)
      .populate<{ players: { user: { username?: string; email?: string } | ObjectId; roles: string[]; placeholder?: boolean; identifier?: string }[] }>({
        path: "players.user",
        select: "username email _id",
      })
      .lean<CampaignForClient>();

    if (!campaign) throw new AppError("Campaign not found", 404);

    const serialized: CampaignForClient = {
      ...campaign,
      _id: campaign._id.toString() ?? "",
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
  })
}



export async function createCampaign(data: Partial<CampaignForDB>): Promise<ActionResult<CampaignForDB>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();
    
    if(user.tier !== "Artisan" && user.tier !== "Architect") {
      throw new AppError("Your membership tier does not have access to create this content. Upgrade your membership today to gain access!", 403);
    } 
  
    if (!data.idempotencyKey) {
      throw new AppError("Missing idempotency key for idempotent creation", 400);
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
  })
}



export async function updateCampaign(id: string, data: Partial<CampaignForDB>): Promise<ActionResult<CampaignForDB>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();
    const campaign = await CampaignModel.findById(id);

    if (!campaign) {
        throw new AppError("Campaign not found", 404);
    }

    if (campaign.userId.toString() !== user.id) {
        throw new AppError("Unauthorized to update this campaign", 403);
    }

    Object.assign(campaign, { ...data });
    await campaign.save();

    revalidatePath("/campaigns");
    return serializeCampaign(campaign);
  })
}



export async function deleteCampaign(id: string): Promise<ActionResult<{ message: string, status: number }>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    
    if (!ObjectId.isValid(id)) throw new AppError("Invalid campaign ID", 400);

    const user = await requireUser();

    if(user.tier !== "Artisan" && user.tier !== "Architect") {
      throw new AppError("Your membership tier does not have access to create this content. Upgrade your membership today to gain access!", 403);
    }

    const existing = await CampaignModel.findById(id);

    if (!existing) {
        throw new AppError("Campaign not found", 404);
    }
    if (existing.userId.toString() !== user.id) {
        throw new AppError("Unauthorized to delete this campaign", 403);
    }

    const deletedCampaign = await CampaignModel.findByIdAndDelete(id);
    if(!deletedCampaign) throw new AppError("Campaign not found", 404);

    revalidatePath("/campaigns");
    return { message: "Campaign deleted successfully", status: 200 };
  })
}


export async function getAssignedCampaigns(userId: string): Promise<ActionResult<CampaignForClient[]>> {
  return safeServerAction(async () => {
    if (!userId) throw new AppError("Missing user ID", 400);

    await connectToDatabase();

    const campaigns = await CampaignModel.find({
      $or: [
        { userId: new ObjectId(userId) },
        { 'players.user': new ObjectId(userId) },
      ],
    })
    .select('_id name userId players')
    .lean<CampaignForDB[]>();

    const serialized: CampaignForClient[] = campaigns.map((campaign) => ({
      ...campaign,
      _id: campaign._id.toString(),
      userId: campaign.userId.toString(),
      players: campaign.players.map((player: PlayerForDB) => {
        if (player.placeholder) {
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
  });
}



export async function getCampaignPermissions(campaignId: string): Promise<ActionResult<{
  canView: boolean;
  canCreateContent: boolean;
  canEditOwnContent: boolean;
  canEditAllContent: boolean;
  canManageCampaign: boolean;
  isOwner: boolean;
}>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();

    if (!ObjectId.isValid(campaignId)) {
      throw new AppError("Invalid campaign ID", 400);
    }

    const campaign = await CampaignModel.findById(campaignId).lean<CampaignForClient>();
    
    if (!campaign) {
      throw new AppError("Campaign not found", 404);
    }

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

    if (!player) {
      throw new AppError("You do not have access to this campaign", 403);
    }


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
  })
}


/* 
A server action that returns both a user's owned and assigned campaigns
*/

export async function getUserCampaigns({
  page = 1,
  limit = 12,
  search = '',
  tone = [],
  genre = [],
}: {
  page?: number;
  limit?: number;
  search?: string;
  tone?: string[];
  genre?: string[];
}): Promise<ActionResult<{
  campaigns: CampaignForClient[];
  total: number;
  currentPage: number;
  totalPages: number;
}>> {
  return safeServerAction(async () => {
    const user = await requireUser();
    const userId = user.id;

    await connectToDatabase();

    const query: Record<string, unknown> = {
      $or: [
        { userId: new ObjectId(userId) },       // Owned campaigns
        { 'players.user': new ObjectId(userId) } // Assigned campaigns
      ],
    };

    if (search) query.name = { $regex: new RegExp(search, 'i') };
    if (tone.length > 0) query.tone = { $all: tone };
    if (genre.length > 0) query.genre = { $all: genre };

    const total = await CampaignModel.countDocuments(query);

    const campaigns = await CampaignModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<CampaignForDB[]>();

    // Deduplicate in case user is both owner and player
    const seen = new Set<string>();
    const serialized = campaigns.map((campaign) => ({
      ...campaign,
      _id: campaign._id.toString(),
      userId: campaign.userId.toString(),
      players: campaign.players.map((player) => ({
          ...player,
          user: player.user?.toString(),
          _id: player?._id ? player?._id.toString() : ""
      }))
    }))
    .filter((c) => {
      if (seen.has(c._id)) return false;
      seen.add(c._id);
      return true;
    });

    return {
      campaigns: serialized as CampaignForClient[],
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  })
}


type NpcHighlight = ReturnType<typeof serializeNpc> & { type: "npc" };
type SettlementHighlight = ReturnType<typeof serializeSettlement> & { type: "settlement" };
type SiteHighlight = ReturnType<typeof serializeSite> & { type: "site" };

export type CampaignHighlight = NpcHighlight | SettlementHighlight | SiteHighlight;

export async function getCampaignHighlights(
  campaignId: string
): Promise<ActionResult<CampaignHighlight[]>> {
  return safeServerAction(async () => {
    if (!campaignId) {
      throw new AppError("Invalid campaign ID", 400);
    }

    await connectToDatabase();

    const [npcs, settlements, sites] = await Promise.all([
      NpcModel.find({ campaignId, campaignHighlight: true }).lean(),
      SettlementModel.find({ campaignId, campaignHighlight: true }).lean(),
      Site.find({ campaignId, campaignHighlight: true }).lean(),
    ]);

    function tag<T extends object, U extends ContentType>(item: T, type: U): T & { type: U } {
      return { ...item, type };
    }

    const tagged: CampaignHighlight[] = [
      ...npcs.map((n) => tag(serializeNpc(n), "npc")),
      ...settlements.map((s) => tag(serializeSettlement(s), "settlement")),
      ...sites.map((s) => tag(serializeSite(s), "site")),
    ];

    // Sort by updatedAt descending
    tagged.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

    return tagged;
  });
}