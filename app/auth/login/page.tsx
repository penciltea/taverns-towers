'use client';

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoginContent from "@/components/Auth/LoginContent";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { buildOAuthProviders } from "@/lib/util/authHelpers";

export default function LoginPage() {
  const oauthProviders = buildOAuthProviders("/account/dashboard");

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper
        elevation={3}
        sx={{ width: { xs: "90%", sm: 400, md: 500, lg: 600 }, maxWidth: "100%", p: 3 }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Welcome Back</Typography>

        <LoginContent oauthProviders={oauthProviders} />

        <Typography variant="body1" align="center" sx={{ mt: 4 }}>No account? <NextMuiLink href="/auth/register" underline="always">Sign up</NextMuiLink>.</Typography>
      </Paper>
    </Box>
  );
}
