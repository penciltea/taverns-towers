'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAuthStore } from '@/store/authStore';
import { isUserVerified } from '@/lib/util/isUserVerified';
import Link from 'next/link';

export default function EmailVerificationBanner() {
  const user = useAuthStore(state => state.user);
  const showBanner = user && !isUserVerified(user);

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'warning.main',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 1,
        px: 2,
        gap: 1,
        boxShadow: 1,
      }}
    >
      <WarningAmberIcon fontSize="medium" />
      <Typography variant="body1" sx={{ fontWeight: 500, textAlign: 'center' }}>
        Your email hasn&apos;t been verified yet. Magic can&apos;t preserve your creations until it&apos;s confirmed!{' '}
        <Link href="/verify-your-email" style={{ color: 'black', textDecoration: 'underline' }}>
          Verify now.
        </Link>
      </Typography>
    </Box>
  );
}