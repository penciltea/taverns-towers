'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";
import LoginForm from "@/components/Auth/LoginForm";
import { signIn } from "next-auth/react";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  onSocialLoginStart?: () => void;  
};

export default function LoginDialog({ open, onClose, onLoginSuccess, onSocialLoginStart }: LoginDialogProps) {
  const handleSuccess = () => {
    onClose();
    onLoginSuccess?.();
    onSocialLoginStart?.();
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
          onClick={() => {
            onSocialLoginStart?.(); // parent stores draft
            signIn("patreon", { callbackUrl: "/" });
          }}
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
