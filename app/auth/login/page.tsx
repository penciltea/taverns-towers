'use client';

import { Box, Paper, Typography } from "@mui/material";
import LoginContent from "@/components/Auth/LoginContent";
import { signIn } from "next-auth/react";
import NextMuiLink from "@/components/Common/NextMuiLink";

export default function LoginPage() {
  const oauthProviders = [
    {
      name: "patreon",
      icon: <img src="/icons/patreon.svg" alt="Patreon" width={15} height={15} style={{ display: "block" }} />,
      signInFunction: () => signIn("patreon", { callbackUrl: "/account/dashboard" }),
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper
        elevation={3}
        sx={{ width: { xs: "90%", sm: 400, md: 500, lg: 600 }, maxWidth: "100%", p: 3 }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome Back
        </Typography>

        <LoginContent oauthProviders={oauthProviders} />

        <Typography variant="body2" align="center" sx={{ mt: 4 }}>No account? <NextMuiLink href="/auth/register" underline="always">Sign up</NextMuiLink>.</Typography>
      </Paper>
    </Box>
  );
}
