'use client'

import { useSession } from 'next-auth/react';
import { ShopSite } from '@/interfaces/site.interface';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuList from './MenuList';
import InfoListItem from '@/components/Common/InfoListItem';
import { getLabelFromValue } from '@/lib/util/getLabelFromValue';
import { SHOP_TYPE_CATEGORIES, SITE_CONDITION, SITE_SIZE } from '@/constants/site/site.options';
import { useResolvedConnections } from '@/hooks/npc/npc.query';

export function getShopTypeLabel(value: string): string {
  for (const category of SHOP_TYPE_CATEGORIES) {
    const match = category.options.find(option => option.value === value);
    if (match) return match.label;
  }
  return value; // fallback to raw value if not found
}

export const ShopDetails = ({ site }: { site: ShopSite }) => {
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
        <InfoListItem label="Shop Type" value={site.shopType ? getShopTypeLabel(site.shopType) : "N/A"} />
        <InfoListItem label="Size" value={getLabelFromValue(SITE_SIZE, site.size)} />
        <InfoListItem label="Condition" value={getLabelFromValue(SITE_CONDITION, site.condition)} />
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

      <MenuList menu={site.menu || []} label="Wares" />
    </>
  );
};