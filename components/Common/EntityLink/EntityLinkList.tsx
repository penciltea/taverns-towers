'use client';

import { Box, List, ListItem, ListItemText, Typography, Chip, Stack } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import { capitalizeFirstLetter, toTitleCase } from "@/lib/util/stringFormats";
import React from "react";

// Type guard for NPC connections
function isNpcConnection(
  conn: { type: string; npcData?: Npc }
): conn is { type: 'npc'; npcData: Npc; role?: string; name: string; id: string } {
  return conn.type === 'npc' && !!conn.npcData;
}

interface EntityLinkListProps {
  connections: Array<any>;
  title?: string;
  showType?: boolean;
  mapRole?: (role: string, conn: any) => string | undefined; // optional role mapper
}

export default function EntityLinkList({
  connections,
  title = 'Connections',
  showType = false,
  mapRole,
}: EntityLinkListProps) {
  if (!connections || connections.length === 0) return null;

  const grouped = connections.reduce<Record<string, typeof connections>>((acc, conn) => {
    if (!acc[conn.type]) acc[conn.type] = [];
    acc[conn.type].push(conn);
    return acc;
  }, {});

  return (
    <>
      <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>

      {Object.entries(grouped).map(([type, group]) => (
        <Box key={type} sx={{ mb: 3 }}>
          {showType && (
            <Typography variant="h6" sx={{ textTransform: type.toLowerCase() === "npc" ? "uppercase" : "capitalize", mb: 1 }}>{ type }</Typography>
          )}
          <List dense>
            {group.map((conn) => (
              <ListItem key={conn.id} alignItems="flex-start">
                <ListItemText
                  primary={conn.name}
                  secondary={
                    isNpcConnection(conn) ? (
                      <Stack direction="row" spacing={1} flexWrap="wrap" component="div">
                        {conn.role && (
                          <Chip label={capitalizeFirstLetter( (mapRole ? mapRole(conn.role, conn) : conn.role) ?? "Unknown" )} size="small" />
                        )}
                        {conn.npcData.race && (
                          <Chip label={toTitleCase(conn.npcData.race)} size="small" />
                        )}
                        {conn.npcData.pronouns && (
                          <Chip label={capitalizeFirstLetter(conn.npcData.pronouns)} size="small" />
                        )}
                      </Stack>
                    ) : conn.role ? (
                      `Role: ${mapRole ? mapRole(conn.role, conn) : conn.role}`
                    ) : undefined
                  }
                  slotProps={{ secondary: { component: 'div' } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );
}