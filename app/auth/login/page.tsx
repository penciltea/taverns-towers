'use client';

import LoginForm from "@/components/Auth/LoginForm";
import { Box, Paper, Typography } from "@mui/material";

export default function LoginPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: 400, md: 500, lg: 600 },
          maxWidth: "100%",
          p: 3,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <Typography variant="body1" gutterBottom>
          Step through the gate — enter your username or email and password to continue your adventure.
        </Typography>

        <LoginForm />
      </Paper>
    </Box>
  );
}
