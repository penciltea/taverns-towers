'use server';

import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/db/connect";
import Site from '@/lib/models/site.model';
import { revalidatePath } from 'next/cache';
import { requireUser } from "../auth/authHelpers";
import { Types } from "mongoose";
import { BaseSite, SiteType, TavernSite, TempleSite, ShopSite, GuildSite, GovernmentSite, EntertainmentSite, HiddenSite, ResidenceSite, MiscellaneousSite } from "@/interfaces/site.interface";
import { NpcConnection } from "@/interfaces/connection.interface";

type SiteDocument = {
  _id: Types.ObjectId | string;
  name: string;
  image?: string;
  type: SiteType["type"];
  size?: string;
  condition?: string;
  publicNotes?: string;
  gmNotes?: string;
  settlementId?: Types.ObjectId | string | null;
  isPublic: boolean;
  editors?: (Types.ObjectId | string | { _id: Types.ObjectId | string })[];
  connections?: NpcConnection[];
  userId: Types.ObjectId | string | { _id: Types.ObjectId | string };
  createdAt: Date;
  updatedAt: Date;
  // Tavern
  clientele?: TavernSite["clientele"];
  entertainment?: TavernSite["entertainment"];
  cost?: TavernSite["cost"];
  menu?: TavernSite["menu"];
  // Temple
  domains?: TempleSite["domains"];
  relics?: TempleSite["relics"];
  // Shop
  shopType?: ShopSite["shopType"];
  // Guild
  guildName?: GuildSite["guildName"];
  guildType?: GuildSite["guildType"];
  membershipRequirements?: GuildSite["membershipRequirements"];
  knownRivals?: GuildSite["knownRivals"];
  // Government
  function?: GovernmentSite["function"];
  security?: GovernmentSite["security"];
  // Entertainment
  venueType?: EntertainmentSite["venueType"];
  // Hidden
  secrecy?: HiddenSite["secrecy"];
  knownTo?: HiddenSite["knownTo"];
  defenses?: HiddenSite["defenses"];
  purpose?: HiddenSite["purpose"];
  // Residence
  notableFeatures?: ResidenceSite["notableFeatures"];
  // Miscellaneous
  features?: MiscellaneousSite["features"];
  use?: MiscellaneousSite["use"];
};

function serializeSite(site: SiteDocument | (SiteDocument & { toObject?: () => SiteDocument })): BaseSite | SiteType {
  const plain: SiteDocument =
    typeof (site as { toObject?: () => SiteDocument }).toObject === "function"
      ? (site as { toObject: () => SiteDocument }).toObject()
      : (site as SiteDocument);

  const baseData: BaseSite = {
    _id: typeof plain._id === "string" ? plain._id : plain._id.toString(),
    name: plain.name,
    image: plain.image,
    type: plain.type,
    size: plain.size,
    condition: plain.condition,
    publicNotes: plain.publicNotes,
    gmNotes: plain.gmNotes,
    settlementId: plain.settlementId
      ? typeof plain.settlementId === "string"
        ? plain.settlementId
        : plain.settlementId.toString()
      : undefined,
    isPublic: plain.isPublic,
    editors: Array.isArray(plain.editors)
      ? plain.editors.map((editor) =>
          typeof editor === "string"
            ? editor
            : (editor as { _id?: Types.ObjectId | string })._id
            ? (editor as { _id: Types.ObjectId | string })._id.toString()
            : typeof (editor as { toString?: () => string }).toString === "function"
            ? (editor as { toString: () => string }).toString()
            : ""
        )
      : [],
    connections: (plain.connections || []).map((conn: NpcConnection) => ({
            ...conn,
            id: conn.id?.toString ? conn.id.toString() : conn.id,
        })),
    userId: typeof plain.userId === 'string'
            ? plain.userId
            : plain.userId?._id
                ? plain.userId._id.toString()  // If populated user document
                : plain.userId?.toString?.(),  // fallback if ObjectId
    createdAt: plain.createdAt?.toISOString(),
    updatedAt: plain.updatedAt?.toISOString(),
  };

  switch (plain.type) {
    case "tavern":
      return {
        ...baseData,
        type: "tavern",
        clientele: plain.clientele,
        entertainment: plain.entertainment,
        cost: plain.cost,
        menu:
          Array.isArray(plain.menu) && plain.menu.length > 0
            ? plain.menu.map((item) => ({
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
        domains: Array.isArray(plain.domains) ? plain.domains : [],
        relics: plain.relics,
        menu:
          Array.isArray(plain.menu) && plain.menu.length > 0
            ? plain.menu.map((item) => ({
                name: item.name,
                category: item.category,
                description: item.description,
                price: item.price,
              }))
            : [],
      };
    case "shop":
      return {
        ...baseData,
        type: "shop",
        shopType: plain.shopType,
        menu:
          Array.isArray(plain.menu) && plain.menu.length > 0
            ? plain.menu.map((item) => ({
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
        guildName: plain.guildName,
        guildType: plain.guildType,
        membershipRequirements: Array.isArray(plain.membershipRequirements)
          ? plain.membershipRequirements.map((req) => String(req))
          : [],
        knownRivals: plain.knownRivals,
        menu:
          Array.isArray(plain.menu) && plain.menu.length > 0
            ? plain.menu.map((item) => ({
                name: item.name,
                category: item.category,
                description: item.description,
                price: item.price,
              }))
            : [],
      };
    case "government":
      return {
        ...baseData,
        type: "government",
        function: plain.function,
        security: plain.security,
      };
    case "entertainment":
      return {
        ...baseData,
        type: "entertainment",
        venueType: plain.venueType,
        cost: plain.cost,
      };
    case "hidden":
      return {
        ...baseData,
        type: "hidden",
        secrecy: Array.isArray(plain.secrecy)
          ? plain.secrecy
          : plain.secrecy
          ? [plain.secrecy]
          : [],
        knownTo: plain.knownTo,
        defenses: plain.defenses,
        purpose: plain.purpose,
      };
    case "residence":
      return {
        ...baseData,
        type: "residence",
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

  if(!existing) throw new Error("Site not found");
  if(existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const deletedSite = await Site.findByIdAndDelete(id);
  if (!deletedSite) throw new Error("Site not found");

  if (deletedSite?.settlementId) revalidatePath(`/settlement/${deletedSite.settlementId}`);
  return { success: true };
}