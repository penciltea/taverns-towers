'use client'

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useUIStore } from '@/store/uiStore';

export default function ErrorDialog() {
  const { isErrorDialogOpen, errorMessage, closeErrorDialog } = useUIStore();

  return (
    <Dialog
      open={isErrorDialogOpen}
      onClose={closeErrorDialog}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6">Error</Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={closeErrorDialog}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeErrorDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
