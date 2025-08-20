'use server'

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import NpcModel from "../models/npc.model";
import { Npc } from "@/interfaces/npc.interface";
import { NpcFormData } from "@/schemas/npc.schema";
import Settlement from "../models/settlement.model";
import Site from "../models/site.model";
import { normalizeConnections } from "../util/connectionHelpers";

// serialize for client compatibility
function serializeNpc(npc: any): Npc {
    const obj = npc.toObject?.() ?? npc;

    return {
        ...obj,
        _id: obj._id.toString(),
        userId: typeof obj.userId === 'string'
            ? obj.userId
            : obj.userId?._id
                ? obj.userId._id.toString()  // If populated user document
                : obj.userId?.toString?.(),  // fallback if ObjectId
        connections: (obj.connections || []).map((conn: any) => ({
            ...conn,
            id: conn.id?.toString ? conn.id.toString() : conn.id,
        })),
        createdAt: obj.createdAt?.toISOString?.() ?? null,
        updatedAt: obj.updatedAt?.toISOString?.() ?? null,
    };
}

export async function getNpcs({
  userId,
  isPublic,
  page = 1,
  limit = 12,
  search = '',
  race,
  age,
  alignment,
  status,
  pronouns
}: {
  userId?: string;
  isPublic?: boolean;
  page?: number;
  limit?: number;
  search?: string;
  race?: string;
  age?: string;
  alignment?: string;
  status?: string;
  pronouns?: string;
}) {
  await connectToDatabase();

  const query: any = {};

  if (userId) query.userId = userId;
  if (typeof isPublic === 'boolean') query.isPublic = isPublic;

  if (search) query.name = { $regex: new RegExp(search, 'i') };
  if (race) query.race = race;
  if (age) query.age = age;
  if (alignment) query.alignment = alignment;
  if (status) query.status = status;
  if (pronouns) query.pronouns = pronouns;

  const total = await NpcModel.countDocuments(query);
  const npcs = await NpcModel.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean<Npc[]>();

  const serializedNpcs = npcs.map((npc) => ({
    ...npc,
    _id: npc._id.toString(),
    userId: npc.userId.toString(),
    connections: npc.connections.map((conn) => ({
      ...conn,
      id: conn.id.toString(),
    })),
  }));

  return {
    success: true,
    npcs: serializedNpcs,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}



export async function getOwnedNpcs(
  options: Omit<Parameters<typeof getNpcs>[0], 'userId'>
) {
  const user = await requireUser();
  return getNpcs({ ...options, userId: user.id });
}



export async function getPublicNpcs(
  options: Omit<Parameters<typeof getNpcs>[0], 'isPublic'>
) {
  return getNpcs({ ...options, isPublic: true });
}




export async function getNpcById(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid NPC ID");

  const npc = await NpcModel.findById(id);
  if (!npc) throw new Error("NPC not found");

  return serializeNpc(npc);
}

export async function resolveConnectionNames(connections: Npc['connections']) {
  const results = await Promise.all(
    connections.map(async (conn) => {
      try {
        let name = '';
        switch (conn.type) {
          case 'settlement': {
            const doc = await Settlement.findById(conn.id).select('name');
            name = doc?.name || '[Unknown Settlement]';
            break;
          }
          case 'site': {
            const doc = await Site.findById(conn.id);
            if(doc){
              return {...conn, name: doc.name, siteType: doc.type}
            } else {
              name = '[Unknown Site]';
            }
            
            break;
          }
          case 'npc': {
            const doc = await NpcModel.findById(conn.id);
            if (doc) {
                const serialized = serializeNpc(doc);
                return { ...conn, name: serialized.name, npcData: serialized };
            } else {
                name = '[Unknown NPC]';
            }
            break;
          }
          default:
            name = '[Unknown Type]';
        }
        return { ...conn, name };
      } catch (error) {
        console.error(`Error resolving connection ${conn.type} (${conn.id}):`, error);
        return { ...conn, name: '[Error Resolving Name]' };
      }
    })
  );

  return results;
}



export async function createNpc(data: NpcFormData): Promise<Npc> {
    await connectToDatabase();
    const user = await requireUser();

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);

    const newNpc = await NpcModel.create({
        ...data,
        userId: new ObjectId(user.id),
        connections: normalizedConnections,
    });

    revalidatePath("/npcs");

    return serializeNpc(newNpc);
}




export async function updateNpc(id: string, data: NpcFormData): Promise<Npc> {
    await connectToDatabase();

    if (!ObjectId.isValid(id)) throw new Error("Invalid NPC ID");

    const user = await requireUser();
    const existing = await NpcModel.findById(id);

    if (!existing) throw new Error("NPC not found");
    if (existing.userId.toString() !== user.id) throw new Error("Unauthorized");

    // Normalize connection ids
    const normalizedConnections = normalizeConnections(data.connections);

    const updatedNpc = await NpcModel.findByIdAndUpdate(
        id,
        {
            ...data,
            connections: normalizedConnections,
        },
        { new: true }
    );

    if (!updatedNpc) throw new Error("NPC not found");

    revalidatePath("/npcs");
    return serializeNpc(updatedNpc);
}



export async function deleteNpc(id: string) {
  await connectToDatabase();
  if (!ObjectId.isValid(id)) throw new Error("Invalid NPC ID");

  const user = await requireUser();
  const existing = await NpcModel.findById(id);

  if(!existing) throw new Error("NPC not found");
  if(existing.userId.toString() !== user.id) throw new Error("Unauthorized");

  const deletedNpc = await NpcModel.findByIdAndDelete(id);
  if (!deletedNpc) throw new Error("NPC not found");

  revalidatePath("/npcs");
  return { message: "NPC deleted successfully" };
}
