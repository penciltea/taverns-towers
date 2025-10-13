'use client';

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RegisterForm from "./RegisterForm";
import { AuthContentProps } from "@/interfaces/ui.interface";

export default function RegisterContent({ onNativeSuccess, onOAuthSuccess, skipRedirect, oauthProviders = [] }: AuthContentProps) {
    return (
        <Box>
            <Typography variant="body1" component="h2" gutterBottom>Ready your quill and map tools — your worldbuilding journey begins now. From hamlets to high halls, conjure what you need with a tap or craft your world yourself!</Typography>
            <Typography variant="body1" component="p">Getting started is free -- no gold required.</Typography>

            <RegisterForm onSuccess={onNativeSuccess} skipRedirect={skipRedirect} />

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
                    Sign up with {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
                </Button>
            ))}
        </Box>
    )
}