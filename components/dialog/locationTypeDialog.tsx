'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DialogProps } from "@/interfaces/dialogProps.interface";

export default function LocationTypeDialog({ open, onClose}: DialogProps) {
  const defaultTitle = `Location Type Dialog`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{defaultTitle}</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
