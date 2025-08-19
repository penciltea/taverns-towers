import { NpcConnection } from "@/interfaces/connection.interface";

export default function findDeletedConnections(
    initial: NpcConnection[],
    current: NpcConnection[]
  ) {
    const currentIds = new Set(current.map(c => c.id));
    return initial.filter(c => !currentIds.has(c.id));
  }