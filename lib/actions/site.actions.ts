'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { BaseSite, SiteType, GuildSite, generatorMenuItem, TavernSite, TempleSite, ShopSite, GovernmentSite, EntertainmentSite, HiddenSite, ResidenceSite, MiscellaneousSite } from "@/interfaces/site.interface";
import { NpcConnection } from "@/interfaces/connection.interface";
import { serializeFromDb } from "@/lib/util/serializeFromDb";

function serializeSite(site: Parameters<typeof serializeFromDb>[0]): BaseSite | SiteType {
  const serialized = serializeFromDb(site);

  // Ensure the result is an object and has a 'type' property
  if (
    !serialized ||
    typeof serialized !== "object" ||
    Array.isArray(serialized) ||
    !("type" in serialized)
  ) {
    throw new Error("Invalid serialized site data");
  }

  // Map connections
  const baseData = {
    ...serialized,
    connections: Array.isArray((serialized as { connections?: NpcConnection[] }).connections)
      ? ((serialized as unknown as { connections: NpcConnection[] }).connections).map((conn: NpcConnection) => ({
          ...conn,
          id: conn.id?.toString() ?? conn.id,
        }))
      : [],
  } as BaseSite;

  // Handle type-specific fields
  switch (serialized.type) {
    case "tavern":
      return {
        ...baseData,
        type: "tavern",
        clientele: serialized.clientele as TavernSite["clientele"],
        entertainment: serialized.entertainment as TavernSite["entertainment"],
        cost: serialized.cost as TavernSite["cost"],
        menu: Array.isArray((serialized as { menu?: generatorMenuItem[] }).menu)
          ? ((serialized as unknown as { menu: generatorMenuItem[] }).menu).map((item: generatorMenuItem) => ({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
          }))
          : [],
      };
    case "temple":
      return {
        ...baseData,
        type: "temple",
        domains: Array.isArray(serialized.domains as TempleSite["domains"]) ? serialized.domains as TempleSite["domains"] : [],
        relics: serialized.relics as TempleSite["relics"],
      };
    case "shop":
      return {
        ...baseData,
        type: "shop",
        shopType: serialized.shopType as ShopSite["shopType"],
        menu: Array.isArray((serialized as { menu?: generatorMenuItem[] }).menu)
          ? ((serialized as unknown as { menu: generatorMenuItem[] }).menu).map((item: generatorMenuItem) => ({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
          }))
          : [],
      };
    case "guild":
      return {
        ...baseData,
        type: "guild",
        guildName: serialized.guildName as GuildSite["guildName"],
        guildType: serialized.guildType as GuildSite["guildType"],
        membershipRequirements: Array.isArray(serialized.membershipRequirements)
          ? (serialized.membershipRequirements.map((req: unknown): string => String(req)) as GuildSite["membershipRequirements"])
          : ([] as GuildSite["membershipRequirements"]),
        knownRivals: serialized.knownRivals as GuildSite["knownRivals"],
      } as GuildSite;
    case "government":
      return {
        ...baseData,
        type: "government",
        function: serialized.function as GovernmentSite["function"],
        security: serialized.security as GovernmentSite["security"],
      };
    case "entertainment":
      return {
        ...baseData,
        type: "entertainment",
        venueType: serialized.venueType as EntertainmentSite["venueType"],
        cost: serialized.cost as EntertainmentSite["cost"],
      };
    case "hidden":
      return {
        ...baseData,
        type: "hidden",
        secrecy: Array.isArray(serialized.secrecy)
          ? (serialized.secrecy as unknown[]).map((s: unknown): string => String(s)) as HiddenSite["secrecy"]
          : ([] as HiddenSite["secrecy"]),
        knownTo: serialized.knownTo as HiddenSite["knownTo"],
        defenses: serialized.defenses as HiddenSite["defenses"],
        purpose: serialized.purpose as HiddenSite["purpose"],
      };
    case "residence":
      return {
        ...baseData,
        type: "residence",
        notableFeatures: serialized.notableFeatures as ResidenceSite["notableFeatures"],
      };
    case "miscellaneous":
      return {
        ...baseData,
        type: "miscellaneous",
        features: serialized.features as MiscellaneousSite["features"],
        use: serialized.use as MiscellaneousSite["use"],
      };
    default:
      return baseData;
  }
}

export async function createSite(data: SiteType, settlementId: string) {
  await connectToDatabase();
  const user = await requireUser();
  const model = Site.discriminators?.[data.type] || Site;

  const dbSettlementId = ObjectId.isValid(settlementId) ? new ObjectId(settlementId) : null;

  const newSite = await model.create({
    ...data,
    settlementId: dbSettlementId,
    userId: new ObjectId(user.id),
  });


  if (dbSettlementId) {
    revalidatePath(`/settlement/${dbSettlementId.toString()}`);
  } else {
    revalidatePath(`/wilderness`);
  }
  
  return serializeSite(newSite);
}



export async function getSitesPaginated(
  settlementId: string | null,
  page: number = 1,
  limit: number = 12,
  name: string,
  types?: string[],
  userId?: string,
) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

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
  if (name) {
    query.name = new RegExp(name, "i");
  }

  if (userId) {
    query.userId = new ObjectId(userId);
  }

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

export async function getSites({
  userId,
  isPublic,
  settlementId,
  page = 1,
  limit = 12,
  name,
  types = [],
}: {
  userId?: string;
  isPublic?: boolean;
  settlementId?: string | null;
  page?: number;
  limit?: number;
  name?: string;
  types?: string[];
}) {
  await connectToDatabase();

  const query: Record<string, unknown> = {};

  if (userId) query.userId = new ObjectId(userId);
  if (typeof isPublic === 'boolean') query.isPublic = isPublic;

  if (settlementId === 'wilderness') {
    query.settlementId = null;
  } else if (settlementId && ObjectId.isValid(settlementId)) {
    query.settlementId = new ObjectId(settlementId);
  }

  if (name) {
    query.name = new RegExp(name, 'i');
  }

  if (types.length > 0) {
    query.type = { $in: types };
  }

  const skip = (page - 1) * limit;

  const [sites, total] = await Promise.all([
    Site.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Site.countDocuments(query),
  ]);

  return {
    success: true,
    sites: sites.map(serializeSite),
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getOwnedSites(
  options: Omit<Parameters<typeof getSites>[0], 'userId'>
) {
  const user = await requireUser();
  return getSites({ ...options, userId: user.id });
}

export async function getPublicSites(
  options: Omit<Parameters<typeof getSites>[0], 'isPublic'>
) {
  return getSites({ ...options, isPublic: true });
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

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) throw new Error("Site not found");
  if (existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const model = Site.discriminators?.[existing.type] || Site;

  const updated = await model.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  if (updated?.settlementId) {
    revalidatePath(`/settlement/${updated.settlementId}`);
  }

  return serializeSite(updated);
}



export async function deleteSite(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid site ID");

  const user = await requireUser();
  const existing = await Site.findById(id);

  if (!existing) {
    // already deleted – just return a success-like response
    return { success: true, message: "Already deleted" };
  }

  if (existing.userId.toString() !== user.id) {
    throw new Error("Unauthorized");
  }

  const deletedSite = await Site.findByIdAndDelete(id);
  if (!deletedSite) throw new Error("Site not found");

  if (deletedSite?.settlementId) revalidatePath(`/settlement/${deletedSite.settlementId}`);
  return { success: true };
}