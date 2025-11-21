'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import SettlementModel from "@/lib/models/settlement.model";
import { Settlement, SettlementResponse } from "@/interfaces/settlement.interface";
import { normalizeConnections } from "@/lib/util/normalize";
import { serializeSettlement } from "../util/serializers";
import { canEdit } from "../auth/authPermissions";
import { getCampaignPermissions } from "./campaign.actions";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";
import { AppError } from "../errors/app-error";
import { handleActionResult } from "@/hooks/queryHook.util";
import { generateIdempotencyKey } from "../util/generateIdempotencyKey";

export async function getSettlements({
  userId,
  campaignId,
  isPublic,
  page = 1,
  limit = 12,
  search = '',
  size,
  climate,
  magic,
  wealth,
  tags = [],
  terrain = [],
  tone = []
}: {
  userId?: string;
  campaignId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  size?: string;
  climate?: string;
  magic?: string;
  wealth?: string;
  tags?: string[];
  terrain?: string[];
  tone?: string[];
}): Promise<ActionResult<SettlementResponse>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (campaignId) {
      query.campaignId = campaignId; // include ALL settlements in this campaign
    } else {
      query.campaignId = { $in: [null, undefined] };

      if (userId) {
        query.userId = userId; // fallback to personal settlements
      }
    }

    if (typeof isPublic === 'boolean') query.isPublic = isPublic;

    if (search) query.name = { $regex: new RegExp(search, 'i') };
    if (size) query.size = size;
    if (climate) query.climate = climate;
    if (magic) query.magic = magic;
    if (wealth) query.wealth = wealth;
    if (tags.length > 0) query.tags = { $all: tags };
    if (terrain.length > 0) query.terrain = { $all: terrain };
    if (tone.length > 0) query.tone = { $all: tone };

    const total = await SettlementModel.countDocuments(query);
    const settlements = await SettlementModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<Settlement[]>();

    const serializedSettlements = settlements.map((settlement) => ({
      ...settlement,
      _id: settlement._id.toString(),
      userId: settlement.userId.toString(),
      campaignId: settlement.campaignId !== null && settlement.campaignId ? settlement.campaignId.toString() : "",
      connections: settlement.connections.map((conn) => ({
        ...conn,
        id: conn.id.toString(),
      })),
    }));

    return {
      settlements: serializedSettlements,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  })
}

export async function getOwnedSettlements(
  options: Omit<Parameters<typeof getSettlements>[0], 'userId'>
): Promise<ActionResult<SettlementResponse>> {
  const user = await requireUser();
  return getSettlements({ ...options, userId: user.id, campaignId: undefined });
}

export async function getCampaignSettlements(
  options: Omit<Parameters<typeof getSettlements>[0], 'userId'>,
  campaignId: string
): Promise<ActionResult<SettlementResponse>> {
  return getSettlements({...options, campaignId})
}



export async function getPublicSettlements(
  options: Omit<Parameters<typeof getSettlements>[0], 'isPublic'>
): Promise<ActionResult<SettlementResponse>> {
  return getSettlements({ ...options, isPublic: true });
}


export async function getSettlementById(id: string): Promise<ActionResult<Settlement>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid settlement ID", 400);

    const settlement = await SettlementModel.findById(id);
    if (!settlement) throw new AppError("Settlement not found", 404);

    return serializeSettlement(settlement);
  })
}



export async function createSettlement(data: Partial<Settlement>): Promise<ActionResult<Settlement>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    const user = await requireUser();

    if (!data.idempotencyKey) {
      throw new AppError("Missing magic keys for idempotent creation", 400);
    }

    // Check if an settlement with this key already exists
    const existing = await SettlementModel.findOne({ idempotencyKey: data.idempotencyKey, userId: user.id });
    if (existing) {
      return serializeSettlement(existing); // Return existing settlement instead of creating duplicate
    }

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);
    

    const newSettlement = await SettlementModel.create({
      ...data,
      userId: new ObjectId(user.id),
      connections: normalizedConnections,
    });

    revalidatePath("/settlements");
    return serializeSettlement(newSettlement);
  })
}



export async function updateSettlement(id: string, data: Partial<Settlement>, campaignId?: string): Promise<ActionResult<Settlement>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    if (!ObjectId.isValid(id)) throw new AppError("Invalid settlement ID", 400);

    const user = await requireUser();
    const existing = await SettlementModel.findById(id);

    if (!existing) throw new AppError("Settlement not found", 404);

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

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);

    const updatedSettlement = await SettlementModel.findByIdAndUpdate(
      id,
      {
        ...data,
        connections: normalizedConnections,
      },
      { new: true }
    );

    if (!updatedSettlement) throw new AppError("Settlement not found", 404);

    revalidatePath("/settlements");
    return serializeSettlement(updatedSettlement);
  })
}

export async function updateSettlementPartial(
  id: string,
  update: Partial<Settlement>
): Promise<ActionResult<Settlement>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid settlement ID", 400);

    const user = await requireUser();
    const existing = await SettlementModel.findById(id);
    
    if (!existing) throw new AppError("Settlement not found", 404);
    if(existing.campaignId){
      const campaignPermissions = handleActionResult(
        await getCampaignPermissions(existing.campaignId)
      );
      if(!campaignPermissions || !campaignPermissions.isOwner) throw new AppError("Unauthorized", 403);

    } else if (existing.userId.toString() !== user.id) {
      throw new AppError("Unauthorized", 403);
    }

    // Only normalize connections if provided
    const updatedData = {
      ...update,
      connections: update.connections ? normalizeConnections(update.connections) : existing.connections,
    };

    const updatedSettlement = await SettlementModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedSettlement) throw new AppError("Settlement not found", 404);

    revalidatePath("/settlements");
    return serializeSettlement(updatedSettlement);
  })
}



export async function deleteSettlement(id: string): Promise<ActionResult<{message: string, status: number}>> {
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid settlement ID", 400);

    const user = await requireUser();
    const existing = await SettlementModel.findById(id);

    if(!existing) throw new AppError("Settlement not found", 404);
    if(existing.userId.toString() !== user.id) throw new AppError("Unauthorized", 403);

    const deletedSettlement = await SettlementModel.findByIdAndDelete(id);
    if (!deletedSettlement) throw new AppError("Settlement not found", 404);

    revalidatePath("/settlements");
    return { message: "Settlement deleted successfully", status: 200 };
  })
}


export async function copySettlement(id: string): Promise<ActionResult<Settlement>>{
  return safeServerAction(async () => {
    await connectToDatabase();
    if (!ObjectId.isValid(id)) throw new AppError("Invalid settlement ID", 404);

    const user = await requireUser();
    const original = await SettlementModel.findById(id);

    if(!original) throw new AppError("Cannot find the original settlement", 404);

    if(!user) throw new AppError("Sorry, you must be logged in to perform this action.", 500);

    const {
      _id,
      createdAt,
      updatedAt,
      idempotencyKey,
      ...rest
    } = original;

    const duplicatedSettlement = {
      ...rest,
      name: `${original.name} (Copy)`,
      userId: new ObjectId(user.id),
      idempotencyKey: generateIdempotencyKey()
    }

    if (!duplicatedSettlement.idempotencyKey) {
        throw new AppError("Missing magic keys for item creation", 400);
    }

    const newSettlementDoc = await SettlementModel.create(duplicatedSettlement);

    return serializeSettlement(newSettlementDoc);
  })
}