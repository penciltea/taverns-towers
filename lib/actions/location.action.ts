'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Location from '@/lib/models/location.model';
import { revalidatePath } from 'next/cache';
import { Types } from 'mongoose';

function serializeLocation(location: any) {
  const obj = location.toObject?.() ?? location;

  return {
    ...obj,
    _id: obj._id?.toString?.() ?? obj._id,
    townId: obj.townId?.toString?.() ?? null,
    createdAt: obj.createdAt?.toISOString?.() ?? null,
    updatedAt: obj.updatedAt?.toISOString?.() ?? null,
    __v: undefined, // Optional: remove Mongoose version key
  };
}

export async function createLocation(data: any, townId: string) {
  await connectToDatabase();
  const newLocation = await Location.create({ ...data, townId });
  revalidatePath(`/town/${townId}`);
  return serializeLocation(newLocation);
}

export async function getLocationsByTown(townId: string) {
  await connectToDatabase();
  const locations = await Location.find({ townId }).sort({ createdAt: -1 });
  return locations.map(serializeLocation);
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
