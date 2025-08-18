import { QueryClient } from "@tanstack/react-query";

interface queryConnections {
    id: string;
    type: string;
    role: string;
    label?: string;
}

export function invalidateConnections(queryClient: QueryClient, connections: queryConnections[]) {
  if (!connections?.length) return;

  for (const conn of connections) {
    switch (conn.type) {
      case "npc":
        queryClient.invalidateQueries({ queryKey: ["npc", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedNpcs"] });
        break;
      case "settlement":
        queryClient.invalidateQueries({ queryKey: ["settlement", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedSettlements"] });
        break;
      case "site":
        queryClient.invalidateQueries({ queryKey: ["site", conn.id] });
        queryClient.invalidateQueries({ queryKey: ["ownedSites"] });
        break;
    }
  }
}