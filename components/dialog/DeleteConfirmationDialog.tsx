'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { DialogProps } from "@/interfaces/dialogProps.interface";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  deleting = "item",
}: DialogProps) {
  const defaultTitle = `Delete ${deleting}?`;
  const defaultMessage = `Are you sure you want to delete this ${deleting}? This action cannot be undone.`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || defaultTitle}</DialogTitle>
      <DialogContent>
        <Typography>{message || defaultMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
