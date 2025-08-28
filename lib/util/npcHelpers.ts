import { Npc } from "@/interfaces/npc.interface";

/**
 * Base connection type for all entity links.
 */
export type BaseTypeConnection = {
  type: "site" | "settlement" | "npc";
  id: string;
  name: string;
  role?: string;
  siteType?: string;
};

/**
 * Specialized connection type when linking directly to another NPC.
 */
export type NpcTypeConnection = BaseTypeConnection & {
  type: "npc";
  npcData: Npc;
};

/**
 * Union type covering all possible connections.
 */
export type TypeConnection = BaseTypeConnection | NpcTypeConnection;

/**
 * Flattened connection type (lightweight, often used for persistence or serialization).
 */
export type FlatConnection = {
  type: TypeConnection["type"];
  id: string;
  role?: string;
  label?: string;
};

/**
 * Grouped connections, keyed by type.
 */
export type GroupedConnections = {
  [K in TypeConnection["type"]]?: { id: string; label?: string; role?: string }[];
};

/**
 * Groups a flat array of connections by their type.
 */
export function groupConnections(
  connections: FlatConnection[] | undefined
): GroupedConnections {
  if (!connections) return {};

  return connections.reduce<GroupedConnections>((acc, conn) => {
    const group = acc[conn.type] ?? [];
    group.push({ id: conn.id, role: conn.role, label: conn.label });
    acc[conn.type] = group;
    return acc;
  }, {});
}

/**
 * Flattens a grouped connections object back into a flat array.
 */
export function flattenConnections(
  connectionsGrouped: GroupedConnections | undefined
): FlatConnection[] {
  if (!connectionsGrouped) return [];

  return Object.entries(connectionsGrouped).flatMap(([type, items]) =>
    (items || []).map((item) => ({
      type: type as TypeConnection["type"],
      id: item.id,
      label: item.label,
      role: item.role,
    }))
  );
}

/**
 * Type guard for NPC connections.
 */
export function isNpcConnection(conn: TypeConnection): conn is NpcTypeConnection {
  return conn.type === "npc" && "npcData" in conn && !!conn.npcData;
}