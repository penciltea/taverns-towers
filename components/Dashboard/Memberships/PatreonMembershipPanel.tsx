'use client';

import { Box, Typography, Button, Stack } from "@mui/material";
import MembershipBenefits from "./MembershipBenefits";
import { userTier } from "@/constants/user.options";
import MembershipTier from "./MembershipTier";

interface PatreonProps {
  patreon: {
    tier?: string;
    accessToken?: string;
    refreshToken?: string;
  }, 
  tier: string;
}

export default function PatreonMembershipPanel({ patreon, tier }: PatreonProps) {
  return (
    <Box>
      <Stack spacing={1}>
        <MembershipTier tier={ tier ?? userTier[0]} />
        <MembershipBenefits tier={ tier ?? userTier[0]} />

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
