'use server'

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import NpcModel from "../models/npc.model";
import { Npc, NpcResponse } from "@/interfaces/npc.interface";
import { NpcFormData } from "@/schemas/npc.schema";
import Settlement from "../models/settlement.model";
import Site from "../models/site.model";
import { normalizeConnections } from "@/lib/util/normalize";
import { serializeNpc } from "../util/serializers";
import { canEdit } from "../auth/authPermissions";
import { getCampaignPermissions } from "./campaign.actions";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";
import { handleActionResult } from "@/hooks/queryHook.util";
import { generateIdempotencyKey } from "../util/generateIdempotencyKey";


export async function getNpcs({
  userId,
  campaignId,
  isPublic,
  page = 1,
  limit = 12,
  search = '',
  race,
  age,
  alignment,
  status,
  pronouns
}: {
  userId?: string;
  campaignId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  race?: string;
  age?: string;
  alignment?: string;
  status?: string;
  pronouns?: string;
}): Promise<ActionResult<NpcResponse>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (campaignId) {
      query.campaignId = campaignId; // include ALL NPCs in this campaign
    } else {
      query.campaignId = { $in: [null, undefined] };

      if (userId) {
        query.userId = userId; // fallback to personal NPCs
      }
    }

    if (typeof isPublic === 'boolean') query.isPublic = isPublic;

    if (search) query.name = { $regex: new RegExp(search, 'i') };
    if (race) query.race = race;
    if (age) query.age = age;
    if (alignment) query.alignment = alignment;
    if (status) query.status = status;
    if (pronouns) query.pronouns = pronouns;

    const total = await NpcModel.countDocuments(query);
    const npcs = await NpcModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<Npc[]>();

    const serializedNpcs = npcs.map((npc) => ({
      ...npc,
      _id: npc._id.toString(),
      userId: npc.userId.toString(),
      campaignId: npc.campaignId ? npc.campaignId.toString() : "",
      connections: npc.connections.map((conn) => ({
        ...conn,
        id: conn.id.toString(),
      })),
    }));

    return {
      npcs: serializedNpcs,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  })
}



export async function getOwnedNpcs(
  options: Omit<Parameters<typeof getNpcs>[0], 'userId'>
): Promise<ActionResult<NpcResponse>> {
   const user = await requireUser();
    return getNpcs({ ...options, userId: user.id });
}

export async function getCampaignNpcs(
  options: Omit<Parameters<typeof getNpcs>[0], 'userId'>,
  campaignId: string
): Promise<ActionResult<NpcResponse>> {
  return getNpcs({ ...options, campaignId });
}



export async function getPublicNpcs(
  options: Omit<Parameters<typeof getNpcs>[0], 'isPublic'>
): Promise<ActionResult<NpcResponse>> {
  return getNpcs({ ...options, isPublic: true });
}




export async function getNpcById(id: string): Promise<ActionResult<Npc>> {
  return safeServerAction( async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid NPC ID", 400);

    const npc = await NpcModel.findById(id);
    if (!npc) throw new AppError("NPC not found", 404);

    return serializeNpc(npc);
  }
)}



export async function resolveConnectionNames(
  connections: Npc['connections'] = []
): Promise<ActionResult<(typeof connections[number] & { name: string; siteType?: string; npcData?: Npc })[]>> {
  return safeServerAction(async () => {
    const results = await Promise.all(
      connections.map(async (conn) => {
        let name = '';

        try {
          switch (conn.type) {
            case 'settlement': {
              const doc = await Settlement.findById(conn.id).select('name');
              name = doc?.name ?? '[Unknown Settlement]';
              break;
            }
            case 'site': {
              const doc = await Site.findById(conn.id);
              if (doc) {
                return { ...conn, name: doc.name, siteType: doc.type };
              } else {
                name = '[Unknown Site]';
              }
              break;
            }
            case 'npc': {
              const doc = await NpcModel.findById(conn.id);
              if (doc) {
                const serialized = serializeNpc(doc);
                return { ...conn, name: serialized.name, npcData: serialized };
              } else {
                name = '[Unknown NPC]';
              }
              break;
            }
            default:
              name = '[Unknown Type]';
          }
        } catch (error) {
          console.error(`Error resolving connection ${conn.type} (${conn.id}):`, error);
          name = '[Error Resolving Name]';
        }

        return { ...conn, name };
      })
    );

    return results;
  });
}



