'use client';

import { UserInterface } from "@/interfaces/user.interface";
import { Box, Stack, Button } from "@mui/material";
import MembershipBenefits from "./MembershipBenefits";
import { userTier } from "@/constants/user.options";
import MembershipTier from "./MembershipTier";

interface DefaultProps {
  user: UserInterface;
}

export default function DefaultMembershipPanel({ user }: DefaultProps) {
  return (
    <Box>
      <Stack spacing={1}>
        <MembershipTier tier={user.tier ?? userTier[0]} />
        <MembershipBenefits tier={ user.tier ?? userTier[0] }/>
        
        <Button variant="contained" href="/account/membership" disabled>Manage Membership</Button>
      </Stack>
    </Box>
  );
}
