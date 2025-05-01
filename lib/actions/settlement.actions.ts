'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import SettlementModel from "@/lib/models/settlement.model";
import { Settlement } from "@/interfaces/settlement.interface";

// Serialize for client compatibility
function serializeSettlement(settlement: any): Settlement {
  const obj = settlement.toObject?.() ?? settlement;

  return {
    ...obj,
    _id: obj._id.toString(),
    createdAt: obj.createdAt?.toISOString?.() ?? null,
    updatedAt: obj.updatedAt?.toISOString?.() ?? null,
  };
}

export async function getSettlements({
  page = 1,
  limit = 12,
  search = '',
  size,
  climate,
  magic,
  wealth,
  tags = [],
  terrain = [],
}: {
  page?: number;
  limit?: number;
  search?: string;
  size?: string;
  climate?: string;
  magic?: string;
  wealth?: string;
  tags?: string[];
  terrain?: string[];
}) {
  await connectToDatabase();

  const query: any = {};

  if (search) {
    query.name = { $regex: new RegExp(search, "i") };
  }
  if (size) query.size = size;
  if (climate) query.climate = climate;
  if (magic) query.magic = magic;
  if (wealth) query.wealth = wealth;
  if (tags.length > 0) query.tags = { $all: tags };
  if (terrain.length > 0) query.terrain = { $all: terrain };

  const total = await SettlementModel.countDocuments(query);
  const settlements = await SettlementModel.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean<Settlement[]>(); 

  const serializedSettlements = settlements.map((settlement) => ({
    ...settlement,
    _id: settlement._id.toString(),
  }));

  return {
    success: true,
    settlements: serializedSettlements,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
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

  const newSettlement = await SettlementModel.create(data);
  revalidatePath("/settlements");

  return serializeSettlement(newSettlement);
}



export async function updateSettlement(id: string, data: Partial<Settlement>) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid settlement ID");

  const updatedSettlement = await SettlementModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedSettlement) throw new Error("Settlement not found");

  revalidatePath("/settlements");
  return serializeSettlement(updatedSettlement);
}



export async function deleteSettlement(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid settlement ID");

  const deletedSettlement = await SettlementModel.findByIdAndDelete(id);
  if (!deletedSettlement) throw new Error("Settlement not found");

  revalidatePath("/settlements");
  return { message: "Settlement deleted successfully" };
}
