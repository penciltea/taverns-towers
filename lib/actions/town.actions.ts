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

export async function getAllTowns() {
  try {
    await connectToDatabase();

    const towns = await TownModel.find({})
      .sort({ createdAt: -1 })
      .lean<Town[]>(); // strips out Mongoose methods

      const serializedTowns = towns.map((town) => ({
        ...town,
        _id: town._id.toString(),
      }));

    return {
      success: true,
      towns: serializedTowns as Town[],
    };
  } catch (error: any) {
    console.error("Error fetching towns:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch towns",
    };
  }
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
