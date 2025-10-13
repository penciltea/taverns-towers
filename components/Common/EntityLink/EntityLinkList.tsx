'use client';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TypographyProps } from "@mui/material/Typography";
import { toTitleCase } from "@/lib/util/stringFormats";
import { Option } from "@/components/Form/FormSelect";
import { NPC_CONNECTION_SITE_ROLE, NPC_CONNECTION_SITE_TYPE_ROLES, NPC_CONNECTION_SETTLEMENT_ROLE, NPC_CONNECTION_NPC_ROLE } from "@/constants/npc.options";
import { getLabelFromValue } from "@/lib/util/getLabelFromValue";
import { TypeConnection, isNpcConnection } from "@/lib/util/npcHelpers";

interface EntityLinkListProps {
  connections: TypeConnection[];
  title?: string;
  showType?: boolean;
  variant?: TypographyProps["variant"]; // optional, for setting title variant
  pageSiteType?: string; // optional, used for label lookup
}

function mapConnectionRole(conn: TypeConnection, pageSiteType?: string): string {
  const { type, role, siteType } = conn as TypeConnection & { siteType?: string };
  if (!role) return "Unknown";

  let options: Option[] = [];
  const typeForLookup = siteType ?? pageSiteType;

  switch (type) {
    case "site":
      options = [
        ...NPC_CONNECTION_SITE_ROLE,
        ...(typeForLookup
          ? NPC_CONNECTION_SITE_TYPE_ROLES[typeForLookup] ?? []
          : []),
      ];
      break;

    case "settlement":
      options = NPC_CONNECTION_SETTLEMENT_ROLE;
      break;

    case "npc":
      options = [
        ...NPC_CONNECTION_NPC_ROLE,
        ...(typeForLookup
          ? NPC_CONNECTION_SITE_TYPE_ROLES[typeForLookup] ?? []
          : []),
      ];
      break;

    default:
      options = [];
  }

  return getLabelFromValue(options, role, role);
}

export default function EntityLinkList({
  connections,
  title = "Connections",
  showType = false,
  variant = "h4",
  pageSiteType,
}: EntityLinkListProps) {
  if (!connections || connections.length === 0) return null;

  // Group by type in a TS-safe way
  const grouped = connections.reduce<Record<TypeConnection["type"], TypeConnection[]>>(
    (acc, conn) => {
      if (!acc[conn.type]) acc[conn.type] = [];
      acc[conn.type].push(conn);
      return acc;
    },
    {} as Record<TypeConnection["type"], TypeConnection[]>
  );

  return (
    <>
      <Typography variant={variant} component="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>

      {Object.entries(grouped).map(([type, group]) => (
        <Box key={type} sx={{ mb: 3 }}>
          {showType && (
            <Typography
              variant="h6"
              sx={{
                textTransform:
                  type.toLowerCase() === "npc" ? "uppercase" : "capitalize",
                mb: 1,
              }}
            >
              {type}
            </Typography>
          )}
          <List dense>
            {group.map((conn) => (
              <ListItem key={conn.id.toString()} alignItems="flex-start">
                <ListItemText
                  primary={conn.name ?? "Unknown"}
                  secondary={
                    isNpcConnection(conn) ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        component="div"
                      >
                        {conn.role && (
                          <Chip
                            label={toTitleCase(mapConnectionRole(conn, pageSiteType))}
                            size="small"
                          />
                        )}
                        {conn.npcData.race && (
                          <Chip
                            label={toTitleCase(conn.npcData.race)}
                            size="small"
                          />
                        )}
                        {conn.npcData.pronouns && (
                          <Chip
                            label={toTitleCase(conn.npcData.pronouns)}
                            size="small"
                          />
                        )}
                      </Stack>
                    ) : conn.role ? (
                      `Role: ${mapConnectionRole(conn, pageSiteType)}`
                    ) : undefined
                  }
                  slotProps={{ primary: { fontSize: "1rem" }, secondary: { component: "div" } }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </>
  );
}
