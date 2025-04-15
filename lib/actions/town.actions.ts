'use server';

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import Town from "@/lib/models/town.model";
import { ITown } from "@/lib/models/town.model";

function serializeTown(town: any) {
  return {
    ...town.toObject(),
    _id: town._id.toString(),
    createdAt: town.createdAt?.toISOString?.() ?? null,
    updatedAt: town.updatedAt?.toISOString?.() ?? null,
  };
}

export async function getTownById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const town = await Town.findById(id);
  if (!town) throw new Error("Town not found");
  return serializeTown(town);
}

export async function getAllTowns() {
  try {
    const db = await connectToDatabase();

    const towns = await Town.find().sort({ createdAt: -1 });

    return {
      success: true,
      towns,
    };
  } catch (error: any) {
    console.error("Error fetching towns:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch towns",
    };
  }
}

export async function createTown(data: Partial<ITown>) {
  await connectToDatabase();
  const town = await Town.create(data);
  revalidatePath("/towns");
  return serializeTown(town);
}

export async function updateTown(id: string, data: Partial<ITown>) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const town = await Town.findByIdAndUpdate(id, data, { new: true });
  if (!town) throw new Error("Town not found");

  revalidatePath("/towns");
  return serializeTown(town);
}

export async function deleteTown(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid town ID");

  const deletedTown = await Town.findByIdAndDelete(id);
  if (!deletedTown) throw new Error("Town not found");

  revalidatePath("/towns");
  return { message: "Town deleted successfully" };
}
