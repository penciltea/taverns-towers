'use client';

import { Button, Stack, Typography } from "@mui/material";
import { usePatreonLink } from "@/hooks/user/usePatreonLink";

interface PatreonProps {
  patreon: {
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
    providerAccountId?: string;
  }
}

export default function PatreonMembershipPanel({ patreon }: PatreonProps) {
  const { unlinkPatreon } = usePatreonLink();

  return (
    <>
      <Typography variant="h6" gutterBottom>Patreon Membership</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>You have an active Patreon membership! Manage your membership below.</Typography>
      {patreon.providerAccountId && (
        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            size="large"
            href="https://www.patreon.com/c/RealmFoundry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manage Patreon Membership
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => unlinkPatreon(patreon.providerAccountId!)}
          >
            Unlink Patreon Account
          </Button>
        </Stack>
      )}
    </>
  );
}
