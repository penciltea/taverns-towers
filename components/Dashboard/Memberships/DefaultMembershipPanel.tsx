'use client';

import { UserInterface } from "@/interfaces/user.interface";
import { Box, Stack, Button } from "@mui/material";
import MembershipBenefits from "./MembershipBenefits";
import { userTier } from "@/constants/user.options";
import MembershipTier from "./MembershipTier";
import { usePatreonLink } from "@/hooks/user/usePatreonLink";
import { useUIStore } from "@/store/uiStore";

interface DefaultProps {
  user: UserInterface;
}

export default function DefaultMembershipPanel({ user }: DefaultProps) {
  const { linkPatreon } = usePatreonLink();
  const { isLoading } = useUIStore();

  const tier = user.tier ?? userTier[0];

  return (
    <Box>
      <Stack spacing={1}>
        <MembershipTier tier={tier} />
        <MembershipBenefits tier={tier} />

        {/* Stripe / site-managed membership */}
        <Button 
          variant="contained" 
          href="/account/membership" 
          disabled
        >
          Manage Membership
        </Button>

        {/* Patreon linking */}
        {!user.patreon?.accessToken && (
          <Button 
            variant="outlined" 
            onClick={ () => linkPatreon() } 
            disabled={isLoading}
          >
            {isLoading ? "Linking Patreon..." : "Link Patreon Account"}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
