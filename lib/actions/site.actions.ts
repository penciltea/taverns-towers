'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { BaseSite, SiteType } from "@/interfaces/site.interface";
import { revalidatePath } from 'next/cache';

function serializeSite(site: any): SiteType {
  const plain = site.toObject ? site.toObject() : site;

  const baseData: BaseSite = {
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
          category: item.category,
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
        menu: plain.menu?.map((item: any) => ({
          name: item.name,
          category: item.category,
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
        menu: plain.menu?.map((item: any) => ({
          name: item.name,
          category: item.category,
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
        menu: plain.menu?.map((item: any) => ({
          name: item.name,
          category: item.category,
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

export async function createSite(data: SiteType, settlementId: string) {
  await connectToDatabase();
  console.log("Object: ", ObjectId.isValid(settlementId));
  const model = Site.discriminators?.[data.type] || Site;

  const dbSettlementId = ObjectId.isValid(settlementId) ? new ObjectId(settlementId) : null;

  const newSite = await model.create({ ...data, settlementId: dbSettlementId });
  if (dbSettlementId) {
    revalidatePath(`/settlement/${dbSettlementId.toString()}`);
  } else {
    revalidatePath(`/wilderness`);
  }

  console.log("new Site: ", newSite);
  return serializeSite(newSite);
}

export async function getSitesPaginated(
  settlementId: string | null,
  page: number = 1,
  limit: number = 12,
  name: string,
  types?: string[]  
) {
  await connectToDatabase();

  const query: Record<string, any> = {};
  if (settlementId === 'wilderness') {
    query.settlementId = null; // Query for wilderness sites
  } else if (settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = new ObjectId(settlementId);
  } else if (settlementId && settlementId !== 'wilderness') {
    throw new Error("Invalid settlementId passed to getSitesPaginated");
  }
  if (types && types.length > 0) {
    query.type = { $in: types };
  }
  if (name) query.name = new RegExp(name, "i");

  const skip = (page - 1) * limit;

  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    sites: sites.map(serializeSite),
    total,
    totalPages,
    currentPage: page,
  };
}


export async function getSiteById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const site = await Site.findById(id);
  if (!site) throw new Error("Site not found");
  return serializeSite(site);
}

type SiteUpdateData = Partial<Omit<SiteType, '_id' | 'createdAt' | 'updatedAt'>>;

export async function updateSite(data: SiteUpdateData, id: string) {
  await connectToDatabase();

  const existing = await Site.findById(id);
  if (!existing) throw new Error("Site not found");

  const model = Site.discriminators?.[existing.type] || Site;
  const updated = await model.findByIdAndUpdate(id, data, { new: true });

  if (updated?.settlementId) revalidatePath(`/settlement/${updated.settlementId}`);
  return serializeSite(updated);
}

export async function deleteSite(id: string) {
  await connectToDatabase();
  const deleted = await Site.findByIdAndDelete(id);
  if (deleted?.settlementId) revalidatePath(`/settlement/${deleted.settlementId}`);
  return { success: true };
}