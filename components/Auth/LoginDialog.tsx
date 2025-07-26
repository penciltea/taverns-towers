'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import LoginForm from "@/components/Auth/LoginForm";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export default function LoginDialog({ open, onClose, onLoginSuccess }: LoginDialogProps) {
  const handleSuccess = () => {
    onLoginSuccess?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Welcome Back</DialogTitle>
      <DialogContent>
        <LoginForm onSuccess={handleSuccess} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
