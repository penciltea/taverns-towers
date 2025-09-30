'use client';

import { Box, Button, Divider, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

type OAuthProvider = {
  name: string;
  icon?: React.ReactNode;
  signInFunction: () => void;
};

type LoginContentProps = {
  onNativeSuccess?: () => void;
  onOAuthSuccess?: (provider: string) => void;
  oauthProviders?: OAuthProvider[];
};

export default function LoginContent({
  onNativeSuccess,
  onOAuthSuccess,
  oauthProviders = [],
}: LoginContentProps) {
  return (
    <Box>
      <Typography variant="body1" gutterBottom>
        Step through the gate! Enter your username/password or sign in through a trusted partner to continue your adventure.
      </Typography>

      <LoginForm onSuccess={onNativeSuccess} />

      {oauthProviders.length > 0 && <Divider sx={{ my: 3 }}>or</Divider>}

      {oauthProviders.map((provider) => (
        <Button
          key={provider.name}
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={provider.icon}
          onClick={() => {
            provider.signInFunction();
            onOAuthSuccess?.(provider.name);
          }}
          sx={{ mb: 1 }}
        >
          Continue with {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </Button>
      ))}
    </Box>
  );
}
