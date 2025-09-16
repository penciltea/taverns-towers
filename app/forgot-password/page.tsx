'use client';

import { useState } from 'react';
import { Container, Typography, TextField, Button, Alert } from '@mui/material';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/request-reset', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');

      setStatus('success');
      setMessage('Check your email for a reset link.');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter your email address, and we’ll send you a link to reset your password.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="email"
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending…' : 'Send Reset Link'}
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
