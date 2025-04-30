'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Location from '@/lib/models/location.model';
import { BaseLocation, LocationType } from "@/interfaces/location.interface";
import { revalidatePath } from 'next/cache';

function serializeLocation(location: any): LocationType {
  const plain = location.toObject ? location.toObject() : location;

  const baseData: BaseLocation = {
    _id: plain._id.toString(),
    name: plain.name,
    image: plain.image,
    type: plain.type,
    size: plain.size,
    condition: plain.condition,
    publicNotes: plain.publicNotes,
    gmNotes: plain.gmNotes,
    townId: plain.townId?.toString(),
    createdAt: plain.createdAt?.toISOString(),
    updatedAt: plain.updatedAt?.toISOString(),
  };

  switch (plain.type) {
    case "tavern":
      return {
        ...baseData,
        type: "tavern",
        owner: plain.owner,
        clientele: plain.clientele,
        entertainment: plain.entertainment,
        cost: plain.cost,
        menu: plain.menu?.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
        })) ?? [],
      };
    default:
      return baseData;
  }
}

export async function createLocation(data: any, townId: string) {
  await connectToDatabase();
  const model = Location.discriminators?.[data.type] || Location;

  const newLocation = await model.create({ ...data, townId });
  revalidatePath(`/town/${townId}`);
  return serializeLocation(newLocation);
}

export async function getLocationsByTownPaginated(
  townId: string,
  page: number = 1,
  limit: number = 10,
  type?: string[]
) {
  await connectToDatabase();

  const query: Record<string, any> = { townId };
  if (type && type.length > 0) {
    query.type = { $in: type };
  }

  const skip = (page - 1) * limit;

  const [locations, total] = await Promise.all([
    Location.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Location.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    locations: locations.map(serializeLocation),
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getLocationById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid location ID");

  const location = await Location.findById(id);
  if (!location) throw new Error("Location not found");
  return serializeLocation(location);
}

export async function updateLocation(data: any, id: string,) {
  await connectToDatabase();

  const existing = await Location.findById(id);
  if (!existing) throw new Error("Location not found");

  const model = Location.discriminators?.[existing.type] || Location;
  const updated = await model.findByIdAndUpdate(id, data, { new: true });

  if (updated?.townId) revalidatePath(`/town/${updated.townId}`);
  return serializeLocation(updated);
}

export async function deleteLocation(id: string) {
  await connectToDatabase();
  const deleted = await Location.findByIdAndDelete(id);
  if (deleted?.townId) revalidatePath(`/town/${deleted.townId}`);
  return { success: true };
}
