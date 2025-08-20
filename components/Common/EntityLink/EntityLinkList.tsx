'use client';

import { Box, List, ListItem, ListItemText, Typography, Chip, Stack } from "@mui/material";
import { Npc } from "@/interfaces/npc.interface";
import { capitalizeFirstLetter, toTitleCase } from "@/lib/util/stringFormats";
import React from "react";
import { Option } from "@/components/Form/FormSelect";
import { NPC_CONNECTION_SITE_ROLE, NPC_CONNECTION_SITE_TYPE_ROLES, NPC_CONNECTION_SETTLEMENT_ROLE, NPC_CONNECTION_NPC_ROLE } from "@/constants/npc.options";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";

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
}

function mapConnectionRole(conn: any) {
  const { type, role, siteType } = conn;
  if (!role) return "Unknown";

  let options: Option[] = [];

  switch (type) {
    case "site":
      options = [
        ...NPC_CONNECTION_SITE_ROLE,
        ...(siteType ? NPC_CONNECTION_SITE_TYPE_ROLES[siteType] ?? [] : []),
      ];
      break;

    case "settlement":
      options = NPC_CONNECTION_SETTLEMENT_ROLE;
      break;

    case "npc":
      options = NPC_CONNECTION_NPC_ROLE;
      break;

    default:
      options = [];
  }

  return getLabelFromValue(options, role, role);
}

export default function EntityLinkList({
  connections,
  title = 'Connections',
  showType = false,
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
            <Typography
              variant="h6"
              sx={{ textTransform: type.toLowerCase() === "npc" ? "uppercase" : "capitalize", mb: 1 }}
            >
              {type}
            </Typography>
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
                          <Chip label={mapConnectionRole(conn)} size="small" />
                        )}
                        {conn.npcData.race && (
                          <Chip label={toTitleCase(conn.npcData.race)} size="small" />
                        )}
                        {conn.npcData.pronouns && (
                          <Chip label={mapConnectionRole({ type: "pronouns", role: conn.npcData.pronouns })} size="small" />
                        )}
                      </Stack>
                    ) : conn.role ? (
                      `Role: ${mapConnectionRole(conn)}`
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