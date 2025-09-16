'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error">Invalid or missing reset token.</Alert>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) throw new Error('Reset failed');

      setStatus('success');
      setMessage('Password successfully reset. You may now log in.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>

      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Resetting…' : 'Reset Password'}
        </Button>
      </form>

      {status !== 'idle' && (
        <Alert severity={status === 'success' ? 'success' : 'error'} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
    </Container>
  );
}
