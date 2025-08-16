import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useGroupedConnections } from "@/hooks/npc/useGroupedConnections";

export function ConnectionsList({ connections }: { connections: any[] }) {
  const { grouped, isLoading, hasConnections } = useGroupedConnections(connections);

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
                  secondary={conn.role ? `Role: ${conn.role}` : undefined}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
