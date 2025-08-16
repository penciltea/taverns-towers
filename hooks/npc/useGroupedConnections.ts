import { useResolvedConnections } from "@/hooks/useResolvedConnections";

export function useGroupedConnections(connections: any[]) {
  const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

  const grouped = resolvedConnections?.reduce<Record<string, typeof resolvedConnections>>((acc, conn) => {
    if (!acc[conn.type]) acc[conn.type] = [];
    acc[conn.type].push(conn);
    return acc;
  }, {}) ?? {};

  return { grouped, isLoading, hasConnections: !!resolvedConnections?.length };
}
