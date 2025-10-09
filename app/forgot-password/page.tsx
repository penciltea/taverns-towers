'use client';

import { useState } from 'react';
import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import { useUIStore } from '@/store/uiStore';

export default function ForgotPasswordPage() {
  const { showSnackbar, setLoading, isLoading } = useUIStore();
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    const errors: string[] = [];
    if (!email) errors.push('Email is required.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push('Please enter a valid email address.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/request-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong');
      }

      showSnackbar('Check your email for a reset link.', 'success');
      setEmail(''); // clear field
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
        <Typography variant="h4" gutterBottom>Forgot Password</Typography>
        <Typography variant="body1" gutterBottom>Enter your email address, and we&apos;ll send you a link to reset your password.</Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{py: 2}}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? 'Sending…' : 'Send Reset Link'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
