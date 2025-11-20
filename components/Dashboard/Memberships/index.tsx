'use client';

import { UserInterface } from "@/interfaces/user.interface";
import PatreonMembershipPanel from "./PatreonMembershipPanel";
import DefaultMembershipPanel from "./DefaultMembershipPanel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MembershipBenefits from "./MembershipBenefits";
import MembershipTier from "./MembershipTier";

interface MembershipPanelProps {
  user: UserInterface;
}

export default function MembershipPanel({ user }: MembershipPanelProps) {
  // Future providers can be added here
  if (user.patreon) {
    <PatreonMembershipPanel patreon={user.patreon} />;
  } else {
    <DefaultMembershipPanel user={user} />
  }

  return ( 
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <MembershipTier tier={user.tier} />
          <MembershipBenefits tier={user.tier} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {user.patreon ? (
            <PatreonMembershipPanel patreon={user.patreon} />
          ) : (
            <DefaultMembershipPanel user={user} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