export async function createNpc(data: NpcFormData): Promise<ActionResult<Npc>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();

    if (!data.idempotencyKey) {
        throw new AppError("Missing magic key for idempotent creation", 400);
    }

    // Check if an NPC with this key already exists
    const existing = await NpcModel.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
    if (existing) {
        return serializeNpc(existing); // Return existing NPC instead of creating duplicate
    }

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);

    const newNpc = await NpcModel.create({
        ...data,
        userId: new ObjectId(user.id),
        connections: normalizedConnections,
    });

    revalidatePath("/npcs");

    return serializeNpc(newNpc);
  })
}




export async function updateNpc(id: string, data: Partial<Npc>, campaignId?: string): Promise<ActionResult<Npc>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    if (!ObjectId.isValid(id)) throw new AppError("Invalid NPC ID", 400);

    const user = await requireUser();
    const existing = await NpcModel.findById(id);

    if (!existing) throw new AppError("NPC not found", 404);
    
    if (campaignId) {
      // unwrap the ActionResult
      const campaignPermissions = handleActionResult(
        await getCampaignPermissions(campaignId)
      );

      if (
        !canEdit(
          user.id,
          { userId: data.userId ?? "" },
          campaignPermissions
        )
      ) {
        throw new AppError("Unauthorized", 403);
      }
    } else if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
    }

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);

    const updatedNpc = await NpcModel.findByIdAndUpdate(
      id,
      {
          ...data,
          connections: normalizedConnections,
      },
      { new: true }
    );

    if (!updatedNpc) throw new AppError("NPC not found", 404);

    revalidatePath("/npcs");
    return serializeNpc(updatedNpc);
  })
}


export async function updateNpcPartial(
  id: string,
  update: Partial<NpcFormData>
): Promise<ActionResult<Npc>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid NPC ID", 404);

    const user = await requireUser();
    const existing = await NpcModel.findById(id);

    if (!existing) throw new AppError("NPC not found", 404);

    if (existing.campaignId) {
      // unwrap the ActionResult
      const campaignPermissions = handleActionResult(
        await getCampaignPermissions(existing.campaignId)
      );

      if (!campaignPermissions.isOwner) {
        throw new AppError("Unauthorized", 403);
      }
    } else if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
    }

    // Only normalize connections if provided
    const updatedData = {
      ...update,
      connections: update.connections ? normalizeConnections(update.connections) : existing.connections,
    };

    const updatedNpc = await NpcModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedNpc) throw new AppError("NPC not found", 404);

    revalidatePath("/npcs");
    return serializeNpc(updatedNpc);
  })
}
  


export async function deleteNpc(id: string): Promise<ActionResult<{ message: string, status: number }>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid NPC ID", 404);

    const user = await requireUser();
    const existing = await NpcModel.findById(id);

    if(!existing) throw new AppError("NPC not found", 404);
    if(existing.userId.toString() !== user.id) throw new AppError("Unauthorized", 404);

    const deletedNpc = await NpcModel.findByIdAndDelete(id);
    if (!deletedNpc) throw new AppError("NPC not found", 404);

    revalidatePath("/npcs");
    return { message: "NPC deleted successfully", status: 200 };
  })
}

export async function copyNpc(id: string): Promise<ActionResult<Npc>>{
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid NPC ID", 404);

    const user = await requireUser();
    const original = await NpcModel.findById(id);

    if(!original) throw new AppError("Cannot find the original NPC", 404);

    if(!user) throw new AppError("Sorry, you must be logged in to perform this action.", 500);

    const {
      _id,
      createdAt,
      updatedAt,
      idempotencyKey,
      ...rest
    } = original;

    const duplicatedNpc = {
      ...rest,
      name: `${original.name} (Copy)`,
      userId: new ObjectId(user.id),
      idempotencyKey: generateIdempotencyKey()
    }

    if (!duplicatedNpc.idempotencyKey) {
        throw new AppError("Missing magic keys for item creation", 400);
    }

    const newNpcDoc = await NpcModel.create(duplicatedNpc);

    return serializeNpc(newNpcDoc);
  })
}