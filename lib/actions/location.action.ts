'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Location from '@/lib/models/location.model';
import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';

function serializeLocation(location: any) {
    return {
      ...location.toObject(),
      _id: location._id.toString(),
      createdAt: location.createdAt?.toISOString?.() ?? null,
      updatedAt: location.updatedAt?.toISOString?.() ?? null,
    };
  }

export async function createLocation(data: any, townId: string) {
  await connectToDatabase();
  const newLocation = await Location.create({ ...data, townId });
  revalidatePath(`/town/${townId}`);
  return newLocation;
}

export async function getLocationsByTown(townId: string) {
  await connectToDatabase();
  return await Location.find({ townId });
}

export async function getLocationById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid location ID");

  const location = await Location.findById(id);
  if (!location) throw new Error("Town not found");
  return serializeLocation(location);
}

export async function updateLocation(id: string, data: any) {
  await connectToDatabase();
  const updated = await Location.findByIdAndUpdate(id, data, { new: true });
  if (updated?.townId) revalidatePath(`/town/${updated.townId}`);
  return updated;
}

export async function deleteLocation(id: string) {
  await connectToDatabase();
  const deleted = await Location.findByIdAndDelete(id);
  if (deleted?.townId) revalidatePath(`/town/${deleted.townId}`);
  return deleted;
}
