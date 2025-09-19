'use client';

import { UserInterface } from "@/interfaces/user.interface";
import { Box, Typography, Stack, Button } from "@mui/material";

interface DefaultProps {
  user: UserInterface;
}

export default function DefaultMembershipPanel({ user }: DefaultProps) {
  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="subtitle1">Membership Tier: {user.tier}</Typography>
        <Typography variant="body2">No linked membership provider.</Typography>
        <Button variant="contained" href="/account/membership" disabled>Manage Membership</Button>
      </Stack>
    </Box>
  );
}
