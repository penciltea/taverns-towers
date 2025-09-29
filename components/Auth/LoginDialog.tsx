'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";
import LoginForm from "@/components/Auth/LoginForm";
import { signIn } from "next-auth/react";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  draftKey?: string; // key for storing draft in sessionStorage
  draftItem?: any;   // optional draft data
};

export default function LoginDialog({ open, onClose, onLoginSuccess, draftKey, draftItem }: LoginDialogProps) {
  const handleSuccess = () => {
    // Optional: persist draft in sessionStorage (for OAuth fallback)
    if (draftKey && draftItem) {
      sessionStorage.setItem(draftKey, JSON.stringify(draftItem));
    }
    onLoginSuccess?.();
    onClose();
  };

  const handlePatreonLogin = () => {
    if (draftKey && draftItem) {
      sessionStorage.setItem(draftKey, JSON.stringify(draftItem));
    }

    const currentPath = window.location.pathname; // remember where the user is
    signIn("patreon", { callbackUrl: currentPath });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Welcome Back</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>Step through the gate - enter your username or email and password to continue your adventure.</Typography>
        <LoginForm onSuccess={handleSuccess} />

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handlePatreonLogin}
        >
          Continue with Patreon
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
