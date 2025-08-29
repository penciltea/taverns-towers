import { Box, Typography } from "@mui/material";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import { ConnectionProps } from "@/interfaces/connection.interface";



export function ConnectionsList({ connections, variant, pageSiteType }: ConnectionProps) {
  const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);
  
  if (isLoading) {
      return (
      <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Connections</Typography>
          <Typography variant="body2" color="text.secondary">Loading connections...</Typography>
      </Box>
      );
  }

  if (!resolvedConnections || resolvedConnections.length === 0) {
      return (
      <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Connections</Typography>
          <Typography variant="body2" color="text.secondary">No connections available.</Typography>
      </Box>
      );
  }

  return (
    <Box>
      <EntityLinkList
        connections={resolvedConnections}
        title="Connections"
        showType={false}
        variant={variant}
        pageSiteType={pageSiteType}
      />
    </Box>
  );
}
