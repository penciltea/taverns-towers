'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import SettlementModel from "@/lib/models/settlement.model";
import { Settlement } from "@/interfaces/settlement.interface";
import { normalizeConnections } from "../util/connectionHelpers";
import { serializeSettlement } from "../util/serializers";

export async function getSettlements({
  userId,
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
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (userId) query.userId = userId;
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
    connections: settlement.connections.map((conn) => ({
      ...conn,
      id: conn.id.toString(),
    })),
  }));

  return {
    success: true,
    settlements: serializedSettlements,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getOwnedSettlements(
  options: Omit<Parameters<typeof getSettlements>[0], 'userId'>
) {
  const user = await requireUser();
  return getSettlements({ ...options, userId: user.id });
}

export async function getPublicSettlements(options: Omit<Parameters<typeof getSettlements>[0], 'isPublic'>) {
  return getSettlements({ ...options, isPublic: true });
}


export async function getSettlementById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid settlement ID");

  const settlement = await SettlementModel.findById(id);
  if (!settlement) throw new Error("Settlement not found");

  return serializeSettlement(settlement);
}



export async function createSettlement(data: Partial<Settlement>) {
  await connectToDatabase();
  const user = await requireUser();

  if (!data.idempotencyKey) {
    throw new Error("Missing idempotency key for idempotent creation");
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
}



export async function updateSettlement(id: string, data: Partial<Settlement>) {
  await connectToDatabase();

  if (!ObjectId.isValid(id)) throw new Error("Invalid settlement ID");

  const user = await requireUser();
  const existing = await SettlementModel.findById(id);

  if (!existing) throw new Error("Settlement not found");
  if (existing.userId.toString() !== user.id) throw new Error("Unauthorized");

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

  if (!updatedSettlement) throw new Error("Settlement not found");

  revalidatePath("/settlements");
  return serializeSettlement(updatedSettlement);
}



export async function deleteSettlement(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid settlement ID");

  const user = await requireUser();
  const existing = await SettlementModel.findById(id);

  if(!existing) throw new Error("Settlement not found");
  if(existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const deletedSettlement = await SettlementModel.findByIdAndDelete(id);
  if (!deletedSettlement) throw new Error("Settlement not found");

  revalidatePath("/settlements");
  return { message: "Settlement deleted successfully" };
}
