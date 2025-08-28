import { ObjectId } from "bson";
import { Npc } from "@/interfaces/npc.interface";
import { Settlement } from "@/interfaces/settlement.interface";
import { NpcConnection } from "@/interfaces/connection.interface";
import { NpcConnectionType } from "@/constants/npc.options";
import { ConnectionInput } from "../actions/npcConnections";
import { ISettlement } from "../models/settlement.model";

export type SerializedNpcConnection = Omit<NpcConnection, "id"> & { id: string; name?: string; };

/**
 * Convert an ID to string safely.
 */
function toStringId(id: string | ObjectId | undefined | null): string {
  if (!id) return "";
  return typeof id === "string" ? id : id.toString();
}

/**
 * Convert date to ISO string safely.
 */
function toISOStringSafe(date?: Date | string | null): string | null {
  if (!date) return null;
  return date instanceof Date ? date.toISOString() : String(date);
}

/**
 * Normalize connection inputs to ensure IDs are ObjectId and fields are present.
 */
export function normalizeConnections(connections: ConnectionInput[] = []): ConnectionInput[] {
  return connections.map((conn) => ({
    ...conn,
    id: ObjectId.isValid(conn.id) ? new ObjectId(conn.id) : conn.id,
    role: conn.role ?? ""
  }));
}

/**
 * Serialize a flat array of connections into strings for persistence.
 */
export function serializeConnections(connections: NpcConnection[] = []): Array<Omit<NpcConnection, "type"> & { id: string }> {
  return connections.map((conn) => ({
    ...conn,
    id: toStringId(conn.id),
  }));
}

/**
 * Serialize connections for client consumption.
 */
export function serializeConnectionsForClient(connections: NpcConnection[] = []): SerializedNpcConnection[] {
  return connections.map((conn) => ({
    ...conn,
    id: toStringId(conn.id),
    role: conn.role ?? "",
    name: (conn as Partial<SerializedNpcConnection>).name ?? "",
    type: conn.type as NpcConnectionType,
  }));
}

/**
 * Serialize an NPC document for client consumption.
 */
export function serializeNpcForClient(npcDoc: Npc): Npc {
  return {
    ...npcDoc,
    _id: toStringId(npcDoc._id),
    userId: toStringId(npcDoc.userId),
    name: npcDoc.name ?? "",
    traits: Array.isArray(npcDoc.traits) ? [...npcDoc.traits] : [],
    description: npcDoc.description ?? "",
    gmNotes: npcDoc.gmNotes ?? "",
    publicNotes: npcDoc.publicNotes ?? "",
    connections: Array.isArray(npcDoc.connections)
      ? npcDoc.connections.map((c) => ({
          ...c,
          id: toStringId(c.id),
          role: c.role ?? "",
          name: (c as Partial<SerializedNpcConnection>).name ?? "",
          type: c.type as NpcConnectionType,
        }))
      : [],
    isPublic: Boolean(npcDoc.isPublic),
    editors: Array.isArray(npcDoc.editors) ? [...npcDoc.editors] : [],
    createdAt: toISOStringSafe(npcDoc.createdAt) || new Date().toISOString(),
    updatedAt: toISOStringSafe(npcDoc.updatedAt) || new Date().toISOString(),
  };
}

/**
 * Serialize a settlement document for client consumption.
 */

export function serializeSettlementForClient(settlement: ISettlement): Settlement {
  // Convert the Mongoose document to a plain object
  const obj = settlement.toObject(); 
  
  const id = obj._id ?? obj.id;
  if (!id) throw new Error("Settlement object missing _id");

  return {
    ...obj,
    _id: toStringId(id),
    userId: typeof obj.userId === "string"
      ? obj.userId
      : obj.userId?._id
        ? toStringId(obj.userId._id)
        : obj.userId?.toString?.() ?? null,
    connections: serializeConnectionsForClient(obj.connections ?? []),
    createdAt: toISOStringSafe(obj.createdAt),
    updatedAt: toISOStringSafe(obj.updatedAt),
  };
}
