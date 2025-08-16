import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useGroupedConnections } from "@/hooks/npc/useGroupedConnections";
import { NPC_CONNECTION_SITE_ROLE, NPC_CONNECTION_SITE_TYPE_ROLES } from "@/constants/npc.options";
import { NpcConnection } from "@/interfaces/connection.interface";

interface Props {
  connections: NpcConnection[];
  siteType: string;
}

export function ConnectionsList({ connections, siteType }: Props) {
  const { grouped, isLoading, hasConnections } = useGroupedConnections(connections);

  function getNpcRoleLabel(roleValue: string, siteType?: string): string {
    // 1. Search base roles
    const baseMatch = NPC_CONNECTION_SITE_ROLE.find(r => r.value === roleValue);
    if (baseMatch) return baseMatch.label;

    // 2. Search site-specific roles (if siteType provided)
    if (siteType && NPC_CONNECTION_SITE_TYPE_ROLES[siteType]) {
      const siteMatch = NPC_CONNECTION_SITE_TYPE_ROLES[siteType].find(r => r.value === roleValue);
      if (siteMatch) return siteMatch.label;
    }

    // 3. Fallback: just return the raw value
    return roleValue;
  }

  if (isLoading) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Connections</Typography>
        <Typography variant="body2" color="text.secondary">Loading connections...</Typography>
      </Box>
    );
  }

  if (!hasConnections) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Connections</Typography>
        <Typography variant="body2" color="text.secondary">No connections available.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" component="h2" sx={{ textDecoration: "underline" }}>Connections</Typography>
      {Object.entries(grouped).map(([type, group]) => (
        <Box key={type} sx={{ mb: 3 }}>
          <List dense>
            {group.map((conn) => (
              <ListItem key={conn.id}>
                <ListItemText
                  sx={{ textTransform: 'capitalize'}}
                  primary={conn.name || "Unknown NPC"}
                  secondary={conn.role ? `Role: ${getNpcRoleLabel(conn.role, siteType)}` : undefined}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
