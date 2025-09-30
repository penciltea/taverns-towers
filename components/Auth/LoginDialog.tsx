'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import LoginContent from "@/components/Auth/LoginContent";
import { signIn } from "next-auth/react";

type LoginDialogProps<T = unknown> = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
  draftKey?: string;
  draftItem?: T;
};

export default function LoginDialog({ open, onClose, onLoginSuccess, draftKey, draftItem }: LoginDialogProps) {
  const oauthProviders = [
    {
      name: "patreon",
      icon: <img src="/icons/patreon.svg" alt="Patreon" width={15} height={15} style={{ display: "block" }} />,
      signInFunction: () => {
        if (draftKey && draftItem) {
          sessionStorage.setItem(draftKey, JSON.stringify(draftItem));
        }
        const currentPath = window.location.pathname + window.location.search;
        signIn("patreon", { callbackUrl: currentPath });
      },
    },
  ];

  const handleNativeSuccess = () => {
    if (draftKey && draftItem) {
      sessionStorage.setItem(draftKey, JSON.stringify(draftItem));
    }
    onLoginSuccess?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Welcome Back</DialogTitle>
      <DialogContent>
        <LoginContent
          onNativeSuccess={handleNativeSuccess}
          oauthProviders={oauthProviders}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
