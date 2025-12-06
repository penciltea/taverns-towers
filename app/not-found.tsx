'use client'

import { Box, Typography, Button, Paper } from "@mui/material";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2, my: 2 }}>
      <Paper
        elevation={3}
        sx={{
            width: { xs: "90%", sm: 400, md: 500, lg: 800 }, 
            maxWidth: "100%", 
            p: 4,
            textAlign: 'center'
        }}
      >
        <Typography variant="h2" gutterBottom>404</Typography>
        <Typography variant="h6" gutterBottom>
            Oh dear! This page was lost in the archives of forgotten lore.<br />
            Don&apos;t worry! Your adventure continues elsewhere.
        </Typography>
        <Button variant="contained" component={Link} href="/" sx={{ my: 2 }}>
            Return to safety
        </Button>
      </Paper>
    </Box>
  );
}