import { Box, Typography } from "@mui/material";
import { NPC_CONNECTION_SITE_ROLE, NPC_CONNECTION_SITE_TYPE_ROLES } from "@/constants/npc.options";
import EntityLinkList from "@/components/Common/EntityLink/EntityLinkList";
import { useResolvedConnections } from "@/hooks/npc/npc.query";
import { ConnectionProps } from "@/interfaces/connection.interface";


export function ConnectionsList({ connections }: ConnectionProps) {
  const { data: resolvedConnections, isLoading } = useResolvedConnections(connections);

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

  if (!resolvedConnections || resolvedConnections.length === 0) {
      return (
      <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Connections</Typography>
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
        mapRole={(role) => getNpcRoleLabel(role, 'entertainment')}
      />
    </Box>
  );
}
