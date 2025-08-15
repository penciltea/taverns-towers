import { useQuery } from "@tanstack/react-query";
import { Npc } from "@/interfaces/npc.interface";
import { resolveConnectionNames } from "@/lib/actions/npcConnections";


export function useResolvedConnections(connections: Npc['connections']) {
  return useQuery({
    queryKey: ['resolvedConnections', connections],
    queryFn: () => resolveConnectionNames(connections),
    enabled: connections.length > 0,
  });
}