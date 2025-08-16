'use client'

import { useSession } from 'next-auth/react';
import { MiscellaneousSite } from '@/interfaces/site.interface';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import InfoListItem from '@/components/Common/InfoListItem';
import { SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { useResolvedConnections } from '@/hooks/useResolvedConnections';

export const MiscellaneousDetails = ({ site }: { site: MiscellaneousSite }) => {
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;

  const { data: resolvedConnections, isLoading } = useResolvedConnections(site.connections);

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

  // Group by type
  const grouped = resolvedConnections.reduce<Record<string, typeof resolvedConnections>>((acc, conn) => {
      if (!acc[conn.type]) acc[conn.type] = [];
      acc[conn.type].push(conn);
      return acc;
  }, {});

  return (
    <>
      <Box component="dl" sx={{ mt: 1, px: 3 }}>
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
        <InfoListItem label="Features" value={site.features} />
        <InfoListItem label="Use" value={site.use} />
        <InfoListItem label="Public Notes" value={site.publicNotes} />

        { user?.id === site.userId &&  (
          <InfoListItem label="GM Notes" value={site.gmNotes} />
        ) }   

      </Box>
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
    </>
  );
};