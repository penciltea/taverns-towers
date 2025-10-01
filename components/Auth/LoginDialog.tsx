'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import LoginContent from "@/components/Auth/LoginContent";
import { AuthDialogProps } from "@/interfaces/dialogProps.interface";
import { buildOAuthProviders } from "@/lib/util/authHelpers";
import { useUIStore } from "@/store/uiStore";
import MuiLink from "@mui/material/Link";

export default function LoginDialog({ open, onClose, onLoginSuccess, draftKey, draftItem }: AuthDialogProps) {
  const currentPath = window.location.pathname + window.location.search;
  const oauthProviders = buildOAuthProviders(currentPath);
  const { setOpenDialog } = useUIStore();

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

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          No account? { " "}
          <MuiLink
            component="button"
            type="button"
            underline="always"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              onClose();
              setOpenDialog("RegisterDialog", { draftKey, draftItem });
            }}
          >
            Sign up
          </MuiLink>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
