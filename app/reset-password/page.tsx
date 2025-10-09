'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useUIStore } from '@/store/uiStore';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { showSnackbar, setLoading, isLoading } = useUIStore();

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography color="error" variant="body1">Invalid or missing reset token.</Typography>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    const errors: string[] = [];
    if (!password) errors.push('Password is required.');
    if (!confirm) errors.push('Confirm Password is required.');
    if (password && password.length < 8)
      errors.push('Password must be at least 8 characters.');
    if (password !== confirm)
      errors.push('Passwords do not match.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) throw new Error('Reset failed');
      showSnackbar('Password successfully reset! You may now log in.', 'success');
      setConfirm('');
      setPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setFormErrors([err.message]);
      } else {
        setFormErrors(['Something went wrong. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2,
        }}
    >
      <Paper 
          elevation={3} 
          sx={{
              width: {
                  xs: '90%',
                  sm: 400,
                  md: 500,
                  lg: 600,
              },
              maxWidth: '100%',
              p: 3,
          }}
      >
        <Typography variant="h4" gutterBottom>Reset Password</Typography>

        <form onSubmit={handleSubmit}>

          <Box sx={{py: 2}}>
            <TextField
              fullWidth
              type="password"
              label="New Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            {formErrors.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography color="error" sx={{ fontWeight: 'bold' }}>
                  Please fix the following:
                </Typography>
                <ul
                  style={{
                    color: '#d32f2f',
                    marginTop: 4,
                    marginBottom: 0,
                    paddingLeft: 24,
                  }}
                >
                  {formErrors.map((msg, idx) => (
                    <li key={idx}>
                      <Typography component="span" variant="body2">
                        {msg}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}
          </Box>

          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
