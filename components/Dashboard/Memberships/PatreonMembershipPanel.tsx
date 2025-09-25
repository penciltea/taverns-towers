'use client';

import { Box, Button, Stack } from "@mui/material";
import MembershipBenefits from "./MembershipBenefits";
import { userTier } from "@/constants/user.options";
import MembershipTier from "./MembershipTier";
import { usePatreonLink } from "@/hooks/user/usePatreonLink";

interface PatreonProps {
  patreon: {
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
    providerAccountId?: string;
  }, 
  tier: string;
}

export default function PatreonMembershipPanel({ patreon, tier }: PatreonProps) {
  const { unlinkPatreon } = usePatreonLink();
  const effectiveTier = tier ?? userTier[0];

  return (
    <Box>
      <Stack spacing={1}>
        <MembershipTier tier={effectiveTier} />
        <MembershipBenefits tier={effectiveTier} />

        {patreon.providerAccountId && (
          <>
            <Button
              variant="outlined"
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
          </>
        )}
      </Stack>
    </Box>
  );
}
