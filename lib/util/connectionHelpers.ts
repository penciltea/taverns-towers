import { ObjectId } from "bson";
import { ConnectionInput } from "../actions/npcConnections";
import { Npc } from "@/interfaces/npc.interface";
import { Settlement } from "@/interfaces/settlement.interface";

export function normalizeConnections(connections: ConnectionInput[] = []) {
  return connections.map((conn) => ({
    ...conn,
    id: ObjectId.isValid(conn.id) ? new ObjectId(conn.id) : conn.id,
    role: conn.role ?? "",
    label: conn.label ?? "",
  }));
}



export function serializeConnections(connections: any[] = []) {
  return connections.map((conn) => ({
    ...conn,
    id: conn.id?.toString?.() ?? conn.id
  }));
}

export function serializeConnectionsForClient(connections: any[] = []) {
  return connections.map((conn) => ({
    type: conn.type,
    id: conn.id?.toString?.() ?? conn.id,
    role: conn.role ?? '',
    label: conn.label ?? '',
    name: conn.name ?? '',
  }));
}

export function serializeNpcForClient(npcDoc: Npc | any): Npc {
  if (!npcDoc) return null as any;

  return {
    // Convert Mongo ObjectId to string
    _id: String(npcDoc._id),
    userId: String(npcDoc.userId),
    name: String(npcDoc.name ?? ""),
    traits: Array.isArray(npcDoc.traits) ? [...npcDoc.traits] : [],
    description: String(npcDoc.description ?? ""),
    gmNotes: String(npcDoc.gmNotes ?? ""),
    publicNotes: String(npcDoc.publicNotes ?? ""),
    connections: Array.isArray(npcDoc.connections)
      ? npcDoc.connections.map((c: any) => ({
          id: String(c.id),
          name: String(c.name ?? ""),
          role: String(c.role ?? ""),
          label: String(c.label ?? ""),
          type: String(c.type ?? ""),
        }))
      : [],
    isPublic: Boolean(npcDoc.isPublic),
    editors: Array.isArray(npcDoc.editors) ? [...npcDoc.editors] : [],
    createdAt: npcDoc.createdAt instanceof Date ? npcDoc.createdAt.toISOString() : String(npcDoc.createdAt),
    updatedAt: npcDoc.updatedAt instanceof Date ? npcDoc.updatedAt.toISOString() : String(npcDoc.updatedAt)
  };
}

export function serializeSettlementForClient(settlement: any): Settlement {
  const obj = settlement?.toObject?.() ?? settlement ?? {};

  const id = obj._id ?? obj.id;
  if (!id) throw new Error("Settlement object missing _id");

  return {
    ...obj,
    _id: id.toString(),
    userId: typeof obj.userId === "string"
      ? obj.userId
      : obj.userId?._id
        ? obj.userId._id.toString()
        : obj.userId?.toString?.() ?? null,
    connections: serializeConnectionsForClient(obj.connections ?? []),
    createdAt: obj.createdAt?.toISOString?.() ?? null,
    updatedAt: obj.updatedAt?.toISOString?.() ?? null,
  };
}