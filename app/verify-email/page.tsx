"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useUIStore } from "@/store/uiStore";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { isLoading, setLoading, showSnackbar } = useUIStore();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setError("Missing verification token.");
      return;
    }

    async function verify() {
      try {
        setLoading(true);
        const res = await fetch(`/api/verify-email?token=${token}`);
        const data = await res.json();

        if (data.success) {
          showSnackbar("Email verified successfully! Please login to proceed.", "success");
          setError(null);

          router.push('/auth/login');
        } else {
          setError(data.error || "Email verification failed.");
        }
      } catch (err) {
        setError(`Server error during verification: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [token, setLoading, showSnackbar, router]);


  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 10, textAlign: 'center', px: 2 }}>
      {isLoading && (
        <>
          <CircularProgress />
          <Typography variant="h6" mt={2}>Verifying your email...</Typography>
        </>
      )}

      {error && !isLoading && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" color="error" gutterBottom>Oh dear!<br />There was a problem verifying your email.</Typography>
          <Typography variant="body1">{error}</Typography>


        </Box>
      )}
    </Box>
  );
}
