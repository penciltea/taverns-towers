'use client'

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Close from '@mui/icons-material/Close';
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
          <Close />
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
