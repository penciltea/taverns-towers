'use client';

import { Box, Paper, Typography, Button, Link as MuiLink} from "@mui/material";
import { useRouter } from "next/navigation";

export default function VerifyYourEmailPage() {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80vh',
                px: 2
            }}
        >
            <Paper sx={{ p: 4, maxWidth: 500, width: '100%', textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Verify Your Email</Typography>

                <Typography variant="body1" sx={{ mb: 3 }}>Thanks for signing up! Before you can log in, please verify your email address. Check your inbox for a verification link.</Typography>

                <Button
                    variant="contained"
                    onClick={() => router.push('/resend-verification')}
                    sx={{ mb: 2 }}
                >
                    Resend Verification Email
                </Button>

                <Typography variant="body2">Already verified? <MuiLink onClick={() => router.push("/auth/login")} sx={{ cursor: 'pointer' }}>Go to Login</MuiLink></Typography>
            </Paper>
        </Box>
    );
}
