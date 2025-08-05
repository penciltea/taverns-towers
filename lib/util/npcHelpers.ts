type FlatConnection = {
  type: string;
  id: string;
  role?: string;
  label?: string;
};

type GroupedConnections = {
  [key: string]: { id: string; label?: string; role?: string }[];
};

function groupConnections(connections: FlatConnection[] | undefined): GroupedConnections {
  if (!connections) return {};

  return connections.reduce<GroupedConnections>((acc, conn) => {
    const group = acc[conn.type] ?? [];
    group.push({ id: conn.id, role: conn.role, label: conn.label });
    acc[conn.type] = group;
    return acc;
  }, {});
}


function flattenConnections(connectionsGrouped: Record<string, { id: string; label?: string; role?: string }[] | undefined> | undefined) {
  if (!connectionsGrouped) return [];
  
  return Object.entries(connectionsGrouped).flatMap(([type, items]) => 
    (items || []).map(item => ({
      type: type as any, // or more specific type if you have it
      id: item.id,
      label: item.label,
      role: item.role,
    }))
  );
}

