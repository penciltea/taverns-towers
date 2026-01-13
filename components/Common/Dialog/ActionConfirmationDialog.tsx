'use client';

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { DialogProps } from "@/interfaces/dialogProps.interface";

export default function ActionConfirmationDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  contentName = "item",
  buttonText = "delete"
}: DialogProps) {
  const defaultTitle = `Delete ${contentName}?`;
  const defaultMessage = `Are you sure you want to delete this ${contentName}? This action cannot be undone.`;


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
        <Button color="error" onClick={onConfirm}>{ buttonText }</Button>
      </DialogActions>
    </Dialog>
  );
}
