'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Sight from '@/lib/models/sight.model';
import { BaseSight, SightType } from "@/interfaces/sight.interface";
import { revalidatePath } from 'next/cache';

function serializeSight(sight: any): SightType {
  const plain = sight.toObject ? sight.toObject() : sight;

  const baseData: BaseSight = {
    _id: plain._id.toString(),
    name: plain.name,
    image: plain.image,
    type: plain.type,
    size: plain.size,
    condition: plain.condition,
    publicNotes: plain.publicNotes,
    gmNotes: plain.gmNotes,
    settlementId: plain.settlementId?.toString(),
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
    case "temple":
      return {
        ...baseData,
        type: "temple",
        deity: plain.deity,
        leader: plain.leader,
        relics: plain.relics,
        services: plain.services?.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
        })) ?? [],
      };
    case "shop":
      return {
        ...baseData,
        type: "shop",
        shopType: plain.shopType,
        owner: plain.owner,
        wares: plain.wares?.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
        })) ?? [],
      };
    case "guild":
      return {
        ...baseData,
        type: "guild",
        guildName: plain.guildName,
        guildType: plain.guildType,
        leader: plain.leader,
        membershipRequirements: plain.membershipRequirements,
        knownRivals: plain.knownRivals,
        services: plain.services?.map((item: any) => ({
          name: item.name,
          description: item.description,
          price: item.price,
        })) ?? [],
      };
    case "government":
      return {
        ...baseData,
        type: "government",
        function: plain.function,
        officials: plain.officials,
        jurisdiction: plain.jurisdiction,
        security: plain.security,
      };
    case "entertainment":
      return {
        ...baseData,
        type: "entertainment",
        venueType: plain.venueType,
        performances: plain.performances,
        owner: plain.owner,
        cost: plain.cost,
      };
    case "hidden":
      return {
        ...baseData,
        type: "hidden",
        secrecy: Array.isArray(plain.secrecy) ? plain.secrecy : [plain.secrecy].filter(Boolean),
        leader: plain.leader,
        knownTo: plain.knownTo,
        defenses: plain.defenses,
        purpose: plain.purpose,
      };
    case "residence":
      return {
        ...baseData,
        type: "residence",
        occupant: plain.occupant,
        notableFeatures: plain.notableFeatures,
      };
    case "miscellaneous":
      return {
        ...baseData,
        type: "miscellaneous",
        features: plain.features,
        use: plain.use,
      };
    default:
      return baseData;
  }
}

export async function createSight(data: any, settlementId: string) {
  await connectToDatabase();
  const model = Sight.discriminators?.[data.type] || Sight;

  const newSight = await model.create({ ...data, settlementId });
  revalidatePath(`/settlement/${settlementId}`);
  return serializeSight(newSight);
}

export async function getSightsBySettlementPaginated(
  settlementId: string,
  page: number = 1,
  limit: number = 12,
  type?: string[],
  name?: string
) {
  await connectToDatabase();

  const query: Record<string, any> = { settlementId };
  if (type && type.length > 0) {
    query.type = { $in: type };
  }
  if (name) query.name = new RegExp(name, "i");

  const skip = (page - 1) * limit;

  const [sights, total] = await Promise.all([
    Sight.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Sight.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    sights: sights.map(serializeSight),
    total,
    totalPages,
    currentPage: page,
  };
}

export async function getSightById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid sight ID");

  const sight = await Sight.findById(id);
  if (!sight) throw new Error("Sight not found");
  return serializeSight(sight);
}

export async function updateSight(data: any, id: string,) {
  await connectToDatabase();

  const existing = await Sight.findById(id);
  if (!existing) throw new Error("Sight not found");

  const model = Sight.discriminators?.[existing.type] || Sight;
  const updated = await model.findByIdAndUpdate(id, data, { new: true });

  if (updated?.settlementId) revalidatePath(`/settlement/${updated.settlementId}`);
  return serializeSight(updated);
}

export async function deleteSight(id: string) {
  await connectToDatabase();
  const deleted = await Sight.findByIdAndDelete(id);
  if (deleted?.settlementId) revalidatePath(`/settlement/${deleted.settlementId}`);
  return { success: true };
}
