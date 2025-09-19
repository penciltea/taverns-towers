'use client';

import { Box, Typography, Button, Stack } from "@mui/material";

interface PatreonProps {
  patreon: {
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
  };
}

export default function PatreonMembershipPanel({ patreon }: PatreonProps) {
  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="subtitle1">Patreon Membership Tier: {patreon.tier ?? "Unknown"}</Typography>
        <Typography variant="body2">Patreon-connected account.</Typography>
        { patreon.accessToken ? 
          (
            <Button
              variant="outlined"
              href="https://www.patreon.com/c/RealmFoundry"
              target="_blank"
              rel="noopener noreferrer"
            >
              Manage Patreon Membership
            </Button>
          ) 
          : null
        }
      </Stack>
    </Box>
  );
}
