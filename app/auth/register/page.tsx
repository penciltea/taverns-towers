'use client'

import RegisterContent from "@/components/Auth/RegisterContent";
import NextMuiLink from "@/components/Common/NextMuiLink";
import { buildOAuthProviders } from "@/lib/util/authHelpers";
import { Box, Paper, Typography } from "@mui/material";

export default function RegisterPage(){
    const oauthProviders = buildOAuthProviders("/account/dashboard");

    return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Paper
                elevation={3}
                sx={{ width: { xs: "90%", sm: 400, md: 500, lg: 600 }, maxWidth: "100%", p: 3 }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>Sign Up</Typography>
                <RegisterContent oauthProviders={oauthProviders} />

                <Typography variant="body1" align="center" sx={{ mt: 4 }}>Have an account? <NextMuiLink href="/auth/login" underline="always">Log in here!</NextMuiLink></Typography>     
            </Paper>
        </Box>
    )
}