import { useResolvedConnections } from "@/hooks/connection/useResolvedConnections";

export function useGroupedConnections(connections: any[]) {
  const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

  const grouped = resolvedConnections?.reduce<Record<string, typeof resolvedConnections>>((acc, conn) => {
    if (!acc[conn.type]) acc[conn.type] = [];
    acc[conn.type].push(conn);
    return acc;
  }, {}) ?? {};

  console.log("grouped: ", connections);

  return { grouped, isLoading, hasConnections: !!resolvedConnections?.length };
}
