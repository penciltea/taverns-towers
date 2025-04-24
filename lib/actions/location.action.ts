'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Location from '@/lib/models/location.model';
import { revalidatePath } from 'next/cache';

function serializeLocation(location: any) {
  const plain = location.toObject ? location.toObject() : location;

  const baseData = {
    _id: plain._id.toString(),
    townId: plain.townId?.toString(),
    name: plain.name,
    type: plain.type,
    createdAt: plain.createdAt?.toISOString(),
    updatedAt: plain.updatedAt?.toISOString(),
  };

  if (plain.menu) {
    return {
      ...baseData,
      menu: plain.menu.map((item: any) => ({
        name: item.name,
        description: item.description,
        price: item.price,
      })),
    };
  }
  
  return baseData;
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
  if (!location) throw new Error("Location not found");
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
