'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useUIStore } from '@/store/uiStore';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormPasswordField from '@/components/Form/FormPasswordField';

interface ResetFormInputs {
  password: string;
  confirm: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { showSnackbar, setLoading, isLoading } = useUIStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ResetFormInputs>({ mode: 'onChange' });

  const password = watch('password', '');
  const confirm = watch('confirm', '');
  const isTouched = !!touchedFields.password;


  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography color="error" variant="body1">Invalid or missing reset token.</Typography>
      </Container>
    );
  }

  const onSubmit: SubmitHandler<ResetFormInputs> = async (data) => {
    const { password, confirm } = data;
    const errors: string[] = [];

    if (password.length < 8) errors.push('Password must be at least 8 characters.');
    if (password !== confirm) errors.push('Passwords do not match.');

    if (errors.length > 0) {
      showSnackbar(errors.join(' '), 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Reset failed');

      showSnackbar('Password successfully reset! You may now log in.', 'success');
      router.push('/auth/login');
    } catch (err: unknown) {
      showSnackbar(err instanceof Error ? err.message : 'Something went wrong.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Paper elevation={3} sx={{ width: { xs: '90%', sm: 400, md: 500 }, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ py: 2 }}>
            <FormPasswordField
              label="New Password"
              registration={register('password', { required: true })}
              fieldError={errors.password}
              passwordValue={password}
              isTouched={isTouched}
              displayRequirements={true} // ✅ shows the dynamic checklist
              displayKeepCurrent={false}
            />

            <FormPasswordField
              label="Confirm Password"
              registration={register('confirm', { required: true })}
              fieldError={errors.confirm}
              passwordValue={confirm}
              isTouched={!!touchedFields.confirm}
              displayRequirements={false} // Confirm field doesn’t need checklist
              displayKeepCurrent={false}
            />
          </Box>

          <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}