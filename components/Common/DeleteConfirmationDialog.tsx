'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import { DialogProps } from "@/interfaces/dialogProps.interface";

export default function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  deleting = "item",
  deleteText = "delete"
}: DialogProps) {
  const defaultTitle = `Delete ${deleting}?`;
  const defaultMessage = `Are you sure you want to delete this ${deleting}? This action cannot be undone.`;


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || defaultTitle}</DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <Typography>{message || defaultMessage}</Typography>
        ) : (
          <Box>{message || <Typography>{defaultMessage}</Typography>}</Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>{ deleteText }</Button>
      </DialogActions>
    </Dialog>
  );
}
