'use server'

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/db/connect";
import { requireUser } from "../auth/authHelpers";
import NpcModel from "../models/npc.model";
import { Npc } from "@/interfaces/npc.interface";

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

function normalizeConnections(connections: any[] = []) {
  return connections.map(conn => ({
    ...conn,
    id: ObjectId.isValid(conn.id) ? new ObjectId(conn.id) : conn.id,
    role: conn.role ?? "",  // default to empty string if undefined
    label: conn.label ?? "",
  }));
}

export async function createNpc(data: Partial<Npc>) {
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

export async function updateNpc(id: string, data: Partial<Npc>) {
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