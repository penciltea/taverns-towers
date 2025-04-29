'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import TownModel from "@/lib/models/town.model";
import { Town } from "@/interfaces/town.interface";

// Serialize for client compatibility
function serializeTown(town: any): Town {
  const obj = town.toObject?.() ?? town;

  return {
    ...obj,
    _id: obj._id.toString(),
    createdAt: obj.createdAt?.toISOString?.() ?? null,
    updatedAt: obj.updatedAt?.toISOString?.() ?? null,
  };
}

export async function getTowns({
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

  const total = await TownModel.countDocuments(query);
  const towns = await TownModel.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean<Town[]>(); 

  const serializedTowns = towns.map((town) => ({
    ...town,
    _id: town._id.toString(),
  }));

  return {
    success: true,
    towns: serializedTowns,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}


export async function getTownById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const town = await TownModel.findById(id);
  if (!town) throw new Error("Town not found");

  return serializeTown(town);
}



export async function createTown(data: Partial<Town>) {
  await connectToDatabase();

  const newTown = await TownModel.create(data);
  revalidatePath("/towns");

  return serializeTown(newTown);
}



export async function updateTown(id: string, data: Partial<Town>) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const updatedTown = await TownModel.findByIdAndUpdate(id, data, { new: true });
  if (!updatedTown) throw new Error("Town not found");

  revalidatePath("/towns");
  return serializeTown(updatedTown);
}



export async function deleteTown(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const deletedTown = await TownModel.findByIdAndDelete(id);
  if (!deletedTown) throw new Error("Town not found");

  revalidatePath("/towns");
  return { message: "Town deleted successfully" };
}
