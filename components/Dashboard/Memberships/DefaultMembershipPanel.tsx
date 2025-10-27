'use client';

import { UserInterface } from "@/interfaces/user.interface";
import { Button, Typography } from "@mui/material";
import { usePatreonLink } from "@/hooks/user/usePatreonLink";
import { useUIStore } from "@/store/uiStore";

interface DefaultProps {
  user: UserInterface;
}

export default function DefaultMembershipPanel({ user }: DefaultProps) {
  const { linkPatreon } = usePatreonLink();
  const { isLoading } = useUIStore();

  return (
    <>
      <Typography variant="h6" gutterBottom>Patreon Membership</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>Link your patreon account to your RealmFoundry account.<br />You can upgrade your membership tier on Patreon to unlock additional features and benefits.</Typography>
      
        {!user.patreon?.accessToken && (
          <Button 
            variant="contained" 
            onClick={ () => linkPatreon() } 
            disabled={isLoading}
          >
            {isLoading ? "Linking Patreon..." : "Link Patreon Account"}
          </Button>
        )}
    </>
  );
}
