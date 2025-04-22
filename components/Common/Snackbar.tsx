'use client';
import { Snackbar, Alert } from '@mui/material';
import { useUIStore } from '@/store/uiStore';

export default function GlobalSnackbar() {
  const { isSnackbarOpen, snackbarMessage, snackbarSeverity, closeSnackbar } = useUIStore();

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={4000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
}
